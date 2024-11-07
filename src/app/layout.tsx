import { Roboto } from 'next/font/google'

import 'app/sass/globals.sass'
import { Footer, Header } from 'app/components/shared'

const roboto = Roboto({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Encuestas</title>
      </head>
      <body className={roboto.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}