import { Genre, Season } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import RateStars from './RateStars'
import OtherSeasonCard from './OtherSeasonCard'
import BackBtn from './BackBtn'

type props = {
    homePage: string
    imgUrl: string
    title: string
    status: string
    language: string
    rateAvg: number
    synopsis: string
    genres: Genre[]
    releaseDate: string
    otherSeasons?: Season[]
}

function DetailsCard({
    genres,
    homePage,
    imgUrl,
    language,
    rateAvg,
    releaseDate,
    status,
    synopsis,
    title,
    otherSeasons,
}: props) {
    return (
        <>
            <BackBtn />
            <div className='flex lg:flex-row flex-col gap-7 justify-center lg:pt-24 pt-10 lg:pb-14 pb-7'>
                <div className='text-center'>
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${imgUrl}`}
                        alt={title}
                        width={300}
                        height={400}
                        sizes='100%'
                        className='m-auto rounded-xl'
                    />
                    <Link
                        href={homePage}
                        target='_blank'
                        className='underline text-xl relative top-3'
                    >
                        {homePage}
                    </Link>
                </div>
                <div className='lg:w-1/2 flex flex-col gap-3'>
                    <h1 className='text-3xl font-semibold text-white lg:text-start text-center'>
                        {title}
                    </h1>
                    <div className='flex lg:flex-row flex-col items-center text-white lg:gap-5 gap-2 font-semibold text-3xl lg:m-0 m-auto'>
                        <p>{(rateAvg / 2).toPrecision(2)}</p>
                        <div className='rating rating-md rating-half'>
                            <RateStars rate={rateAvg} />
                        </div>
                    </div>
                    <div className='flex gap-10 text-center lg:justify-normal justify-center'>
                        <div>
                            <p>Year</p>
                            <p className='text-white font-semibold'>
                                {releaseDate.split('-')[0]}
                            </p>
                        </div>
                        <div>
                            <p>Language</p>
                            <p className='text-white font-semibold'>
                                {language}
                            </p>
                        </div>
                        <div>
                            <p>Status</p>
                            <p className='text-white font-semibold'>{status}</p>
                        </div>
                    </div>
                    <p className='text-xl lg:text-start text-center'>Genres</p>
                    <div className='flex text-center gap-3 m-auto lg:m-0'>
                        {genres.map((genre) => (
                            <Link
                                key={genre.id}
                                href={`/${genre.id}?category=${
                                    otherSeasons !== undefined ? 'tv' : 'movie'
                                }&genre=${genre.name}`}
                                className='bg-slate-600/50 p-2 rounded-2xl text-white font-semibold md:text-base text-sm'
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                    <p className='text-xl lg:text-start text-center'>
                        Synopsis
                    </p>
                    <p className='lg:text-start text-center'>{synopsis}</p>
                </div>
            </div>
            {otherSeasons !== undefined && (
                <div className='flex flex-wrap gap-7 justify-center'>
                    {otherSeasons.map((season) => (
                        <OtherSeasonCard key={season.id} season={season} />
                    ))}
                </div>
            )}
        </>
    )
}

export default DetailsCard
