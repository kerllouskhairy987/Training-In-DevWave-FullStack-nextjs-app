"use client";

import { DOMAIN } from "@/utils/constants";
import { X } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonSpinner from "../ButtonSpinner";

interface IProps {
    text: string;
    commentId: number;
    setOpenUpdateComment: React.Dispatch<React.SetStateAction<boolean>>;
}
const UpdateCommentForm = ({ text, commentId, setOpenUpdateComment }: IProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [updateText, setUpdateText] = useState(text);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await fetch(`${DOMAIN}/api/comments/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: updateText }),
            })
            const data = await res.json();
            console.log(data)

            if (res.status === 200) {
                setOpenUpdateComment(false)
                toast.success(data.message)
                router.refresh();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Internal Server Error")
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="fixed inset-0 bg-black/40">
            <div className="h-full px-4 sm:px-0 w-full  flex justify-center items-center ">
                <div className="w-full sm:w-[400px] bg-black p-10 text-white rounded-md flex flex-col gap-4">
                    <X onClick={() => setOpenUpdateComment(false)} className="w-8 h-8 p-1 ms-auto cursor-pointer bg-red-500 rounded-full " />
                    <h3 className="text-2xl font-semibold">Update Comment</h3>
                    <form onSubmit={handleUpdate} className="flex gap-4 flex-col">
                        <input
                            type="text"
                            placeholder="Update Your Comment"
                            autoFocus
                            name="comment"
                            defaultValue={text}
                            onChange={(e) => setUpdateText(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        <button disabled={isLoading} type="submit" className="font-semibold bg-green-500 rounded-md text-white py-2 cursor-pointer">
                            {isLoading ? <ButtonSpinner /> : "Update"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateCommentForm