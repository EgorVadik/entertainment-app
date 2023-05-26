import { Category, MovieData, TvData } from '@/types/types'
import MovieCard from './MovieCard'

type props = {
    data: TvData | MovieData
    title: string
    loadMore?: (page: number) => Promise<void>
    updatePage?: () => void
    page?: number
}

function CardContainer({ data, title, loadMore, updatePage, page }: props) {
    return (
        <>
            <h1 className='text-3xl py-10'>{title}</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-7'>
                {data.results.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        ageRating={'E'}
                        imgUrl={movie.backdrop_path || movie.poster_path}
                        // @ts-ignore
                        title={movie.title ?? movie.name}
                        type={
                            // @ts-ignore
                            movie.media_type === 'tv'
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
            <div className='flex mt-5'>
                <button
                    className='btn btn-primary mx-auto'
                    onClick={() => {
                        loadMore!(page!)
                        updatePage!()
                    }}
                >
                    Load More...
                </button>
            </div>
        </>
    )
}

export default CardContainer
