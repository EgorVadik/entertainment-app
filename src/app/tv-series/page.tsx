import TvWrapper from '@/components/TvWrapper'
import { TvData } from '@/types/types'

const getTvSeries = async () => {
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

    const url = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=1`

    let data: any | null
    try {
        data = await fetch(url, options).then((res) => res.json())
    } catch (error) {}

    return data as TvData
}

async function page() {
    const tvSeries = await getTvSeries()

    return <TvWrapper tvSeries={tvSeries} />
}

export default page
