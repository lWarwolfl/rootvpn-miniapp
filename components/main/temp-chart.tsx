'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { RiArrowRightUpLine } from '@remixicon/react'

export const description = 'A stacked bar chart showing data usage'

const chartData = [
  { month: 'January', upload: 45, download: 120, remaining: 85 },
  { month: 'February', upload: 30, download: 150, remaining: 70 },
  { month: 'March', upload: 55, download: 110, remaining: 85 },
  { month: 'April', upload: 40, download: 140, remaining: 70 },
  { month: 'May', upload: 60, download: 90, remaining: 100 },
  { month: 'June', upload: 50, download: 130, remaining: 70 },
]

const chartConfig = {
  upload: {
    label: 'Upload',
    color: 'var(--chart-1)',
  },
  download: {
    label: 'Download',
    color: 'var(--chart-2)',
  },
  remaining: {
    label: 'Remaining',
    color: 'var(--chart-3)', // Make sure to define --chart-3 in your CSS variables!
  },
} satisfies ChartConfig

export function ChartBarStacked() {
  return (
    <Card size="sm" className="w-full">
      <CardHeader>
        <CardTitle>Bandwidth Usage</CardTitle>
        <CardDescription>Upload, Download, and Remaining Quota (GB)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            {/* Stacked order: Upload on bottom, Download in middle, Remaining on top.
              Radius adjustments ensure only the very top and very bottom have rounded corners.
            */}
            <Bar dataKey="upload" stackId="a" fill="var(--color-upload)" radius={[0, 0, 4, 4]} />
            <Bar
              dataKey="download"
              stackId="a"
              fill="var(--color-download)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="remaining"
              stackId="a"
              fill="var(--color-remaining)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-left text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total usage increased by 12% this month <RiArrowRightUpLine className="size-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing data consumption in Gigabytes (GB) for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
