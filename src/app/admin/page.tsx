import { cookies } from "next/headers";
import AddArticleForm from "./AddArticlesForm";
import type { Metadata } from 'next'
import { verifyTokenForPages } from "@/utils/verifyToken";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Admin - Add Article',
    description: 'Admin page to add new articles',
}

const AdminPage = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('jwtToken')?.value;

    if (!token) redirect("/login")

    const payload = await verifyTokenForPages(token);
    if (!payload?.isAdmin) redirect("/")

    return (
        <div className="fix-height flex items-center justify-center px-5 lg:px-20">
            <div className="shadow p-4 bg-purple-200 rounded w-full">
                <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
                    Add New Article
                </h2>
                <AddArticleForm />
            </div>
        </div>
    )
}

export default AdminPage;