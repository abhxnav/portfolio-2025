import type { Metadata } from 'next'
import { Baloo_Paaji_2, Roboto } from 'next/font/google'
import './globals.css'
import { ActiveSectionContextProvider } from '@/context/ActiveSectionContext'
import { UserProvider } from '@/context/UserContext'

const fontRoboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

const fontBaloo = Baloo_Paaji_2({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-baloo',
})

export const metadata: Metadata = {
  title: 'Abhinav Kashyap - Frontend Developer',
  description:
    'A frontend developer with a passion for building beautiful web applications. Experienced in React, Next.js, Tailwind CSS, and other modern web technologies.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${fontBaloo.variable} ${fontRoboto.variable} font-baloo bg-dark-700 text-dark-200 antialiased overflow-x-hidden`}
      >
        <UserProvider>
          <ActiveSectionContextProvider>
            {children}
          </ActiveSectionContextProvider>
        </UserProvider>
      </body>
    </html>
  )
}
