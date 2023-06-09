'use client'
import { Movie, MovieData, Tv, TvData } from '@/types/types'
import CardContainer from './CardContainer'
import SearchBar from './SearchBar'
import TrendingContainer from './TrendingContainer'
import { useEffect, useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
import useSearch from '@/hooks/useSearch'

type props = {
    trending: TvData & MovieData
    popularMovies: MovieData
    popularTv: TvData
}

function Wrapper({ popularMovies, popularTv, trending }: props) {
    const [search, setSearch] = useState('')
    const [searchPage, setSearchPage] = useState(1)
    const { hasNextPage, searchData, loadNextPage } = useSearch(
        searchPage,
        search,
        'multi'
    )

    useEffect(() => {
        if (searchPage > 1) setSearchPage(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

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
                    loadMore={loadNextPage}
                    updatePage={updatePage}
                    page={searchPage}
                    hasNext={hasNextPage}
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
