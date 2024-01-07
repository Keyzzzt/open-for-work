import '@/app/globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import { Container } from '@/components/Container'
import { ToasterProvider } from '@/providers/ToastProvider'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Keizt',
  description: 'Webshop for everybody',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={font.className}>
        <Container>
          <ToasterProvider />
          {/*div below is a wrapper to push footer to the bottom*/}
          <div className='flex flex-col min-h-[100vh] text-textColor font-medium text-base leading-6'>
            {children}
          </div>
        </Container>
      </body>
    </html>
  )
}
