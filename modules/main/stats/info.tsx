import React from 'react';

import { BadgeDollarSign, Banknote, ChartArea, ChartCandlestick, Mail } from 'lucide-react';

export const Info = () => {
  return (
    <div className='flex gap-1 flex-col'>
      <p className='text-base font-medium'>Information</p>
      <div className='grid grid-cols-2 gap-x-5 gap-y-2 w-full'>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <Mail className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-s font-medium text-card-foreground'>Total Messages Counts</p>
            <p className='text-xl leading-6 font-semibold text-number'>12</p>
          </div>
        </div>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <Banknote className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-s font-medium text-card-foreground'>Total SOL paid</p>
            <p className='text-xl leading-6 font-semibold text-number'>124.5 SOL</p>
          </div>
        </div>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <ChartCandlestick className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-s font-medium text-card-foreground'>Total Trades</p>
            <p className='text-xl leading-6 font-semibold text-number'>23</p>
          </div>
        </div>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <ChartArea className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-s font-medium text-card-foreground'>Average Trade PnL</p>
            <p className='text-xl leading-6 font-semibold text-number'>123</p>
          </div>
        </div>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <BadgeDollarSign className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-s font-medium text-card-foreground'>Total PnL</p>
            <p className='text-xl leading-6 font-semibold text-number'>35</p>
          </div>
        </div>
        <div className='flex items-center gap-2 border border-border rounded-lg p-[18px]'>
          <div className='border border-border rounded-full p-[10px] bg-icon-bg'>
            <BadgeDollarSign className='size-3 stroke-[1.5px]' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-s font-medium text-card-foreground'>Total Profits Shared</p>
            <p className='text-xl leading-6 font-semibold text-number'>$23.124</p>
          </div>
        </div>
      </div>
    </div>
  );
};
