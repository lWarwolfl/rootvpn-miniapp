import { usePathHelper } from '@/lib/hooks/usePathHelper.hook'
import { RiBox2Line, RiHome2Line, RiLifebuoyLine, RiQuestionLine } from '@remixicon/react'
import { useMemo } from 'react'

export function useLinks() {
  const { isCurrentPath, doseIncludePath } = usePathHelper()

  const items = useMemo(() => {
    const mainItems = [
      {
        type: 'link',
        name: 'Home',
        path: '/',
        icon: RiHome2Line,
        get isActive() {
          return isCurrentPath(this.path)
        },
      },
      {
        type: 'link',
        name: 'Configs',
        path: '/configs',
        icon: RiBox2Line,
        get isActive() {
          return doseIncludePath(this.path)
        },
      },
      {
        type: 'link',
        name: 'Support',
        path: '/support',
        icon: RiLifebuoyLine,
        get isActive() {
          return doseIncludePath(this.path)
        },
      },
      {
        type: 'link',
        name: 'Help',
        path: '/help',
        icon: RiQuestionLine,
        get isActive() {
          return doseIncludePath(this.path)
        },
      },
    ] as const

    return {
      mainItems,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return items
}

export type TMainLinkItem = ReturnType<typeof useLinks>['mainItems'][number]
