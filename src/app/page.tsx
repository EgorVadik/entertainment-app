import { MovieData, TvData } from '@/types/types'
import Wrapper from '@/components/Wrapper'

const getPopular = async (category: 'tv' | 'movie', page: number = 1) => {
    const url = `https://api.themoviedb.org/3/${category}/popular?language=en-US&page=${page}`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.AUTH_TOKEN!,
        },
        next: {
            revalidate: 3600,
        },
    }
    let data: any | null
    try {
        data = await fetch(url, options).then((res) => res.json())
    } catch (error) {}

    return data as TvData | MovieData
}

const getTrending = async (page: number = 1) => {
    const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.AUTH_TOKEN!,
        },
        next: {
            revalidate: 3600,
        },
    }
    let data: any | null
    try {
        data = await fetch(url, options).then((res) => res.json())
    } catch (error) {}

    return data as TvData & MovieData
}

export default async function Home() {
    const popularMovies = (await getPopular('movie')) as MovieData
    const popularTv = (await getPopular('tv')) as TvData
    const trending = await getTrending()

    return (
        <main className='overflow-hidden'>
            <Wrapper
                popularMovies={popularMovies}
                popularTv={popularTv}
                trending={trending}
            />
            {/* <SearchBar />
            <TrendingContainer data={trending} />
            <CardContainer data={popularMovies} title='Popular Movies' />
            <CardContainer data={popularTv} title='Popular Tv Series' /> */}
        </main>
    )
}
