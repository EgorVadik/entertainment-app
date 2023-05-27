import Link from 'next/link'
import { Category } from '@/types/types'
import Image from 'next/image'
import { addBookmark } from '@/utils/addBookmark'

type props = {
    id: number
    type: Category
    year: number
    title: string
    ageRating: string
    imgUrl: string
}

function TrendingCard({ ageRating, imgUrl, title, type, year, id }: props) {
    return (
        <Link
            href={`/details/${id}?category=${type}`}
            prefetch={false}
            className='rounded-xl relative carousel-item group'
        >
            <div className='w-full h-full bg-black/40 md:bg-black/20 md:group-hover:bg-black/50 absolute z-10 rounded-xl'></div>
            <div className='relative'>
                <button
                    className='absolute top-3 right-3 hover:bg-gray-600/50 bg-black/30 rounded-full w-9 h-9 z-20'
                    onClick={async (e) => {
                        e.preventDefault()
                        await addBookmark(
                            id,
                            type,
                            year,
                            title,
                            ageRating,
                            imgUrl
                        )
                    }}
                >
                    <Image
                        src={'/icons/icon-bookmark-empty.svg'}
                        alt='Bookmark'
                        width={13}
                        height={13}
                        className='m-auto'
                    />
                </button>
                <Image
                    src={`https://image.tmdb.org/t/p/original/${imgUrl}`}
                    alt={title}
                    width={200}
                    height={150}
                    className='w-full h-[150px] object-cover rounded-xl'
                    // sizes='100%'
                />
                <div className='absolute bottom-1 left-2 z-20'>
                    <div className='flex items-center gap-2 text-sm text-white'>
                        <p>{year}</p>
                        <Image
                            src={
                                type === Category.MOVIE
                                    ? '/icons/icon-category-movie.svg'
                                    : '/icons/icon-category-tv.svg'
                            }
                            alt={title}
                            width={24}
                            height={24}
                            sizes='100%'
                            className='w-3 h-3'
                        />
                        <p>{type === Category.MOVIE ? 'Movie' : 'TV Series'}</p>
                        <p>{ageRating}</p>
                    </div>
                    <p className='text-white font-bold'>{title}</p>
                </div>
            </div>
        </Link>
    )
}

export default TrendingCard
