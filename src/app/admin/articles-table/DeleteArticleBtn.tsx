"use client";

import ButtonSpinner from '@/components/ButtonSpinner'
import { DOMAIN } from '@/utils/constants'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface IProps {
    articleId: number;
}

const DeleteArticleBtn = ({ articleId }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDeleteArticle = async () => {
        try {
            setIsLoading(true);
            if (confirm("You Want Delete This Article, Are You Sure?")) {
                const res = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
                    method: "DELETE"
                });
                const data = await res.json();
                if (res.status === 200) {
                    toast.success(data.message)
                    router.refresh();
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error)
            toast.error("Internal Server Error");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <button onClick={handleDeleteArticle} disabled={isLoading} className='bg-red-500 py-2 px-3 rounded-md text-white cursor-pointer'>
            {isLoading ? <ButtonSpinner /> : "Delete"}
        </button>
    )
}

export default DeleteArticleBtn