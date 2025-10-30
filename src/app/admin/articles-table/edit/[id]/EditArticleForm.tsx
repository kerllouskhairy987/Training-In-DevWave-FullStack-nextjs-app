"use client";

import ButtonSpinner from '@/components/ButtonSpinner'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { Article } from '@prisma/client';

interface IProps {
    article: Article;
}

const EditArticleForm = ({ article }: IProps) => {
    const [updateTitle, setUpdateTitle] = useState(article.title);
    const [updateDesc, setUpdateDesc] = useState(article.description);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const handleUpdateArticle = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const res = await fetch(`${DOMAIN}/api/articles/${article.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: updateTitle,
                    description: updateDesc,
                }),
            });
            const data = await res.json();
            if (res.status === 200) {
                toast.success(data.message)
                router.refresh();
                setTimeout(() => {
                    router.back();
                }, 1000)
            } else {
                toast.error(data.message)
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
        <form className="flex flex-col gap-4" onSubmit={handleUpdateArticle}>
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-lg" htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    autoFocus
                    placeholder="Update Your Article Title"
                    className='mb-4 p-2 lg:text-xl rounded resize-none border'
                    defaultValue={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Update Your Article Description"
                    className='mb-4 p-2 lg:text-xl rounded resize-none border'
                    defaultValue={updateDesc}
                    onChange={(e) => setUpdateDesc(e.target.value)}
                ></textarea>
            </div>
            <button disabled={isLoading} type="submit" className="text-2xl text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold cursor-pointer">
                {isLoading ? <ButtonSpinner /> : "Update"}
            </button>
        </form>
    )
}

export default EditArticleForm