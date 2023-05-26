export enum Category {
    TV,
    MOVIE,
}

export interface Movie {
    id: number
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface MovieData {
    page?: number
    results: Movie[]
    total_pages?: number
    total_results?: number
}

// https://image.tmdb.org/t/p/original

export interface Tv {
    id: number
    backdrop_path: string
    first_air_date: string
    genre_ids: number[]
    name: string
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
}

export interface TvData {
    page?: number
    results: Tv[]
    total_pages?: number
    total_results?: number
}
