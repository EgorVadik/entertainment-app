import { Category } from '@/types/types'
import Image from 'next/image'

type props = {
    type: Category
    year: number
    title: string
    ageRating: string
    imgUrl: string
}

function MovieCard({ ageRating, imgUrl, title, type, year }: props) {
    return (
        <div className='rounded-xl relative'>
            <button className='absolute top-3 right-3 bg-black/30 rounded-full w-9 h-9'>
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
            <div className=''>
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
        </div>
    )
}

export default MovieCard
