'use client';

import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { infoApi } from '@/lib/api/info';
import { useQuery } from '@tanstack/react-query';
import { BadgeDollarSign, Banknote, ChartArea, ChartCandlestick, Mail } from 'lucide-react';

export const Info = () => {
  const { data, isFetched } = useQuery({
    ...infoApi.getDashboardInfo(),
  });

  return (
    <div className='flex gap-1 flex-col'>
      <p className='text-base font-medium'>Information</p>
      <div className='grid grid-cols-2 gap-x-5 gap-y-2 w-full'>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <Mail className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-sm  font-medium text-card-foreground'>Total Messages Counts</p>
            {isFetched ? (
              <p className='text-xl leading-6 font-semibold text-number'>{data?.message_count}</p>
            ) : (
              <Skeleton className='h-6 w-30' />
            )}
          </div>
        </div>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <Banknote className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-sm font-medium text-card-foreground'>Total SOL paid</p>
            {isFetched ? (
              <p className='text-xl leading-6 font-semibold text-number'>
                {data?.shared_pnl.sol ? Number(data.shared_pnl.sol) : '0.00'} SOL
              </p>
            ) : (
              <Skeleton className='h-6 w-30' />
            )}
          </div>
        </div>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <ChartCandlestick className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-sm font-medium text-card-foreground'>Total Trades</p>
            {isFetched ? (
              <p className='text-xl leading-6 font-semibold text-number'>{data?.total_trades}</p>
            ) : (
              <Skeleton className='h-6 w-30' />
            )}
          </div>
        </div>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <ChartArea className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-sm font-medium text-card-foreground'>Average Trade PnL</p>
            {isFetched ? (
              <p className='text-xl leading-6 font-semibold text-number'>{data?.avg_pnl}</p>
            ) : (
              <Skeleton className='h-6 w-30' />
            )}
          </div>
        </div>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <BadgeDollarSign className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-sm font-medium text-card-foreground'>Total PnL</p>
            {isFetched ? (
              <p className='text-xl leading-6 font-semibold text-number'>{data?.total_pnl}</p>
            ) : (
              <Skeleton className='h-6 w-30' />
            )}
          </div>
        </div>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <BadgeDollarSign className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-sm font-medium text-card-foreground'>Total Profits Shared</p>
            {isFetched ? (
              <p className='text-xl leading-6 font-semibold text-number'>
                ${data?.shared_pnl.usdt ? Number(data.shared_pnl.usdt) : '0.00'}
              </p>
            ) : (
              <Skeleton className='h-6 w-30' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
