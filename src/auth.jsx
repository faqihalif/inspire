import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                let user = null

                const login = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, credentials)
                user = login.response.data.data

                if (!user) {
                    console.log('Invalid credentials')
                    return null
                }

                return user
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
})