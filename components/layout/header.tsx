import { Badge } from '@/components/ui/badge'
import { RiCircleFill, RiUser2Line } from '@remixicon/react'
import { WebAppUser } from '@twa-dev/types'

export default function Header({ user }: { user: WebAppUser | undefined }) {
  return (
    <div className="from-background sticky top-0 left-0 flex h-10 w-[101%] items-end justify-between gap-4 rounded-t-xl bg-linear-to-b to-transparent">
      <Badge variant="secondary">
        {user?.first_name}
        {user?.last_name ? ` ${user.last_name}` : null}
        <RiUser2Line />
      </Badge>

      <Badge>
        <RiCircleFill /> Online
      </Badge>
    </div>
  )
}
