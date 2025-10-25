import { IUpdateCommentDto } from "@/types/dtos";
import { prisma } from "@/utils/prisma";
import { verifyToken } from "@/utils/verifyToken"
import { updateCommentSchema } from "@/validations";

/**
 * @method  PUT
 * @route   ~/api/comments/:id
 * @desc    Update Comment
 * @access  private  (Only User Can Update Comment)
*/
interface IProps {
    params: Promise<{ id: string }>
}
export async function PUT(request: Request, { params }: IProps) {
    try {


        // Get Comment
        const { id } = await params;
        const comment = await prisma.comment.findUnique({ where: { id: parseInt(id) } });
        if (!comment) {
            return Response.json({ message: "Comment not found" }, { status: 404 });
        }

        // Get User
        const user = await verifyToken(request)
        // check if this comment related to his user
        if (!user || comment.userId !== user.id) {
            return Response.json(
                { message: "You are not authorized to update this comment" },
                { status: 403 }  // Forbidden
            )
        }

        // Get Body Data and Validation
        const body = (await request.json()) as IUpdateCommentDto;
        const validation = updateCommentSchema.safeParse(body);
        if (!validation.success) {
            return Response.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            )
        }

        // Update Comment
        const updateComment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: {
                text: body.text
            }
        })
        return Response.json(
            {
                message: "Comment updated successfully",
                comment: updateComment
            },
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

/**
 * @method  DELETE
 * @route   ~/api/comments/:id
 * @desc    Delete Comment
 * @access  private  (Only (User - Admin) Can Delete Comment)
*/

export async function DELETE(request: Request, { params }: IProps) {
    try {
        const { id } = await params;

        // Get Comment
        const comment = await prisma.comment.findUnique({ where: { id: parseInt(id) } })
        if (!comment) {
            return Response.json({ message: "Comment not found" }, { status: 404 });
        }

        // Get User
        const user = await verifyToken(request);
        // check user login
        if (!user) {
            return Response.json(
                { message: "user not found login first" },
                { status: 401 }  // Unauthorized
            )
        }

        // Delete Comment
        if (user.isAdmin || user.id === comment.userId) {
            await prisma.comment.delete({ where: { id: parseInt(id) } });
            return Response.json(
                {
                    message: "Comment deleted successfully",
                    comment: comment
                },
                { status: 200 }
            )
        }

        // if user not admin or not comment owner
        return Response.json(
            { message: "You are not authorized to delete this comment" },
            { status: 403 }  // Forbidden
        )
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }

}