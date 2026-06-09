import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RiArrowRightDownLine, RiArrowRightUpLine } from '@remixicon/react'

const CARDS_CONFIG = [
  {
    id: 'remaining-data',
    title: 'Remaining Data',
    value: '85.4 GB',
    change: '-12.3%',
    trend: 'down',
    footerTrend: 'Using data faster this week',
    footerDesc: 'Quota resets in 14 days',
  },
  {
    id: 'monthly-usage',
    title: 'Data Consumed',
    value: '64.6 GB',
    change: '+18.5%',
    trend: 'up',
    footerTrend: 'Heavy streaming traffic',
    footerDesc: 'Combined upload & download',
  },
  {
    id: 'star-balance',
    title: 'Wallet Balance',
    value: '⭐️ 320',
    change: '+50',
    trend: 'up',
    footerTrend: 'Ready for auto-renewal',
    footerDesc: 'Saved Telegram Stars',
  },
  {
    id: 'connection-ping',
    title: 'Current Latency',
    value: '42 ms',
    change: '-15.4%',
    trend: 'down',
    footerTrend: 'Optimized routing active',
    footerDesc: 'Connected to fastest node',
  },
]

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid w-full grid-cols-2 gap-4 text-left *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs">
      {CARDS_CONFIG.map((card) => {
        const TrendIcon = card.trend === 'up' ? RiArrowRightUpLine : RiArrowRightDownLine

        return (
          <Card key={card.id} className="@container/card">
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>

              <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.value}
              </CardTitle>

              <CardAction>
                <Badge variant="outline">
                  <TrendIcon className="mr-0.5 inline-block size-3.5" />
                  {card.change}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="font-medium">{card.footerTrend}</div>
              <div className="text-muted-foreground">{card.footerDesc}</div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
