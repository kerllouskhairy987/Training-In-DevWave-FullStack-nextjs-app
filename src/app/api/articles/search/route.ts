import { prisma } from "@/utils/prisma"
import { NextRequest } from "next/server"

/** 
 * @method  GET 
 * @route   ~/api/articles/search?searchText=value
 * @desc    Get Articles By Search Text
 * @access  public
*/

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const searchText = searchParams.get('searchText')

        let articles;
        if (searchText) {
            articles = await prisma.article.findMany({
                where: {
                    title: {
                        startsWith: searchText,
                        mode: "insensitive"
                    }
                }
            })
        } else {
            articles = await prisma.article.findMany({ take: 6 })
        }

        return Response.json({ articles }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}