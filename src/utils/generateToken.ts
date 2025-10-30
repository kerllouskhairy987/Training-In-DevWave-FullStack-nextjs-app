export const runtime = "nodejs";

import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import { JWTPayload } from "@/types";

// Generate JWT Token
export function generateJwt(payload: JWTPayload): string {
    const privateKey = process.env.JWT_SECRET as string;
    if (!privateKey) throw new Error("JWT_SECRET is not defined");

    const token = jwt.sign(payload, privateKey, {
        expiresIn: "30d",
    });
    return token;
}

// Set Cookie
export function setCookie(jwtPayload: JWTPayload): string {
    const token = generateJwt(jwtPayload);

    const setCookie = cookie.serialize("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return setCookie;
}
