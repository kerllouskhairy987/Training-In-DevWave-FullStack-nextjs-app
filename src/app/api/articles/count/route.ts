// USE This Route For pagination
import { prisma } from "@/utils/prisma"

/** 
 * @method  GET 
 * @route   ~/api/articles/count
 * @desc    Get Articles Count
 * @access  public
*/
export async function GET() {
    try {
        const count = await prisma.article.count();
        return Response.json({ count }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}