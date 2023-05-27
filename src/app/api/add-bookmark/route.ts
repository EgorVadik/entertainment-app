import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { ageRating, imgUrl, title, type, year, id } = await req.json()

    const session = await getServerAuthSession()
    if (session === null) return NextResponse.json({ err: 'Unauthorized' })

    try {
        await prisma.bookmark.create({
            data: {
                ageRating,
                anime_id: id,
                imgUrl,
                title,
                type,
                year,
                userId: session.user.id,
            },
        })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }

    return NextResponse.json({ err: null })
}
