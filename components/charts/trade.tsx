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
import { tradeDefaultSelectPeriod, tradeSelectPeriodOptions } from '@/constants';
import { infoApi } from '@/lib/api/info';
import { cn } from '@/lib/utils';
import { Periods } from '@/types/chart';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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

export function TradeChart({ className }: { className?: string }) {
  const [period, setPeriod] = useState<Periods>(tradeDefaultSelectPeriod);
  const { data } = useQuery({
    ...infoApi.getTrades({ period }),
  });

  return (
    <Card className='pt-4 px-4 pb-2'>
      <CardHeader className='pb-2 flex justify-between flex-row'>
        <CardTitle>Trade</CardTitle>
        <Select value={period} onValueChange={(e: Periods) => setPeriod(e)}>
          <SelectTrigger className='w-[120px]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            {tradeSelectPeriodOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={cn('w-full', className)}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ top: 0, left: 0, right: -35, bottom: 0 }}
          >
            <CartesianGrid stroke='var(--color-grid)' />
            <XAxis
              dataKey='period'
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              tickCount={7}
              tick={{ stroke: 'var(--color-tick)', strokeWidth: 0.5 }}
              tickFormatter={(val: string) => {
                if (period === Periods.WEEK) {
                  return moment(val).format('D MMM');
                } else if (period === Periods.MONTH) {
                  return moment(val).format('D MMM');
                } else {
                  return moment(val).format('MMM YYYY');
                }
              }}
            />
            <YAxis
              type='number'
              orientation='right'
              axisLine={false}
              tickLine={false}
              tick={{ stroke: 'var(--color-tick)', strokeWidth: 0.5 }}
              tickMargin={5}
              tickCount={5}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              labelFormatter={(val: string) => moment(val).format('MMMM Do YYYY')}
            />
            <Bar dataKey='open_count' fill='var(--color-sol)' radius={4} />
            <Bar dataKey='closed_count' fill='var(--color-usdc)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
