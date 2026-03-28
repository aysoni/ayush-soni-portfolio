import type { Metadata } from 'next'
import '@/styles/globals.css'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { AppChrome } from '@/components/ui/AppChrome'

export const metadata: Metadata = {
  title: 'Ayush Soni — Backend Software Engineer',
  description:
    '2+ years building scalable Java & Spring Boot microservices for enterprise platforms.',
  keywords: ['Java', 'Spring Boot', 'Microservices', 'Backend Engineer', 'Kafka', 'PostgreSQL'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppChrome>{children}</AppChrome>
        </ThemeProvider>
      </body>
    </html>
  )
}
