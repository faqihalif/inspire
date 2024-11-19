import localFont from 'next/font/local'

const inter = localFont({
    src: '../fonts/Inter.ttf',
    display: 'swap',
  })

import "./globals.css"

export const metadata = {
    title: "INSPIRE JEC",
    description: "JEC Institute for Research and Education",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                {children}
            </body>
        </html>
    )
}