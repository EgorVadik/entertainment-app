import { Category } from '@/types/types'

export const addBookmark = async (
    id: number,
    type: Category,
    year: number,
    title: string,
    ageRating: string,
    imgUrl: string
) => {
    const { err } = await fetch('/api/add-bookmark', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            ageRating,
            imgUrl,
            title,
            type,
            year,
            id,
        }),
    }).then((res) => res.json())

    return err
}

export const removeBookmark = async (movie_id: number) => {
    const { err } = await fetch(`/api/remove-bookmark?id=${movie_id}`, {
        method: 'DELETE',
    }).then((res) => res.json())

    return err
}
