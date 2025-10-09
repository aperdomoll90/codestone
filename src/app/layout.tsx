import type { Metadata } from 'next'
import './globals.scss'
import { Albert_Sans } from 'next/font/google'

export const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  style: ['normal','italic'],
  display: 'swap',
  variable: '--font-albert',
})

export const metadata: Metadata = {
  title: 'CodeStone',
  description:
    'CodeStone: Showcasing the innovative web solutions and full stack expertise of Adrian Perdomo. Explore a curated collection of projects demonstrating proficiency in both front-end and back-end development, from responsive designs to robust server-side applications.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={albertSans.className}>
      <body>{children}</body>
    </html>
  )
}
