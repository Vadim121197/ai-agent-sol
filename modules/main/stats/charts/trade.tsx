'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartData = [
  { month: 'January', sol: 186, usdc: 80 },
  { month: 'February', sol: 305, usdc: 200 },
  { month: 'March', sol: 237, usdc: 120 },
  { month: 'April', sol: 73, usdc: 190 },
  { month: 'May', sol: 209, usdc: 130 },
  { month: 'June', sol: 214, usdc: 140 },
];

const chartConfig = {
  sol: {
    label: 'SOL',
    color: '#1450D2',
  },
  usdc: {
    label: 'USDC',
    color: '#E237D1',
  },
  grid: {
    color: 'rgba(129, 139, 166, 0.20)',
  },
  tick: {
    color: '#EEE',
  },
} satisfies ChartConfig;

export function TradeChart() {
  return (
    <Card className='h-[224px] pt-5 pl-8 pr-4'>
      <CardHeader className='pb-2'>
        <CardTitle>Trade</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[168px] w-full'>
          <BarChart accessibilityLayer data={chartData} className='h-[168px]'>
            <CartesianGrid stroke='var(--color-grid)' />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              tickCount={chartData.length}
              tick={{ stroke: 'var(--color-tick)', strokeWidth: 0.5 }}
            />
            <YAxis
              type='number'
              orientation='right'
              axisLine={false}
              tickLine={false}
              tick={{ stroke: 'var(--color-tick)', strokeWidth: 0.5 }}
              tickMargin={0}
              tickCount={chartData.length}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey='sol' fill='var(--color-sol)' radius={4} />
            <Bar dataKey='usdc' fill='var(--color-usdc)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
