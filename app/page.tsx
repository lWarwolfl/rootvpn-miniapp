'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const initTelegram = async () => {
      const WebApp = (await import('@twa-dev/sdk')).default

      WebApp.ready()

      if (WebApp.initDataUnsafe?.user) {
        setUser(WebApp.initDataUnsafe.user)
      }

      try {
        WebApp.setHeaderColor('#00F0FF')

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
    <div className="text-center">
      <p className="whitespace-pre-wrap">{JSON.stringify(user)}</p>

      <p>
        Made with <span className="text-red-500">❤️</span>
      </p>
    </div>
  )
}
