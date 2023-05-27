import { Category, MovieData, TvData } from '@/types/types'
import TrendingCard from './TrendingCard'
import LoginAlert from './LoginAlert'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

type props = {
    data: TvData & MovieData
}

function TrendingContainer({ data }: props) {
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
    return (
        <>
            <h1 className='text-3xl pt-10 py-5'>Trending</h1>
            {invalid && <LoginAlert />}
            <div className='carousel p-4 space-x-4'>
                {data !== undefined &&
                    data.results !== undefined &&
                    data.results.map((movie) => (
                        <TrendingCard
                            key={movie.id}
                            id={movie.id}
                            ageRating={'E'}
                            updateInvalid={updateInvalid}
                            imgUrl={movie.backdrop_path || movie.poster_path}
                            // @ts-ignore
                            title={movie.name ?? movie.title}
                            type={
                                // @ts-ignore
                                movie.media_type === 'tv'
                                    ? Category.TV
                                    : Category.MOVIE
                            }
                            year={
                                movie.first_air_date
                                    ? Number(movie.first_air_date.split('-')[0])
                                    : // @ts-ignore
                                      Number(movie.release_date.split('-')[0])
                            }
                        />
                    ))}
            </div>
        </>
    )
}

export default TrendingContainer
