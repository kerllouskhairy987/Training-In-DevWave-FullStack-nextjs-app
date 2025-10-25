import { JWTPayload } from "@/types";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyToken(request: Request): Promise<JWTPayload | null> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('jwtToken')?.value as string;

        if (!token) return null;

        const privateKey = process.env.JWT_SECRET as string;
        const userFromToken = jwt.verify(token, privateKey) as JWTPayload;

        return userFromToken
    } catch (error) {
        console.log(error)
        return null
    }
}