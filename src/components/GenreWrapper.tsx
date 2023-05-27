'use client'

import { MovieData, TvData } from '@/types/types'
import CardContainer from './CardContainer'
import { useState } from 'react'

type props = {
    data: MovieData | TvData
    genre: string
    genreId: string
    category: string
}

function GenreWrapper({ data, genre, category, genreId }: props) {
    const [page, setPage] = useState(2)
    const [shows, setShows] = useState(data)
    const [hasNext, setHasNext] = useState(true)
    const [loading, setLoading] = useState(false)

    const updatePage = () => setPage((prev) => prev + 1)

    const loadMore = async () => {
        setLoading(true)
        const { newData } = await fetch(
            `/api/load-more?category=${category}&genreId=${genreId}&page=${page}`
        ).then((res) => res.json())

        newData.results = newData.results.filter((d: any) => {
            return (
                (d.poster_path !== null || d.backdrop_path !== null) &&
                (d.first_air_date !== null || d.release_date !== null)
            )
        })

        if (newData.total_pages <= page - 1) {
            setHasNext(false)
        } else {
            if (!hasNext) setHasNext(true)
        }

        setShows((prev) => {
            return {
                ...prev,
                results: [...prev.results, ...newData.results],
                page: newData.page,
            }
        })
        setLoading(false)
    }

    return (
        <CardContainer
            title={genre}
            data={shows}
            hasNext={hasNext}
            updatePage={updatePage}
            page={page}
            loadMore={loadMore}
            isGenre
            loading={loading}
        />
    )
}

export default GenreWrapper
