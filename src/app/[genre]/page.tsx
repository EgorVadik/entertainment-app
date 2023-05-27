import GenreWrapper from '@/components/GenreWrapper'
import { MovieData, TvData } from '@/types/types'

const getData = async (genreId: string, category: string, page: number = 1) => {
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

    const url = `https://api.themoviedb.org/3/discover/${category}?language=en-US&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`

    let data: any | null
    try {
        data = await fetch(url, options).then((res) => res.json())
    } catch (error) {}

    return data as MovieData | TvData
}

async function page({ params, searchParams }: any) {
    const data = await getData(params.genre, searchParams.category)
    return (
        <GenreWrapper
            genre={searchParams.genre}
            data={data}
            category={searchParams.category}
            genreId={params.genre}
        />
    )
}

export default page
