import { JWTPayload } from "@/types";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Get User Info From Token For API
export async function verifyToken(request: Request): Promise<JWTPayload | null> {
    console.log(request)
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

// Get User Info From Token For Pages
export async function verifyTokenForPages(token: string): Promise<JWTPayload | null> {
    try {
        const privateKey = process.env.JWT_SECRET as string;
        const userFromToken = jwt.verify(token, privateKey) as JWTPayload;
        if (!userFromToken) return null;

        return userFromToken
    } catch (error) {
        console.log(error)
        return null
    }
}