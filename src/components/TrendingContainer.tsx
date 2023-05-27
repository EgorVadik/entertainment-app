import { Category, Movie, MovieData, Tv, TvData } from '@/types/types'
import TrendingCard from './TrendingCard'

type props = {
    data: TvData & MovieData
}

function TrendingContainer({ data }: props) {
    return (
        <>
            <h1 className='text-3xl pt-10 py-5'>Trending</h1>
            <div className='carousel p-4 space-x-4'>
                {data !== undefined &&
                    data.results !== undefined &&
                    data.results.map((movie) => (
                        <TrendingCard
                            key={movie.id}
                            id={movie.id}
                            ageRating={'E'}
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
