const ArticleTableLoading = () => {
    return (
        <div>
            <div className="mt-5 ms-2 animate-pulse">
                <table className="border w-full">
                    <thead>
                        <tr className="font-semibold text-lg">
                            <td className="p-2">ID</td>
                            <td className="p-2">Title</td>
                            <td className="p-2">Description</td>
                            <td className="p-2">Actions</td>
                            <td className="p-2"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i}>
                                <td className="p-2">
                                    <div className="h-5 w-10 bg-gray-300 rounded"></div>
                                </td>
                                <td className="p-2">
                                    <div className="h-5 w-28 bg-gray-300 rounded"></div>
                                </td>
                                <td className="p-2">
                                    <div className="h-5 w-48 bg-gray-300 rounded"></div>
                                </td>
                                <td className="p-2 flex gap-2">
                                    <div className="h-8 w-16 bg-gray-300 rounded"></div>
                                    <div className="h-8 w-16 bg-gray-300 rounded"></div>
                                </td>
                                <td>
                                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex items-center justify-center mt-2 mb-10 gap-2">
                    <div className="h-8 w-16 bg-gray-300 rounded"></div>
                    <div className="h-8 w-8 bg-gray-300 rounded"></div>
                    <div className="h-8 w-8 bg-gray-300 rounded"></div>
                    <div className="h-8 w-16 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    )
}

export default ArticleTableLoading