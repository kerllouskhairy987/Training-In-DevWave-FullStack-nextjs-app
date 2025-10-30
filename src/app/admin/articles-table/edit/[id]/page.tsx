import EditArticleForm from "./EditArticleForm";
import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPages } from "@/utils/verifyToken";
import { Article } from "../../../../../../generated/prisma/client";

interface IProps {
    params: Promise<{ id: string }>
}
const AdminEditArticlePage = async ({ params }: IProps) => {
    const { id } = await params;

    // Protect This Page for admin only
    const cookieStore = await cookies();
    const token = cookieStore.get('jwtToken')?.value;

    if (!token) redirect("/login")

    const payload = await verifyTokenForPages(token);
    if (!payload?.isAdmin) redirect("/")

    // Get Single Article
    const article: Article = await getSingleArticle(id);

    return (
        <div className="fix-height flex items-center justify-center px-5 lg:px-20">
            <div className="shadow p-4 bg-green-200 rounded w-full">
                <h2 className="text-xl lg:text-2xl text-green-700 font-semibold mb-4">
                    Update Article
                </h2>
                <EditArticleForm article={article} />
            </div>
        </div>
    )
}

export default AdminEditArticlePage