"use client";

import { CommentWithUser, JWTPayload } from '@/types';
import { Edit, Trash } from 'lucide-react';
import UpdateCommentForm from '../articles/UpdateCommentForm';
import { useState } from 'react';
import { DOMAIN } from '@/utils/constants';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ButtonSpinner from '../ButtonSpinner';

interface IProps {
    comment: CommentWithUser;
    payload: JWTPayload | null;
}

const CommentItem = ({ comment, payload }: IProps) => {
    const [openUpdateComment, setOpenUpdateComment] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDeleteComment = async () => {
        try {
            setIsLoading(true);
            if (confirm("You Want Delete This Comment, Are You Sure?")) {
                const res = await fetch(`${DOMAIN}/api/comments/${comment.id}`, {
                    method: "DELETE",
                });
                const data = await res.json();
                console.log(data)
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
        <div className='mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300'>
            <div className='flex items-center justify-between mb-2'>
                <strong className='text-gray-800 uppercase'>
                    {comment.user.username}
                </strong>
                <span className='bg-yellow-700 px-1 rounded-lg text-white'>
                    {new Date(comment.createdAt).toDateString()}
                </span>
            </div>
            <p className='text-gray-800 mb-2'>
                {comment.id} - {comment.text}
            </p>
            {payload && comment.userId === payload.id && (
                <div className='flex justify-end items-center'>
                    <Edit onClick={() => setOpenUpdateComment(true)} className='text-green-600 text-xl cursor-pointer me-3' />
                    {
                        isLoading
                            ? <span className='text-red-600 text-xl cursor-pointer me-3'><ButtonSpinner /></span>
                            : <Trash onClick={handleDeleteComment} className='text-red-600 text-xl cursor-pointer me-3' />
                    }
                </div>
            )}

            {/* Update Form */}
            {
                openUpdateComment &&
                <UpdateCommentForm
                    setOpenUpdateComment={setOpenUpdateComment}
                    text={comment.text}
                    commentId={comment.id}
                />
            }
        </div>
    )
}

export default CommentItem