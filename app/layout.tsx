import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next'
import StructuredData from './structured-data'
import { YOE } from '@/lib/constants'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'Sakibur Rahaman | Senior Software Engineer',
  description: `Senior Software Engineer with ${YOE}+ years of experience in full-stack development, cloud architecture, and microservices. Expertise in React, Node.js, AWS, and Kubernetes.`,
  keywords: [
    'Senior Software Engineer',
    'Full Stack Developer',
    'Cloud Engineer',
    'React Developer',
    'Node.js Developer',
    'AWS',
    'Kubernetes',
    'TypeScript',
    'Microservices',
    'DevOps'
  ],
  authors: [{ name: 'Sakibur Rahaman' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sakibur.com',
    siteName: 'Sakibur Rahaman - Senior Software Engineer',
    title: 'Sakibur Rahaman | Senior Software Engineer',
    description: 'Senior Software Engineer specializing in full-stack development and cloud architecture',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sakibur Rahaman - Senior Software Engineer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sakibur Rahaman | Senior Software Engineer',
    description: 'Senior Software Engineer specializing in full-stack development and cloud architecture',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://sakibur.com" />
        <StructuredData />
      </head>
      <body className="bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
        {children}
      </body>
    </html>
  )
} 