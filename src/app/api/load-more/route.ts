import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const genreId = searchParams.get('genreId')
    const page = searchParams.get('page')

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.AUTH_TOKEN!,
        },
        next: {
            revalidate: 3600,
        },
    }

    const url = `https://api.themoviedb.org/3/discover/${category}?language=en-US&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`

    let newData: any | null
    try {
        newData = await fetch(url, options).then((res) => res.json())
    } catch (error) {}

    return NextResponse.json({ newData })
}
