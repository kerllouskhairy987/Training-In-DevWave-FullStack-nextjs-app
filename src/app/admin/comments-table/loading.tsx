const CommentLoading = () => {
    return (
        <section className="mt-5 ms-2 overflow-auto scroll-auto animate-pulse">
            <h2 className="font-bold text-xl text-gray-900 mb-2">Comments</h2>
            <table className="table border w-full">
                <thead>
                    <tr className="font-semibold text-lg">
                        <td className="p-2 w-fit max-w-[400px]">ID</td>
                        <td className="p-2 w-fit max-w-[400px]">Title</td>
                        <td className="p-2 w-fit max-w-[400px] text-nowrap">Created At</td>
                        <td className="p-2 w-fit max-w-[400px]">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i}>
                            <td className="p-2 w-fit max-w-[400px]">
                                <div className="h-5 w-10 bg-gray-300 rounded"></div>
                            </td>
                            <td className="p-2 w-fit min-w-[300px] max-w-[400px]">
                                <div className="h-5 w-full bg-gray-300 rounded"></div>
                            </td>
                            <td className="p-2 w-fit max-w-[400px]">
                                <div className="h-5 w-40 bg-gray-300 rounded"></div>
                            </td>
                            <td className="p-2 w-fit max-w-[400px] flex gap-2">
                                <div className="h-8 w-20 bg-gray-300 rounded"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default CommentLoading