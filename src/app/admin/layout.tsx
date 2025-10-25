import { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";

interface IProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'This is admin dashboard',
}

const AdminLayout = ({ children }: IProps) => {
    return (
        <div className="overflow-height flex items-start justify-between overflow-hidden">
            <div className="overflow-height w-15 lg:w-1/5 bg-purple-600 text-white p-1 lg:p-5">
                <AdminSidebar />
            </div>
            <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout