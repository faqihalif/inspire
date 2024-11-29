import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import axios from "axios"

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                let user = null
                let response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
                    email: credentials.email,
                    password: credentials.password,
                })

                user = response.data.data

                if (!user) {
                    throw new Error("Invalid credentials.")
                }

                return user
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.user.id
                token.name = user.user.name
                token.email = user.user.email
                token.role = user.user.role
                token.bearer = user.token
            }
            return token
        },
        async session({ session, token }) {
            session.user = token
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLogin = !!auth?.user

            // admin
            if (nextUrl.pathname.startsWith("/admin")) {
                if (isLogin) {
                    if (auth.user.role == "fellowship") {
                        return Response.redirect(new URL("/fellowship/my-profile", nextUrl))
                    }
                    if (auth.user.role == "observership") {
                        return Response.redirect(new URL("/observership", nextUrl))
                    }
                } else {
                    return Response.redirect(new URL("/login", nextUrl))
                }
            }

            // fellowship
            if (nextUrl.pathname.startsWith("/fellowship")) {
                if (isLogin) {
                    if (auth.user.role == "admin") {
                        return Response.redirect(new URL("/admin/dashboard", nextUrl))
                    }
                    if (auth.user.role == "observership") {
                        return Response.redirect(new URL("/observership", nextUrl))
                    }
                } else {
                    return Response.redirect(new URL("/login", nextUrl))
                }
            }

            if (isLogin && nextUrl.pathname.startsWith("/login")) {
                if (auth.user.role == 'admin') {
                    return Response.redirect(new URL("/admin/dashboard", nextUrl))
                }

                if (auth.user.role == 'fellowship') {
                    return Response.redirect(new URL("/fellowship/my-profile", nextUrl))
                }

                if (auth.user.role == 'observership') {
                    return Response.redirect(new URL("/observership", nextUrl))
                }
            }

            return true
        },
    }
})