import { type NextRequest } from 'next/server'
import { CreateArticleDto } from "@/types/dtos";
import { createArticleSchema } from "@/validations";
import { prisma } from "@/utils/prisma";
import { ARTICLE_PER_PAGE } from '@/utils/constants';
import { verifyToken } from '@/utils/verifyToken';
import { Article } from '../../../../generated/prisma/client';
import { revalidatePath } from 'next/cache';

/** 
 * @method  GET 
 * @route   ~/api/articles
 * @desc    Get Articles By PageNumber
 * @access  public
*/

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const pageNumber = searchParams.get('pageNumber') || "1";

        const articles = await prisma.article.findMany({
            skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
            take: ARTICLE_PER_PAGE,
            orderBy: {
                createdAt: 'desc'
            }
        });
        return Response.json(articles, { status: 200 });
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

/** 
 * @method  POST 
 * @route   ~/api/articles
 * @desc    Create New Article
 * @access  private (only admin can create new article)
*/
export async function POST(request: Request) {
    try {
        // Get User
        const user = await verifyToken(request);
        if (!user || !user.isAdmin) {
            return Response.json(
                { message: "Only Admin Can Create New Article" },
                { status: 401 }  // Unauthorized
            )
        }

        // validation
        const body = (await request.json()) as CreateArticleDto;
        const validation = createArticleSchema.safeParse(body);
        if (!validation.success) {
            return Response.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            )
        }

        // check the user is admin or not
        const newArticle: Article = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description
            }
        })
        revalidatePath("/articles")
        return Response.json(
            {
                message: "Article created successfully",
                article: newArticle
            },
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}