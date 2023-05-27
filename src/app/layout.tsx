import SideBar from '@/components/SideBar'
import './globals.css'
import { Inter } from 'next/font/google'
import SessionWrapper from '@/components/SessionWrapper'
import { getServerAuthSession } from '@/server/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Trending Movies/Tv-Series',
    description:
        "Discover the most popular and talked-about movies and TV series that are making waves around the world. Whether you're looking for action, comedy, drama, horror, romance, or anything in between, you'll find something to suit your taste and mood. Browse the latest trailers, ratings, reviews, and recommendations to find your next binge-worthy obsession.",
    icons: {
        icon: '/icons/logo.svg',
    },
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerAuthSession()

    return (
        <html lang='en' className='bg-dark-bg'>
            <body
                className={`${inter.className} flex p-5 md:flex-row flex-col`}
            >
                <SessionWrapper>
                    <div>
                        <SideBar session={session} />
                    </div>
                    <div className='grow'>{children}</div>
                </SessionWrapper>
            </body>
        </html>
    )
}
