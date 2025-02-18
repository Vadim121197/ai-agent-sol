import React from 'react';

import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={cn(
        'float-right size-14 inline-block animate-spin rounded-full border-4 border-number border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1s_linear_infinite]',
        className,
      )}
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  );
};

export default Loader;
