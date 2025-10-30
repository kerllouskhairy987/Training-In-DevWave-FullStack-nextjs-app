"use client";

import ButtonSpinner from "@/components/ButtonSpinner"
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
    commentId: number
}
const DeleteCommentsBtn = ({ commentId }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleDeleteComment = async () => {
        try {
            setIsLoading(true);
            if (confirm("You Want Delete This Comment, Are You Sure?")) {
                const res = await fetch(`${DOMAIN}/api/comments/${commentId}`, {
                    method: "DELETE",
                });
                const data = await res.json();
                if (res.status === 200) {
                    toast.success(data.message)
                    router.refresh();
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Internal Server Error");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <button onClick={handleDeleteComment} disabled={isLoading} className='bg-red-500 py-2 px-3 rounded-md text-white cursor-pointer'>
            {isLoading ? <ButtonSpinner /> : "Delete"}
        </button>
    )
}

export default DeleteCommentsBtn