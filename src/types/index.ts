import { Article, Comment, User } from "../../generated/prisma/client";


export interface JWTPayload {
    id: number,
    username: string,
    email: string,
    isAdmin: boolean,
}

export type CommentWithUser = Comment & { user: User };
export type SingleArticle = Article & { comments: CommentWithUser[] };