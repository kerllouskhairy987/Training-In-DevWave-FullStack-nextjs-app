import { ARTICLE_PER_PAGE } from '@/utils/constants';
import { verifyTokenForPages } from '@/utils/verifyToken';
import type { Metadata } from 'next'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getArticles, getArticlesCount } from '@/apiCalls/articleApiCall';
import Link from 'next/link';
import Pagination from '@/components/articles/Pagination';
import DeleteArticleBtn from './DeleteArticleBtn';
import { Article } from '@prisma/client';

export const metadata: Metadata = {
    title: 'Admin Articles',
    description: 'Admin page to manage articles',
}

interface IProps {
    searchParams: Promise<{ pageNumber: string }>
}

const AdminArticleTable = async ({ searchParams }: IProps) => {
    const { pageNumber } = await searchParams;

    // Protect This Page for admin only
    const cookieStore = await cookies();
    const token = cookieStore.get('jwtToken')?.value;

    if (!token) redirect("/login")

    const payload = await verifyTokenForPages(token);
    if (!payload?.isAdmin) redirect("/")

    // Get All Articles
    const articles: Article[] = await getArticles(pageNumber || '1');
    const count: number = await getArticlesCount();
    const pages = Math.ceil(count / ARTICLE_PER_PAGE);

    return (
        <section className='mt-5 ms-2 overflow-auto scroll-auto'>
            <table className='table border w-full ' >
                <thead>
                    <tr className='font-semibold text-lg'>
                        <td className='p-2 w-fit max-w-[400px]'>ID</td>
                        <td className='p-2 w-fit max-w-[400px]'>Title</td>
                        <td className='p-2 w-fit max-w-[400px]'>Description</td>
                        <td className='p-2 w-fit max-w-[400px]'>Created At</td>
                        <td className='p-2 w-fit max-w-[400px] '>About</td>
                        <td className='p-2 w-fit max-w-[400px] '>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        articles.map((article: Article) => (
                            <tr key={article.id}>
                                <td className='p-2 w-fit max-w-[400px] text-center'>{article.id}</td>
                                <td className='p-2 w-fit min-w-28 max-w-[400px]'>{article.title}</td>
                                <td className='p-2 w-[400px] line-clamp-3'>{article.description}</td>
                                <td className='p-2 w-fit min-w-38 max-w-[400px]'>
                                    {new Date(article.createdAt).toLocaleString()}
                                </td>
                                <td className='w-fit max-w-[400px]'>
                                    <Link href={`/articles/${article.id}`}
                                        className='bg-blue-600 py-2 px-3 rounded-md text-white w-full text-nowrap'
                                    >
                                        Read More
                                    </Link>
                                </td>
                                <td className='p-2 flex gap-2 w-fit max-w-[400px]'>
                                    <Link href={`/admin/articles-table/edit/${article.id}`}
                                        className='bg-green-500 py-2 px-3 rounded-md text-white'
                                    >
                                        EDIT
                                    </Link>
                                    <DeleteArticleBtn articleId={article.id} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Pagination
                pageNumber={parseInt(pageNumber || '1')}
                pages={pages}
                route={'/admin/articles-table'}
            />
        </section>
    )
}

export default AdminArticleTable