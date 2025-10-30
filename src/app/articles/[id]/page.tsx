import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/types";
import { verifyTokenForPages } from "@/utils/verifyToken";
import { cookies } from "next/headers";

interface IProps {
    params: Promise<{ id: string }>
}

// ************* TODO: use cache function
// export async function generateMetadata(
//     { params }: IProps,
//     parent: ResolvingMetadata
// ): Promise<Metadata> {
//     const id = (await params).id
//     const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
//         res.json()
//     )

//     let title;
//     let description;
//     if (!post) {
//         title = 'Article Not Found';
//         description = 'The requested article does not exist.';
//     }

//     title = post.title;
//     description = post.body;


//     return {
//         title,
//         description,
//     }
// }


const SingleArticlePage = async ({ params }: IProps) => {
    const { id } = await params;
    const cookieStore = await cookies()
    const token = cookieStore.get('jwtToken')?.value as string;
    const payload = await verifyTokenForPages(token)
    const article: SingleArticle = await getSingleArticle(id);

    return (
        <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
            <div className="bg-white p-7 rounded-lg mb-7">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    {article.title}
                </h1>
                <div className="text-gray-400">
                    {new Date(article.createdAt).toDateString()}
                </div>
                <p className="text-gray-800 text-xl mt-5">{article.description}</p>
            </div>
            <AddCommentForm token={token} articleId={article.id} />

            <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
                Comments
            </h4>
            {article.comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} payload={payload} />
            ))}
        </section>
    )
}

export default SingleArticlePage