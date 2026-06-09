'use client'

import Header from '@/components/layout/header'
import Navbar from '@/components/layout/navbar'
import { ChartBarStacked } from '@/components/main/temp-chart'
import { SpinnerDemo } from '@/components/main/temp-item'
import { SectionCards } from '@/components/main/temp-sections'
import { WebAppUser } from '@twa-dev/types'
import { useEffect, useState } from 'react'

export default function Home() {
  const [user, setUser] = useState<WebAppUser>()

  useEffect(() => {
    const initTelegram = async () => {
      const WebApp = (await import('@twa-dev/sdk')).default

      WebApp.ready()

      if (WebApp.initDataUnsafe?.user) {
        setUser(WebApp.initDataUnsafe.user)
      }

      try {
        WebApp.setHeaderColor('#007AFF')

        const isDesktop = ['tdesktop', 'macos', 'web', 'weba', 'webk'].includes(WebApp.platform)

        if (!isDesktop && typeof WebApp.requestFullscreen === 'function') {
          WebApp.requestFullscreen()
        } else {
          WebApp.expand()
        }
      } catch (e) {
        console.error(e)
      }
    }

    initTelegram()
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4">
      <Header user={user} />

      <SectionCards />

      <SpinnerDemo />

      <ChartBarStacked />

      <p>
        Made with <span className="text-red-500">❤️</span> in Ecode
      </p>

      <Navbar />
    </div>
  )
}
