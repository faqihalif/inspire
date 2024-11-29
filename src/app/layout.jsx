"use client"

import localFont from 'next/font/local'
const inter = localFont({
    src: '../fonts/Inter.ttf',
    display: 'swap',
})
import "@/styles/app.css"
// export const metadata = {
//     title: "INSPIRE JEC",
//     description: "JEC Institute for Research and Education",
// }
import { SessionProvider } from "next-auth/react"

export default function RootLayout({ children }) {
    return (
        <SessionProvider>
            <html lang="en">
                <body className={`${inter.className} antialiased`}>
                    {children}
                </body>
            </html>
        </SessionProvider>
    )
}