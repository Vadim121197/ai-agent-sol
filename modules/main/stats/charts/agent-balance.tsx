'use client';

import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { defaultSelectPeriod, selectPeriodOptions } from '@/constants';
import { infoApi } from '@/lib/api/info';
import { useQuery } from '@tanstack/react-query';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

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
  const [period, setPeriod] = useState<string>(defaultSelectPeriod);

  const { data } = useQuery({
    ...infoApi.getAgentBalance({ period }),
  });

  return (
    <Card className='h-[224px] pt-5 pl-8 pr-4'>
      <CardHeader className='pb-2 flex justify-between flex-row'>
        <CardTitle>Agent balance</CardTitle>
        <Select value={period} onValueChange={e => setPeriod(e)}>
          <SelectTrigger className='w-[120px]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            {selectPeriodOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[168px] w-full'>
          <LineChart accessibilityLayer data={data} className='h-[168px]'>
            <CartesianGrid stroke='var(--color-grid)' />
            <XAxis
              dataKey='period'
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              tickCount={data?.length ?? 1}
              tick={{ stroke: 'var(--color-tick)', strokeWidth: 0.5 }}
            />
            <YAxis
              type='number'
              dataKey='total_amount'
              orientation='right'
              axisLine={false}
              tickLine={false}
              tick={{ stroke: 'var(--color-tick)', strokeWidth: 0.5 }}
              tickMargin={0}
              tickCount={data?.length ?? 1}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey='total_amount'
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
