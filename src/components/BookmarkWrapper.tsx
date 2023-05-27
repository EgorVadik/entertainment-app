'use client'
import { type Bookmark } from '@prisma/client'
import MovieCard from './MovieCard'
import { Category } from '@/types/types'

type props = {
    title: string
    bookmarks: Bookmark[]
}

function BookmarkWrapper({ bookmarks, title }: props) {
    return (
        <>
            <h1 className='text-3xl py-10'>{title}</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-7'>
                {bookmarks.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.anime_id}
                        ageRating={'E'}
                        imgUrl={movie.imgUrl}
                        title={movie.title}
                        type={
                            movie.type === 'tv' ? Category.TV : Category.MOVIE
                        }
                        year={movie.year}
                        isBookmarked
                    />
                ))}
            </div>
        </>
    )
}

export default BookmarkWrapper
