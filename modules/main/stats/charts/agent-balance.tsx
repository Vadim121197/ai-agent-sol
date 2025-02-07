'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const chartData = [
  { month: 'January', balance: 0.1 },
  { month: 'February', balance: 10 },
  { month: 'March', balance: 25 },
  { month: 'April', balance: 40 },
  { month: 'May', balance: 60 },
  { month: 'June', balance: 100 },
];
const chartConfig = {
  balance: {
    label: 'Balance',
    color: 'hsl(var(--chart-1))',
  },
  grid: {
    color: 'rgba(129, 139, 166, 0.20)',
  },
  tick: {
    color: '#EEE',
  },
} satisfies ChartConfig;

export function AgentBalanceChart() {
  return (
    <Card className='h-[224px] pt-5 pl-8 pr-4'>
      <CardHeader className='pb-2'>
        <CardTitle>Agent balance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[168px] w-full'>
          <LineChart accessibilityLayer data={chartData} className='h-[168px]'>
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
              dataKey='balance'
              orientation='right'
              axisLine={false}
              tickLine={false}
              tick={{ stroke: 'var(--color-tick)', strokeWidth: 0.5 }}
              tickMargin={0}
              tickCount={chartData.length}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey='balance'
              type='monotone'
              stroke='var(--color-balance)'
              strokeWidth={1}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
