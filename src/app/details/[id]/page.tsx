import DetailsCard from '@/components/DetailsCard'
import { MovieDetails, TvDetails } from '@/types/types'
import { redirect } from 'next/navigation'

const getDetailInformation = async (category: 'tv' | 'movie', id: string) => {
    const url = `https://api.themoviedb.org/3/${category}/${id}?language=en-US`

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
    } catch (error) {
        redirect('/')
    }

    return data as TvDetails | MovieDetails
}

async function page({ params, searchParams }: any) {
    const data = await getDetailInformation(searchParams.category, params.id)
    return (
        <DetailsCard
            genres={data.genres}
            homePage={data.homepage}
            imgUrl={data.poster_path ?? data.backdrop_path}
            language={data.original_language}
            rateAvg={data.vote_average}
            // @ts-ignore
            releaseDate={data.release_date ?? data.first_air_date}
            status={data.status}
            synopsis={data.overview}
            // @ts-ignore
            title={data.title ?? data.name}
            otherSeasons={
                searchParams.category === 'tv'
                    ? // @ts-ignore
                      data.seasons
                    : undefined
            }
        />
    )
}

export default page
