import { ICreateCommentDto } from "@/types/dtos";
import { prisma } from "@/utils/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { createCommentSchema } from "@/validations";

/**
 * @method  POST
 * @route   ~/api/comments
 * @desc    Create New Comment
 * @access  private  (Only Logged In User Can Create Comment)
*/

export async function POST(request: Request) {

    try {
        // Logged IN OR NOT
        const user = await verifyToken(request);
        if (!user) {
            return Response.json(
                { message: "You are not authorized to create comment" },
                { status: 401 }  // Unauthorized
            )
        }

        // Validation ON Text INPUT
        const body = await request.json() as ICreateCommentDto;
        console.log({ body })
        const validation = createCommentSchema.safeParse(body);
        if (!validation.success) {
            return Response.json(
                { message: validation.error.issues[0].message },
                { status: 400 }  // Bad Request
            )
        }

        // Create Comment
        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId: user.id
            }
        })
        return Response.json(
            {
                message: "Comment created successfully",
                comment: newComment
            },
            { status: 201 }  // Created
        )
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

/**
 * @method  GET
 * @route   ~/api/comments
 * @desc    Get All Comment
 * @access  private  (Only Admin Can Get All Comment In Dashboard)
*/
export async function GET(request: Request) {

    try {
        // User Must Be Admin
        const user = await verifyToken(request);
        if (!user || !user.isAdmin) {
            return Response.json(
                { message: "You are not authorized to get all comments, You must be admin" },
                { status: 401 }  // Unauthorized
            )
        }

        // Get All Comment
        const comments = await prisma.comment.findMany()
        return Response.json({ comments }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}