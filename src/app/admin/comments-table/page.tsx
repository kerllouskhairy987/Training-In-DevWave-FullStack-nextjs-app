import { verifyTokenForPages } from '@/utils/verifyToken';
import type { Metadata } from 'next'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllComments } from '@/apiCalls/adminApiCalls';
import DeleteCommentsBtn from './DeleteCommentsBtn';
import { Comment } from '@prisma/client';

export const metadata: Metadata = {
    title: "Admin - Comments",
    description: 'Admin page to manage comments',
}

const AdminCommentsTable = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('jwtToken')?.value;

    if (!token) redirect("/login")

    const payload = await verifyTokenForPages(token);
    if (!payload?.isAdmin) redirect("/")

    const comments: Comment[] = await getAllComments(token);

    return (
        <section className='mt-5 ms-2 overflow-auto scroll-auto'>
            <h2 className='font-bold text-xl text-gray-900'>Comments</h2>
            <table className='table border w-full' >
                <thead>
                    <tr className='font-semibold text-lg'>
                        <td className='p-2 w-fit max-w-[400px]'>ID</td>
                        <td className='p-2 w-fit max-w-[400px]'>Title</td>
                        <td className='p-2 w-fit max-w-[400px] text-nowrap'>Created At</td>
                        <td className='p-2 w-fit max-w-[400px] '>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        comments.length === 0
                            ? <tr><td className='text-center p-2' colSpan={4}>No comments</td></tr>
                            : comments.map(comment => (
                                <tr key={comment.id}>
                                    <td className='p-2 w-fit max-w-[400px]'>{comment.id}</td>
                                    <td className='p-2 w-fit min-w-[300px] max-w-[400px] line-clamp-1'>{comment.text}</td>
                                    <td className='p-2 w-fit max-w-[400px]'>{new Date(comment.createdAt).toDateString()}</td>
                                    <td className='p-2 w-fit max-w-[400px] flex gap-2'>
                                        <DeleteCommentsBtn commentId={comment.id} />
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </section>
    )
}

export default AdminCommentsTable