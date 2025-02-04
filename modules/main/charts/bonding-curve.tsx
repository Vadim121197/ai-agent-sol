'use client';

import { ReactElement, ReactNode } from 'react';

import { compactNumber } from '@/lib/compact-number';
import { ChartData } from '@/types/chart';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Text,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { ScatterCustomizedShape, ScatterPointItem } from 'recharts/types/cartesian/Scatter';

const CustomTick: (props: unknown) => ReactElement<SVGElement> = props => {
  const { value } = (props as { payload: { value: number } }).payload;

  return (
    <Text {...(props as object)} className='fill-[#EEE] text-[10px] leading-[15px] font-normal'>
      {compactNumber(value)}
    </Text>
  );
};

export const CustomTooltip: (props: TooltipProps<string, number>) => ReactNode = ({
  active,
  payload,
}) => {
  if (active && payload?.length) {
    return (
      <div className='bg-foreground px-3 py-[6px] rounded-lg'>
        {payload.map((ele, index) => (
          <div key={index}>
            <p className='text-[#000] text-[12px] leading-[18px] font-medium'>
              {(ele.name as unknown as string) === 'x' ? 'Supply' : 'Market Cap'} : {ele.value}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function BondingCurve({ bondingCurveData }: { bondingCurveData: ChartData[] }) {
  const userData = bondingCurveData
    .map(i => ({
      x: i.z,
      y: i.y,
    }))
    .filter(i => i.x);

  const renderCustomBarLabel: ScatterCustomizedShape = (props: ScatterPointItem) => {
    const first = userData[0];

    if (first?.x === (props.payload as { x: number }).x) {
      return (
        <svg
          x={(props.cx ?? 0) - 10}
          y={(props.cy ?? 0) - 10}
          width={20}
          height={20}
          fill='#CA7627'
          viewBox='0 0 40 40'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='20' cy='20' r='20' fill='#CA7627'>
            <animate
              attributeName='r'
              from='8'
              to='20'
              dur='1.5s'
              begin='0s'
              repeatCount='indefinite'
            />
            <animate
              attributeName='opacity'
              from='1'
              to='0'
              dur='1.5s'
              begin='0s'
              repeatCount='indefinite'
            />
          </circle>
          <circle cx='20' cy='20' r='9' fill='#FFF' />
          <circle cx='20' cy='20' r='8' fill='#CA7627' />
        </svg>
      );
    } else {
      return <div />;
    }
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex items-center w-full'>
        <ResponsiveContainer width='100%' height={230} className='mt-0'>
          <ScatterChart>
            <CartesianGrid className='stroke-chart-1/20 stroke-[0.5px]' />
            <XAxis
              type='number'
              dataKey='x'
              reversed
              axisLine={false}
              tickLine={{ className: 'stroke-chart-1/20 stroke-[0.5px]' }}
              tickFormatter={(value: number) => compactNumber(value)}
              tick={<CustomTick />}
            />
            <YAxis
              type='number'
              dataKey='y'
              orientation='right'
              axisLine={false}
              tickLine={{ className: 'stroke-chart-1/20 stroke-[0.5px]' }}
              tickFormatter={(value: number) => compactNumber(value)}
              tick={<CustomTick />}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              data={bondingCurveData}
              fill='#F6EDE0'
              line
              shape={() => {
                return <div />;
              }}
            />
            <Scatter data={userData} fill='#CA7627' line shape={renderCustomBarLabel} />
          </ScatterChart>
        </ResponsiveContainer>
        <p className='[writing-mode:vertical-lr] text-[12px] leading-[18px] font-normal'>
          Market Cap
        </p>
      </div>
      <p className='text-[12px] leading-[18px] font-normal'>Supply</p>
    </div>
  );
}
