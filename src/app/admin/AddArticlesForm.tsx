"use client";

import ButtonSpinner from '@/components/ButtonSpinner';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddArticleForm = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const res = await fetch(`${DOMAIN}/api/articles`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ title, description })
            })
            const data = await res.json();
            if (res.status === 201) {
                toast.success(data.message)
                router.refresh();
                setTitle("");
                setDescription("");
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error)
            toast.error("Internal Server Error")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input
                className="mb-4 border rounded p-2 text-xl"
                type="text"
                placeholder="Enter Article Title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className='mb-4 p-2 lg:text-xl rounded resize-none border'
                rows={5}
                placeholder='Enter Artilce Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button disabled={isLoading} type="submit" className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold">
                {isLoading ? <ButtonSpinner /> : "Add"}
            </button>
        </form>
    )
}

export default AddArticleForm;