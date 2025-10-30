import { DOMAIN } from "@/utils/constants";
import { Article } from "../../generated/prisma/client";
import { SingleArticle } from "@/types";

// Get Articles Based On Page Number
export async function getArticles(pageNumber: string): Promise<Article[]> {
    const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`);

    if (!response.ok) {
        throw new Error("Failed to fetch articles");
    }

    return response.json();
}

// Get Articles Count
export async function getArticlesCount(): Promise<number> {
    const response = await fetch(`${DOMAIN}/api/articles/count`);

    if (!response.ok) {
        throw new Error("Failed to fetch articles count");
    }

    const { count } = await response.json();
    return count;
}

// Get Single Article By Id
export async function getSingleArticle(articleId: string): Promise<SingleArticle> {
    const res = await fetch(`${DOMAIN}/api/articles/${articleId}`)
    if (!res.ok) {
        throw new Error("Failed to fetch the article");
    }
    return res.json();
}