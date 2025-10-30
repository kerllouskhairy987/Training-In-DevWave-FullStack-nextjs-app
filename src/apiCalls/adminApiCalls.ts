import { DOMAIN } from "@/utils/constants";
import { Comment } from "@prisma/client";

// Get All Comments
export async function getAllComments(token: string): Promise<Comment[]> {
    const res = await fetch(`${DOMAIN}/api/comments`, {  // بعت التوكن عشان انت جوا سيرفر 
        headers: {
            Cookie: `jwtToken=${token}`
        }
    });
    if (!res.ok) throw new Error('Failed to fetch comments');
    const data = await res.json();
    return data.comments;
}