'use client'
import { SessionProvider } from 'next-auth/react'

function SessionWrapper({ children }: any) {
    return <SessionProvider>{children}</SessionProvider>
}

export default SessionWrapper
