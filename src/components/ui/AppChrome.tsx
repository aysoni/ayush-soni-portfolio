'use client'

import dynamic from 'next/dynamic'
import { Cursor } from '@/components/ui/Cursor'
import { Navbar } from '@/components/ui/Navbar'
import { MotionProvider } from '@/components/ui/MotionProvider'

const BackgroundCanvas = dynamic(
  () => import('@/components/ui/BackgroundCanvas').then((m) => m.BackgroundCanvas),
  { ssr: false }
)

export function AppChrome({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <BackgroundCanvas />
      <Cursor />
      <div className="wrapper">
        <Navbar />
        <main>{children}</main>
        <footer>
          <div className="fn">&lt;/&gt; Ayush Soni</div>
          <div className="fc">© 2026 — Backend Software Engineer </div>
        </footer>
      </div>
    </MotionProvider>
  )
}
