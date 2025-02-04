import { BorderWrapper } from '@/components/border-wrapper';

import { BondingCurve } from './bonding-curve';

export const Charts = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <p className='text-lg leading-6 font-semibold'>Token Fair Launch</p>
      </div>
      <BorderWrapper className='flex flex-col gap-[6px] items-center min-h-[272px] pl-5 pr-2'>
        <BondingCurve bondingCurveData={[]} />
      </BorderWrapper>
    </div>
  );
};
