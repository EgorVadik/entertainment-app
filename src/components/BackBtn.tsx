'use client'
import { useRouter } from 'next/navigation'
function BackBtn() {
    const router = useRouter()
    return (
        <button onClick={() => router.back()}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                height='38'
                viewBox='0 -960 960 960'
                width='38'
                className='fill-white hover:fill-[#FC4747]'
            >
                <path d='M480-160 160-480l320-320 42 42-248 248h526v60H274l248 248-42 42Z' />
            </svg>
        </button>
    )
}

export default BackBtn
