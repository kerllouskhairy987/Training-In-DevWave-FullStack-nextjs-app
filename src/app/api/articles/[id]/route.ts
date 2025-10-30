import { IUpdateArticleDto } from "@/types/dtos";
import { prisma } from "@/utils/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { updateArticleSchema } from "@/validations";
import { revalidatePath } from "next/cache";

/** 
 * @method  GET
 * @route   ~/api/articles/:id
 * @desc    Get Single Article By Id INCLUDING Comments
 * @access  public
*/
interface IProps {
    params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: IProps) {
    try {
        const { id } = await params;

        const article = await prisma.article.findUnique({
            where: { id: parseInt(id) },
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc',
                    }
                }
            }

        })
        if (!article) {
            return Response.json({ message: "Article not found" }, { status: 404 });
        }

        return Response.json(article, { status: 200 });
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


/** 
 * @method  PUT
 * @route   ~/api/articles/:id
 * @desc    Update Article By Id
 * @access  private (Only Admin Can Update Article)
*/
export async function PUT(request: Request, { params }: IProps) {
    try {
        const { id } = await params;
        const article = await prisma.article.findUnique({ where: { id: parseInt(id) } })
        if (!article) {
            return Response.json({ message: "Article not found" }, { status: 404 });
        }

        // Get User
        const user = await verifyToken(request);
        if (!user || !user.isAdmin) {
            return Response.json(
                { message: "Only Admin Can Create New Article" },
                { status: 401 }  // Unauthorized
            )
        }

        const body = (await request.json()) as IUpdateArticleDto;
        const validation = updateArticleSchema.safeParse(body);
        if (!validation.success) {
            return Response.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            )
        }
        const updateArticle = await prisma.article.update({
            where: { id: parseInt(id) },
            data: {
                title: body?.title,
                description: body?.description
            }
        })

        revalidatePath('/admin/articles-table');
        return Response.json(
            {
                message: "Article Updated successfully",
                article: updateArticle
            }, { status: 200 }
        );
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

/** 
 * @method  DELETE
 * @route   ~/api/articles/:id
 * @desc    Delete Article By Id
 * @access  private (Only Admin Can Delete Article)
*/
export async function DELETE(request: Request, { params }: IProps) {
    try {
        const { id } = await params;

        const article = await prisma.article.findUnique({ where: { id: parseInt(id) } })
        if (!article) {
            return Response.json({ message: "Article not found" }, { status: 404 });
        }
        // Get User
        const user = await verifyToken(request);
        if (!user || !user.isAdmin) {
            return Response.json(
                { message: "Only Admin Can Delete New Article" },
                { status: 401 }  // Unauthorized
            )
        }

        await prisma.article.delete({ where: { id: parseInt(id) } });
        revalidatePath("/admin/articles-table")
        return Response.json({ message: "Article deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}