import { JWTPayload } from "@/types";
import { IRegisterDto } from "@/types/dtos";
import { setCookie } from "@/utils/generateToken";
import { prisma } from "@/utils/prisma";
import { registerSchema } from "@/validations";
import bcrypt from "bcryptjs";

/** 
 * @method  POST 
 * @route   ~/api/users/register
 * @desc    Create a new user
 * @access  public
*/
export async function POST(request: Request) {
    try {
        const body = await request.json() as IRegisterDto;
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return Response.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (user) {
            return Response.json({ message: "User already registered" }, { status: 400 });
        }

        // encrypt password 
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(body.password, salt)

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hash
            },
            select: {
                id: true,
                username: true,
                email: true,
                isAdmin: true
            }
        })

        const jwtPayload: JWTPayload = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        }

        // set cookie
        const cookie = setCookie(jwtPayload)

        return Response.json({
            message: "User registered successfully",
            user: { newUser }
        }, {
            headers: { "Set-Cookie": cookie },
            status: 201
        });
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error, From Server" }, { status: 500 });
    }
}