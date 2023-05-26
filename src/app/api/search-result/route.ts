import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')
    const page = searchParams.get('page')

    const url = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=${page}`

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.AUTH_TOKEN!,
        },
        next: {
            revalidate: 0,
        },
    }
    let data: any | null
    try {
        data = await fetch(url, options).then((res) => res.json())
    } catch (error) {}

    return NextResponse.json({ data })
}
