'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import type { Session } from 'next-auth'

function SideBar({ session }: { session: Session | null }) {
    const pathName = usePathname()

    return (
        <div className='md:min-h-screen md:w-[120px] w-full h-[100px]'>
            <div className='fixed rounded-xl p-6 bg-[#161d2e] md:w-auto sm:w-[95%] w-[90%] md:h-[95%] flex md:flex-col items-center md:gap-20 z-50 md:justify-normal justify-between'>
                <Link href={'/'}>
                    <Image
                        src={'/icons/logo.svg'}
                        alt='Logo'
                        width='33'
                        height='27'
                    />
                </Link>

                <div className='flex md:flex-col md:gap-10 gap-4'>
                    <div className='tooltip tooltip-right' data-tip='Home'>
                        <Link href={'/'}>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                                className={`hover:fill-[#FC4747] ${
                                    pathName === '/'
                                        ? 'fill-white'
                                        : 'fill-[#5A698F]'
                                } transition-colors duration-400`}
                            >
                                <path d='M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z' />
                            </svg>
                        </Link>
                    </div>

                    <div className='tooltip tooltip-right' data-tip='Movies'>
                        <Link href={'/movies'}>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                                className={`hover:fill-[#FC4747] ${
                                    pathName === '/movies'
                                        ? 'fill-white'
                                        : 'fill-[#5A698F]'
                                } transition-colors duration-400`}
                            >
                                <path d='M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z' />
                            </svg>
                        </Link>
                    </div>

                    <div className='tooltip tooltip-right' data-tip='Tv Series'>
                        <Link href={'tv-series'}>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                                className={`hover:fill-[#FC4747] ${
                                    pathName === '/tv-series'
                                        ? 'fill-white'
                                        : 'fill-[#5A698F]'
                                } transition-colors duration-400`}
                            >
                                <path d='M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z' />
                            </svg>
                        </Link>
                    </div>

                    <div className='tooltip tooltip-right' data-tip='Bookmarks'>
                        <Link href={'/bookmark'}>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                                className={`hover:fill-[#FC4747] ${
                                    pathName === '/bookmark'
                                        ? 'fill-white'
                                        : 'fill-[#5A698F]'
                                } transition-colors duration-400`}
                            >
                                <path d='M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z' />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className='dropdown lg:dropdown-right lg:dropdown-top dropdown-left md:mt-auto'>
                    <button className='bg-white rounded-full p-[2px]'>
                        <Image
                            src={session?.user.image ?? '/icons/user.png'}
                            alt='Logo'
                            width='40'
                            height='40'
                            className='rounded-full'
                        />
                    </button>
                    <ul
                        tabIndex={0}
                        className='dropdown-content menu p-2 shadow bg-base-100 rounded-box min-w-max'
                    >
                        {session === null ? (
                            <li>
                                <button onClick={async () => await signIn()}>
                                    Sign in
                                </button>
                            </li>
                        ) : (
                            <li>
                                <p className='hover:bg-transparent cursor-default'>
                                    {session.user.email}
                                </p>
                                <button onClick={async () => await signOut()}>
                                    Sign Out
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar
