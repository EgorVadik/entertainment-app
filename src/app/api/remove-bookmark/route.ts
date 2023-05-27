import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const anime_id = Number(id)

    const session = await getServerAuthSession()
    if (session === null) return NextResponse.json({ err: 'Unauthorized' })

    try {
        await prisma.bookmark.deleteMany({
            where: {
                anime_id,
            },
        })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }

    return NextResponse.json({ err: null })
}
