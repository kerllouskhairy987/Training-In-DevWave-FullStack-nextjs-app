import { Metadata } from "next"

type IProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ searchText: string }>
}

// ******************** TODO: dynamic metadata
export async function generateMetadata(
  { searchParams }: IProps,
): Promise<Metadata> {
  const searchText = (await searchParams).searchText;

  const articles = await fetch(`https://api.vercel.app/blog?searchText=${searchText}`).then((res) =>
    res.json()
  )

  let title;
  let description;

  if (!articles) {
    title = `No articles found for "${searchText}"`;
    description = `We couldn't find any articles matching "${searchText}". Please try different keywords.`;
  }

  return {
    title,
    description,
  }
}

const SearchArticlePage = async ({ searchParams }: IProps) => {
  const { searchText } = await searchParams;

  return (
    <section className="fix-height container m-auto px-5">
      {[1, 2, 3].length === 0 ? (
        <h2 className='text-gray-800 text-2xl font-bold p-5'>
          Articles based on
          <span className='text-red-500 mx-1'>{searchText}</span>
          not found
        </h2>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800">
            Articles based on
            <span className='ms-1 text-green-700 text-3xl font-bold'>{searchText}</span>
          </h1>
          <div className='flex items-center justify-center flex-wrap gap-7'>
            {[1, 2, 3].map(item => (
              <h2 key={item}>{item}</h2>
              // <ArticleItem key={item} article={item} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default SearchArticlePage