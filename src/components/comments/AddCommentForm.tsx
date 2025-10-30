"use client";
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { toast } from 'react-toastify';
import ButtonSpinner from '../ButtonSpinner';

interface IProps {
    articleId: number;
    token: string;
}
const AddCommentForm = ({ articleId, token }: IProps) => {
    const router = useRouter();
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const res = await fetch(`${DOMAIN}/api/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: text, articleId: articleId }),
            })
            const data = await res.json();
            if (res.status === 201) {
                toast.success(data.message)
                router.refresh();
                setText("")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Internal Server Error")
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }
    return (
        token ? <>
            <form onSubmit={formSubmitHandler}>
                <input
                    className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md border"
                    type="text"
                    placeholder="Add a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" disabled={isLoading} className='bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition'>
                    {isLoading ? <ButtonSpinner /> : 'Comment'}
                </button>
            </form>
        </>
        : <p className='text-lg text-blue-500 font-semibold text-center'>Please login to add a comment</p>
    )
}

export default AddCommentForm