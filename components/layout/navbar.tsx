'use client'

import { TMainLinkItem, useLinks } from '@/lib/hooks/useLinks.hook'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Navbar() {
  const { mainItems } = useLinks()

  return (
    <div className="fixed bottom-0 left-0 flex w-full flex-col items-center p-4">
      <div className="bg-card flex w-full max-w-xs items-center justify-between gap-2 rounded-full p-1.5">
        {mainItems.map((item) => (
          <Navbar.NavLink key={item.path} appLink={item} />
        ))}
      </div>
    </div>
  )
}

Navbar.NavLink = function NavLink({
  className,
  appLink,
  ...props
}: {
  className?: string
  appLink: TMainLinkItem
}) {
  return (
    <Link
      className={cn(
        'bg-muted text-muted-foreground flex w-full max-w-15 flex-col items-center gap-0.5 rounded-full p-1 text-[10px] font-medium',
        className,
        { 'bg-background text-text': appLink.isActive }
      )}
      href={appLink.path}
      {...props}
    >
      <appLink.icon className="size-5" />

      <span className="">{appLink.name}</span>
    </Link>
  )
}
