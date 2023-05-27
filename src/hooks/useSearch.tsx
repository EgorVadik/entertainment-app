import { useEffect, useState } from 'react'
import useDebounce from './useDebounce'
import { Movie, MovieData, Tv, TvData } from '@/types/types'

export default function useSearch(
    page: number = 1,
    search: string,
    category: string
) {
    const [searchData, setSearchData] = useState<(TvData & MovieData) | null>(
        null
    )
    const [hasNextPage, setHasNextPage] = useState(true)
    useDebounce(() => querySearch(), 500, [search])

    useEffect(() => {
        if (search.trim().length === 0) setSearchData(null)
    }, [search])

    const querySearch = async () => {
        if (search.trim().length === 0) return
        let { data } = await fetch(
            `/api/search-result?search=${search}&page=${page}&category=${category}`,
            {
                method: 'GET',
            }
        ).then((res) => res.json())

        const originalLen = data.results.length
        data.results = data.results.filter((d: Tv & Movie) => {
            return (
                (d.poster_path !== null || d.backdrop_path !== null) &&
                (category === 'movie' ||
                    category === 'tv' ||
                    // @ts-ignore
                    d.media_type === 'tv' ||
                    // @ts-ignore
                    d.media_type === 'movie') &&
                (d.first_air_date !== null || d.release_date !== null)
            )
        })

        if (data.total_pages <= page) {
            setHasNextPage(false)
        } else {
            if (!hasNextPage) setHasNextPage(true)
        }

        if (searchData === null || (searchData !== null && page === 1)) {
            data.total_results -= originalLen - data.results.length
            setSearchData(data)
        } else {
            data.results = [...searchData.results, ...data.results]
            setSearchData((prev) => {
                return {
                    ...prev,
                    results: data.results,
                    page: data.page,
                }
            })
        }
    }

    const loadNextPage = () => querySearch()

    return { searchData, hasNextPage, loadNextPage }
}
