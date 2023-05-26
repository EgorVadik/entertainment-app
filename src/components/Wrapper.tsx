'use client'
import { Movie, MovieData, Tv, TvData } from '@/types/types'
import CardContainer from './CardContainer'
import SearchBar from './SearchBar'
import TrendingContainer from './TrendingContainer'
import { useEffect, useState } from 'react'
import useDebounce from '@/hooks/useDebounce'

type props = {
    trending: TvData & MovieData
    popularMovies: MovieData
    popularTv: TvData
}

function Wrapper({ popularMovies, popularTv, trending }: props) {
    const [search, setSearch] = useState('')
    const [searchPage, setSearchPage] = useState(2)
    const [searchData, setSearchData] = useState<(TvData & MovieData) | null>(
        null
    )

    useDebounce(() => querySearch(), 500, [search])

    useEffect(() => {
        if (search.trim().length === 0) setSearchData(null)
        if (searchPage > 2) setSearchPage(2)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    const querySearch = async (page: number = 1) => {
        if (search.trim().length === 0) return
        let { data } = await fetch(
            `/api/search-result?search=${search}&page=${page}`,
            {
                method: 'GET',
            }
        ).then((res) => res.json())

        const originalLen = data.results.length
        data.results = data.results.filter((d: Tv & Movie) => {
            return (
                (d.poster_path !== null || d.backdrop_path !== null) &&
                // @ts-ignore
                (d.media_type === 'tv' || d.media_type === 'movie') &&
                (d.first_air_date !== null || d.release_date !== null)
            )
        })

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

    const updateSearch = (val: string) => {
        setSearch(val)
    }

    const updatePage = () => {
        setSearchPage((prev) => prev + 1)
    }

    return (
        <>
            <SearchBar search={search} updateSearch={updateSearch} />
            {searchData !== null ? (
                <CardContainer
                    data={searchData}
                    title={`Found ${searchData.total_results} results for '${search}'`}
                    loadMore={querySearch}
                    updatePage={updatePage}
                    page={searchPage}
                />
            ) : (
                <>
                    <TrendingContainer data={trending} />
                    <CardContainer
                        data={popularMovies}
                        title='Popular Movies'
                    />
                    <CardContainer data={popularTv} title='Popular Tv Series' />
                </>
            )}
        </>
    )
}

export default Wrapper
