import ArticlesItem from "@/components/articles/ArticlesItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { IArticles } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Articles Page',
    description: 'Articles about programming',
}

interface IProps {
    searchParams: Promise<{ pageNumber: string }>;
}

const ArticlesPage = async ({ searchParams }: IProps) => {
    const { pageNumber } = await searchParams;
    console.log("clg searchParams", pageNumber);
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
        throw new Error("Failed to fetch articles");
    }

    const articles: IArticles[] = await response.json();

    return (
        <section className="container m-auto px-5">
            <SearchArticleInput />
            <div className="flex items-center justify-center flex-wrap gap-7">
                {articles.slice(0, 6).map(item => (
                    <ArticlesItem key={item.id} article={item} />
                ))}
            </div>

            <Pagination pages={8} pageNumber={Number(pageNumber) || 1} route={'/articles'} />
        </section>
    )
}

export default ArticlesPage;
