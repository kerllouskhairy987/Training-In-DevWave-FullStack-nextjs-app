import { JWTPayload } from "@/types";
import { ILoginDto } from "@/types/dtos";
import { setCookie } from "@/utils/generateToken";
import { prisma } from "@/utils/prisma";
import { loginSchema } from "@/validations";
import bcrypt from "bcryptjs";


/** 
 * @method  POST 
 * @route   ~/api/users/login
 * @desc    Login user
 * @access  public
*/
export async function POST(request: Request) {
    try {
        const body = await request.json() as ILoginDto;
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return Response.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { email: body.email },
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
                isAdmin: true,
            }
        });
        if (!user) {
            return Response.json({ message: "User not found, please register first" }, { status: 400 });
        }

        const hash = user.password;
        const isPasswordMatch = await bcrypt.compare(body.password, hash);
        if (!isPasswordMatch) {
            return Response.json({ message: "Invalid Email OR Password" }, { status: 400 });
        }

        const jwtPayload: JWTPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        }

        // set cookie
        const cookie = setCookie(jwtPayload)
        return Response.json(
            { message: "Login successful, Authenticated" },
            {
                headers: { "Set-Cookie": cookie },
                status: 200
            }
        )
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}