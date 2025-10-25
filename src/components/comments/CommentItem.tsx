"use client";

import { Edit, Trash } from 'lucide-react';

const CommentItem = () => {

    return (
        <div className='mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300'>
            <div className='flex items-center justify-between mb-2'>
                <strong className='text-gray-800 uppercase'>
                    {"comment.user.username"}
                </strong>
                <span className='bg-yellow-700 px-1 rounded-lg text-white'>
                    1/1/2004
                </span>
            </div>
            <p className='text-gray-800 mb-2'>
                comment text
            </p>
            {(
                <div className='flex justify-end items-center'>
                    <Edit className='text-green-600 text-xl cursor-pointer me-3' />
                    <Trash className='text-red-600 text-xl cursor-pointer' />
                </div>
            )}
        </div>
    )
}

export default CommentItem