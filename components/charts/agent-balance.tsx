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
import { cn } from '@/lib/utils';
import { Periods } from '@/types/chart';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
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

export function AgentBalanceChart({ className }: { className?: string }) {
  const [period, setPeriod] = useState<Periods>(defaultSelectPeriod);

  const { data } = useQuery({
    ...infoApi.getAgentBalance({ period }),
  });

  return (
    <Card className='pt-4 px-4 pb-2'>
      <CardHeader className='pb-2 flex justify-between flex-row'>
        <CardTitle>Agent balance</CardTitle>
        <Select value={period} onValueChange={(e: Periods) => setPeriod(e)}>
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
        <ChartContainer config={chartConfig} className={cn('w-full', className)}>
          <LineChart
            margin={{ top: 0, left: 0, right: -15, bottom: 0 }}
            accessibilityLayer
            data={data}
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
              interval='preserveStartEnd'
            />
            <YAxis
              type='number'
              dataKey='total_amount'
              orientation='right'
              axisLine={false}
              tickLine={false}
              tick={{ stroke: 'var(--color-tick)', strokeWidth: 0.5 }}
              tickFormatter={(val: number) => {
                if (val === 0) {
                  return '0';
                }
                return val.toFixed(3);
              }}
              tickMargin={5}
              tickCount={5}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              labelFormatter={(val: string) => moment(val).format('MMMM Do YYYY')}
            />
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
