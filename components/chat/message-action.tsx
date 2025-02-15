import { firstAndLastFour } from '@/lib/first-last-four';
import { AuxData } from '@/types/chat';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Link } from 'lucide-react';

import { Avatar } from '../ui/avatar';
import { PayWithSol } from './pay-with-sol';
import { PayWithX } from './PayWithX'

interface MessageActionProps {
  pool: AuxData;
  prevMassage: string;
}

export const MessageAction = ({ pool, prevMassage }: MessageActionProps) => {
  return (
    <div className='flex flex-col gap-3 rounded-[20px] border border-border bg-card p-4'>
      <div className='flex items-center gap-3'>
        <Avatar className='size-[26px]'>
          {pool.logoURI && <AvatarImage src={pool.logoURI} />}
          <AvatarFallback />
        </Avatar>
        <p className='text-base font-medium'>{pool.symbol}</p>
      </div>
      <div className='flex gap-10 items-center pb-2'>
        <div className='flex flex-col gap-[2px]'>
          <p className='text-sm font-medium text-card-foreground'>Token Price</p>
          <div className='flex items-center gap-1'>
            <div className='border border-border rounded-[20px] py-[2px] px-[6px]'>
              {pool.price} SOL
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-[2px]'>
          <p className='text-sm font-medium text-card-foreground'>Pool Liquidity</p>
          <div className='flex items-center gap-1'>
            <div className='border border-border rounded-[20px] py-[2px] px-[6px]'>${pool.tvl}</div>
          </div>
        </div>
        <div className='flex flex-col gap-[2px]'>
          <p className='text-sm font-medium text-card-foreground'>Raydium pool</p>
          <div className='flex items-center gap-[10px]'>
            <Link className='size-3' />
            <a
              className='text-sm font-medium underline'
              href={`https://raydium.io/liquidity/increase/?mode=add&pool_id=${pool.poolAddress}`}
              target='_blank'
              rel='noreferrer'
            >
              {firstAndLastFour(pool.poolAddress)}
            </a>
          </div>
        </div>
      </div>

      <div className='flex gap-2'>
        <PayWithSol prevMassage={prevMassage} />
        <PayWithX />
      </div>
    </div>
  );
};
