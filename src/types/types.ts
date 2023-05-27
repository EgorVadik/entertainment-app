export enum Category {
    TV = 'tv',
    MOVIE = 'movie',
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

// Tv Details
export interface TvDetails {
    adult: boolean
    backdrop_path: string
    created_by: any[]
    episode_run_time: number[]
    first_air_date: string
    genres: Genre[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: LastEpisodeToAir
    name: string
    next_episode_to_air: null
    networks: Network[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: Network[]
    production_countries: ProductionCountry[]
    seasons: Season[]
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
}

export interface Genre {
    id: number
    name: string
}

export interface LastEpisodeToAir {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
}

export interface Network {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface Season {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
}

export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

// Movie data
export interface MovieDetails {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: BelongsToCollection
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface BelongsToCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

export interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
}
