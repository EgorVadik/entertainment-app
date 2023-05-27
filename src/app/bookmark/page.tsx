import BookmarkWrapper from '@/components/BookmarkWrapper'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { redirect } from 'next/navigation'

export const revalidate = 0

const getBookmarks = async () => {
    const session = await getServerAuthSession()
    if (session === null) redirect('/')

    const bookmarks = await prisma.bookmark.findMany({
        where: {
            userId: session.user.id,
        },
    })

    return bookmarks
}

async function page() {
    const bookmarks = await getBookmarks()
    const tvBookmarks = bookmarks.filter((bookmark) => bookmark.type === 'tv')
    const movieBookmarks = bookmarks.filter(
        (bookmark) => bookmark.type === 'movie'
    )

    if (bookmarks.length === 0) {
        return (
            <h1 className='text-3xl mt-20'>You Currently Have 0 Bookmarks</h1>
        )
    }

    return (
        <>
            {movieBookmarks.length > 0 && (
                <BookmarkWrapper bookmarks={movieBookmarks} title='Movies' />
            )}
            {tvBookmarks.length > 0 && (
                <BookmarkWrapper bookmarks={tvBookmarks} title='Tv Series' />
            )}
        </>
    )
}

export default page
