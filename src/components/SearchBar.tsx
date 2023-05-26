import Image from 'next/image'

type props = {
    search: string
    updateSearch: (val: string) => void
}

function SearchBar({ search, updateSearch }: props) {
    return (
        <div className='flex items-end gap-2'>
            <Image
                src={'/icons/icon-search.svg'}
                alt='Logo'
                width='35'
                height='35'
            />
            <input
                type='text'
                className='grow py-2 px-1 border-b border-[#5a698e] bg-transparent focus:outline-none'
                placeholder='Search...'
                value={search}
                onChange={(e) => updateSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchBar
