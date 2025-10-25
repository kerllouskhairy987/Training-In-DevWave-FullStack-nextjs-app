import { updateUserDto } from "@/types/dtos";
import { prisma } from "@/utils/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { updateUserSchema } from "@/validations";
import bcrypt from "bcryptjs";

/** 
 * @method  DELETE 
 * @route   ~/api/users/profile/:id
 * @desc    Delete user profile by ID
 * @access  private (only user himself or admin can delete the profile)
*/
interface IProps {
    params: Promise<{ id: string }>
}
export async function DELETE(request: Request, { params }: IProps) {
    try {
        const { id } = await params;

        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        // verify token function
        const userFromToken = await verifyToken(request)

        if (userFromToken !== null && (userFromToken.id === user.id || userFromToken.isAdmin === true)) {
            await prisma.user.delete({ where: { id: parseInt(id) } });
            return Response.json(
                { message: `User profile (account) has been deleted successfully` },
                { status: 200 }
            )
        }

        return Response.json(
            { message: "You are not authorized to delete this profile" },
            { status: 403 }  // Forbidden
        )

    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

/** 
 * @method  GET 
 * @route   ~/api/users/profile/:id
 * @desc    Get user profile by ID
 * @access  private (only user himself or admin can get the profile)
*/
export async function GET(request: Request, { params }: IProps) {
    try {
        const { id } = await params;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                isAdmin: true
            }
        });
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        // verify token function know if token for this user
        const userFromToken = await verifyToken(request)
        if (userFromToken !== null && (userFromToken.id === user.id || userFromToken.isAdmin === true)) {
            return Response.json(user, { status: 200 })
        }

        return Response.json(
            { message: "You are not authorized to get this profile" },
            { status: 403 }  // Forbidden
        )
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

/** 
 * @method  PUT
 * @route   ~/api/users/profile/:id
 * @desc    Put user profile by ID
 * @access  private (only user himself or admin can put the profile)
*/
export async function PUT(request: Request, { params }: IProps) {
    try {
        const { id } = await params;
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        const body = await request.json() as updateUserDto;
        const validation = updateUserSchema.safeParse(body);
        if (!validation.success) {
            return Response.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            )
        }

        // if send password MUST hash IT
        if (body.password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
        }

        // verify token function know if token for this user
        const userFromToken = await verifyToken(request);

        if (userFromToken !== null && (userFromToken.id === user.id || userFromToken.isAdmin === true)) {
            const updatedUser = await prisma.user.update({
                where: { id: parseInt(id) },
                data: {
                    username: body.username,
                    email: body.email,
                    password: body.password
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    createdAt: true,
                    isAdmin: true
                }
            });
            return Response.json(
                {
                    message: "User Update Successfully",
                    user: updatedUser
                },
                { status: 200 }
            )
        }

        return Response.json(
            { message: "You are not authorized to update this profile" },
            { status: 403 }  // Forbidden
        )
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }

}