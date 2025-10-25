"use client";

import { useRouter } from "next/navigation";
import { useState } from "react"

const SearchArticleInput = () => {
    const [searchText, setSearchText] = useState("")
    const router = useRouter();

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({ searchText })
        router.push(`/articles/search?searchText=${searchText}`);
    }
    return (
        <form onSubmit={formSubmitHandler} className="my-5 w-full md:w-2/3 m-auto">
            <input
                type="search"
                placeholder="Search articles..."
                className="w-full p-3 rounded text-xl text-gray-900 border border-gray-500"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </form>
    )
}

export default SearchArticleInput