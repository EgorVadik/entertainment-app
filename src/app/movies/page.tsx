import MovieWrapper from '@/components/MovieWrapper'
import { MovieData } from '@/types/types'

const getMovies = async (page: number = 1) => {
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

    const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`

    let data: any | null
    try {
        data = await fetch(url, options).then((res) => res.json())
    } catch (error) {}

    return data as MovieData
}

async function page() {
    const movies = await getMovies()

    return <MovieWrapper movies={movies} />
}

export default page
