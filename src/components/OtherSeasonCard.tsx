import { Season } from '@/types/types'
import Image from 'next/image'

type props = {
    season: Season
}

function OtherSeasonCard({ season }: props) {
    return (
        <div className='relative w-fit group'>
            <Image
                src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
                alt={season.name}
                width={170}
                height={270}
                className='rounded-xl'
            />
            <div className='group-hover:opacity-100 opacity-100 flex lg:opacity-0 absolute bg-black/70 inset-0 text-white rounded-xl text-center  flex-col justify-center gap-2 transition-all duration-300'>
                <p className='text-lg font-bold'>{season.name}</p>
                <p className='font-semibold'>Season {season.season_number}</p>
                <p className='font-semibold'>
                    Episodes: {season.episode_count}
                </p>
                <p className='font-semibold'>{season.air_date}</p>
            </div>
        </div>
    )
}

export default OtherSeasonCard
