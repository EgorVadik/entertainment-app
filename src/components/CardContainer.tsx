import { Category, MovieData, TvData } from '@/types/types'
import MovieCard from './MovieCard'
import { useEffect, useState } from 'react'
import BackBtn from './BackBtn'
import { useSession } from 'next-auth/react'
import LoginAlert from './LoginAlert'

type props = {
    data: TvData | MovieData
    title: string
    loadMore?: (page: number) => Promise<void>
    updatePage?: () => void
    page?: number
    hasNext?: boolean
    isGenre?: boolean
    loading?: boolean
}

function CardContainer({
    data,
    title,
    loadMore,
    updatePage,
    page,
    hasNext,
    isGenre,
    loading,
}: props) {
    const { data: session } = useSession()
    const [invalid, setInvalid] = useState(false)

    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    const updateInvalid = () => {
        if (session === null) {
            setInvalid(true)
            sleep(4000).then(() => setInvalid(false))
            return
        }
    }

    useEffect(() => {
        if (isGenre) return
        if (page! >= 2) loadMore!(page!)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, isGenre])

    return (
        <>
            <div className='flex items-center'>
                {isGenre && <BackBtn />}
                <h1 className='text-3xl py-10'>{title}</h1>
            </div>
            {invalid && <LoginAlert />}
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-7'>
                {data !== undefined &&
                    data.results !== undefined &&
                    data.results.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            ageRating={'E'}
                            updateInvalid={updateInvalid}
                            imgUrl={movie.backdrop_path || movie.poster_path}
                            // @ts-ignore
                            title={movie.title ?? movie.name}
                            type={
                                // @ts-ignore
                                movie.name !== undefined
                                    ? Category.TV
                                    : Category.MOVIE
                            }
                            year={
                                // @ts-ignore
                                movie.first_air_date
                                    ? // @ts-ignore
                                      Number(movie.first_air_date.split('-')[0])
                                    : // @ts-ignore
                                      Number(movie.release_date.split('-')[0])
                            }
                        />
                    ))}
            </div>
            {loadMore && page && updatePage && hasNext !== undefined && (
                <div className='flex mt-5'>
                    <button
                        className='btn btn-primary mx-auto'
                        onClick={() => {
                            if (isGenre) loadMore(page)
                            updatePage()
                        }}
                        disabled={!hasNext}
                    >
                        {loading ? 'Loading...' : 'Load More...'}
                    </button>
                </div>
            )}
        </>
    )
}

export default CardContainer
