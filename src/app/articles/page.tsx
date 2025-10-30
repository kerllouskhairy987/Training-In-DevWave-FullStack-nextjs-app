import ArticlesItem from "@/components/articles/ArticlesItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { Metadata } from "next";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Article } from "@prisma/client";

export const metadata: Metadata = {
    title: 'Articles Page',
    description: 'Articles about programming',
}

interface IProps {
    searchParams: Promise<{ pageNumber: string }>;
}

const ArticlesPage = async ({ searchParams }: IProps) => {
    const { pageNumber } = await searchParams;
    const articles: Article[] = await getArticles(pageNumber);

    // Get Articles Count
    const count = await getArticlesCount();
    const pages = Math.ceil(count / ARTICLE_PER_PAGE);

    return (
        <section className="container m-auto px-5">
            <SearchArticleInput />
            <div className="flex items-center justify-center flex-wrap gap-7">
                {
                    articles.length === 0
                        ? <h2 className='text-gray-800 text-2xl font-bold p-5'>No articles found</h2>
                        : articles.map(item => (
                            <ArticlesItem key={item.id} article={item} />
                        ))
                }
            </div>

            {articles.length !== 0 &&
                <Pagination
                    pages={pages}
                    pageNumber={Number(pageNumber) || 1}
                    route={'/articles'}
                />
            }
        </section>
    )
}

export default ArticlesPage;
