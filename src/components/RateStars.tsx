type props = {
    rate: number
}

function RateStars({ rate }: props) {
    const numOfStars = rate.toPrecision(2)
    const fullStars = numOfStars.toString().split('.')[0]
    const halfStars = numOfStars.toString().split('.')[1]
    const arr = new Array(
        halfStars === undefined || Number(halfStars) <= 4
            ? Number(fullStars)
            : Number(fullStars) + 1
    ).fill('_')

    return (
        <>
            {arr.map((_, i) => (
                <input
                    key={i}
                    type='radio'
                    disabled
                    className='bg-[#FC4747] mask mask-star-2 even:mask-half-2 odd:mask-half-1'
                />
            ))}
        </>
    )
}

export default RateStars
