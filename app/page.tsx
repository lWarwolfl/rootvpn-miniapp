'use client'

import { ChartBarStacked } from '@/components/main/temp-chart'
import { SpinnerDemo } from '@/components/main/temp-item'
import { Badge } from '@/components/ui/badge'
import { RiCircleFill, RiUser2Line } from '@remixicon/react'
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
      <div className="flex w-full items-center justify-between gap-4">
        <Badge variant="secondary">
          {user?.first_name}
          {user?.last_name ? ` ${user.last_name}` : null}
          <RiUser2Line />
        </Badge>

        <Badge>
          <RiCircleFill /> Online
        </Badge>
      </div>

      <SpinnerDemo />

      <ChartBarStacked />

      <p>
        Made with <span className="text-red-500">❤️</span> in Ecode
      </p>
    </div>
  )
}
