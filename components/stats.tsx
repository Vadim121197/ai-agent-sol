import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { BorderWrapper } from './border-wrapper';
import { Skeleton } from './ui/skeleton';

interface InfoProps {
  isFetched: boolean;
  label: string;
  cards: { label: string; value: string | ReactNode }[];
}

export const Stats = ({ label, cards, isFetched }: InfoProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-lg leading-6 font-semibold'>{label}</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-3 gap-y-[14px]'>
        {cards.map((i, index) => (
          <BorderWrapper
            key={i.label}
            className={cn(
              'flex flex-col gap-[6px] items-center py-4',
              cards.length !== 6 && (index === 0 || index === 1) ? 'col-span-3' : 'col-span-2',
            )}
          >
            <p className='text-base font-normal text-center'>{i.label}</p>
            {isFetched ? (
              <div className='text-xl leading-6 font-semibold text-link-border text-center'>
                {i.value}
              </div>
            ) : (
              <Skeleton className='h-6 w-20' />
            )}
          </BorderWrapper>
        ))}
      </div>
    </div>
  );
};
