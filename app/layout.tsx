import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Root VPN ⚡🤖',
  description: 'Best VPN on the market',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full', 'antialiased', 'font-sans', inter.variable)}
      suppressHydrationWarning
    >
      <body className="flex h-dvh flex-col items-center">
        <ThemeProvider>
          <div className="flex w-full flex-1 flex-col items-center justify-end bg-linear-to-b from-[#007AFF] to-[#5FB5F4]">
            <main className="bg-background flex h-[90dvh] w-full flex-col overflow-x-hidden overflow-y-auto rounded-t-4xl px-4 pb-22 text-center">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
