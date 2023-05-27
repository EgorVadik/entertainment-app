'use client'
import { MovieData } from '@/types/types'
import SearchBar from './SearchBar'
import { useEffect, useState } from 'react'
import CardContainer from './CardContainer'
import useSearch from '@/hooks/useSearch'

type props = {
    movies: MovieData
}

function MovieWrapper({ movies }: props) {
    const [search, setSearch] = useState('')
    const [searchPage, setSearchPage] = useState(1)
    const { hasNextPage, searchData, loadNextPage } = useSearch(
        searchPage,
        search,
        'movie'
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
                <CardContainer data={movies} title='Trending Movies' />
            )}
        </>
    )
}

export default MovieWrapper
