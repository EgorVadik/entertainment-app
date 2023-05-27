import { Category } from '@/types/types'
import { addBookmark, removeBookmark } from '@/utils/addBookmark'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

type props = {
    id: number
    type: Category
    year: number
    title: string
    ageRating: string
    imgUrl: string
    isBookmarked?: boolean
    updateInvalid?: () => void
}

function MovieCard({
    ageRating,
    imgUrl,
    title,
    type,
    year,
    id,
    isBookmarked = false,
    updateInvalid,
}: props) {
    const router = useRouter()
    return (
        <Link
            href={`/details/${id}?category=${type}`}
            prefetch={false}
            className='rounded-xl relative'
        >
            <button
                className={`absolute top-3 right-3 hover:bg-gray-600/50 bg-black/30 rounded-full w-9 h-9 ${
                    isBookmarked && 'bg-red-500/60'
                }`}
                onClick={async (e) => {
                    e.preventDefault()
                    updateInvalid && updateInvalid()
                    if (isBookmarked) {
                        await removeBookmark(id)
                        router.refresh()
                        return
                    }
                    await addBookmark(id, type, year, title, ageRating, imgUrl)
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
                // sizes='60%'
            />
            <div>
                <div className='flex items-center gap-2 text-sm text-[#556588]'>
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
        </Link>
    )
}

export default MovieCard
