"use client";

import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonSpinner from "../ButtonSpinner";


const LogoutBtn = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(`${DOMAIN}/api/users/logout`);
            const data = await res.json();
            console.log("form logout", data)
            if (res.status === 200) {
                toast.success(data.message)
                router.refresh();
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error("Internal Server Error");
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <button onClick={handleLogout} disabled={isLoading} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md cursor-pointer">
            { isLoading ? <ButtonSpinner /> : "Logout"}
        </button>
    )
}

export default LogoutBtn