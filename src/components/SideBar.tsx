import Image from 'next/image'

function SideBar() {
    return (
        <div className='md:min-h-screen md:w-[120px] w-full h-[100px]'>
            <div className='fixed rounded-xl p-6 bg-[#161d2e] md:w-auto sm:w-[95%] w-[90%] md:h-[95%] flex md:flex-col items-center md:gap-20 z-50 md:justify-normal justify-between'>
                <Image
                    src={'/icons/logo.svg'}
                    alt='Logo'
                    width='33'
                    height='27'
                />

                <div className='flex md:flex-col md:gap-10 gap-4'>
                    <Image
                        src={'/icons/icon-nav-home.svg'}
                        alt='Logo'
                        width='24'
                        height='24'
                    />
                    <Image
                        src={'/icons/icon-nav-movies.svg'}
                        alt='Logo'
                        width='24'
                        height='24'
                    />
                    <Image
                        src={'/icons/icon-nav-tv-series.svg'}
                        alt='Logo'
                        width='24'
                        height='24'
                    />
                    <Image
                        src={'/icons/icon-nav-bookmark.svg'}
                        alt='Logo'
                        width='24'
                        height='24'
                    />
                </div>

                <div className='md:mt-auto bg-white rounded-full p-[2px]'>
                    <Image
                        src={'/icons/user.png'}
                        alt='Logo'
                        width='40'
                        height='40'
                    />
                </div>
            </div>
        </div>
    )
}

export default SideBar
