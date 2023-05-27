import { type GetServerSidePropsContext } from 'next'
import {
    getServerSession,
    type NextAuthOptions,
    type DefaultSession,
} from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/server/db'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string
        } & DefaultSession['user']
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            return {
                user,
                expires: session.expires,
            }
        },
    },
}

export const getServerAuthSession = async (ctx?: {
    req: GetServerSidePropsContext['req']
    res: GetServerSidePropsContext['res']
}) => {
    if (ctx) {
        return await getServerSession(ctx.req, ctx.res, authOptions)
    }
    return await getServerSession(authOptions)
}
