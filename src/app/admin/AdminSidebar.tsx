import { ArrowLeftCircle, HomeIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const AdminSidebar = () => {
    return (
        <div className="flex flex-col items-center">
            <Link href="/admin" className="flex items-center text-lg lg:text-2xl font-semibold">
                <LayoutDashboard className="text-3xl me-1" />
                <span className="hidden lg:block">Dashboard</span>
            </Link>
            <ul className="mt-10 flex items-center justify-center flex-col lg:items-start">
                <Link className="flex items-center text-xl mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition"
                    href="/admin/articles-table"
                    title="articles"
                >
                    <ArrowLeftCircle className="me-1" />
                    <span className="hidden lg:block">Articles</span>
                </Link>
                <Link className="flex items-center text-xl mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition"
                    href="/admin/comments-table"
                    title="comments"
                >
                    <HomeIcon className="me-1" />
                    <span className="hidden lg:block">Comments</span>
                </Link>
            </ul>
        </div>
    )
}

export default AdminSidebar;