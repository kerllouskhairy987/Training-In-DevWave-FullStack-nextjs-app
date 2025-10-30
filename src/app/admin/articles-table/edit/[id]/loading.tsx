const EditArticleLoading = () => {
    return (
        <div className="fix-height flex items-center justify-center px-5 lg:px-20 animate-pulse">
            <div className="shadow p-4 bg-green-200 rounded w-full">
                <div className="h-8 w-40 bg-gray-300 rounded mb-6"></div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="h-5 w-24 bg-gray-300 rounded"></div>
                        <div className="h-12 w-full bg-gray-300 rounded"></div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="h-5 w-32 bg-gray-300 rounded"></div>
                        <div className="h-12 w-full bg-gray-300 rounded"></div>
                    </div>

                    <div className="h-12 w-32 bg-gray-300 rounded mt-4"></div>
                </div>
            </div>
        </div>
    )
}

export default EditArticleLoading