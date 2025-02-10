import { useBalance } from '@/hooks/use-balance';

export const Balance = () => {
  const balance = useBalance();

  return (
    <div className='flex items-center gap-2'>
      <p className='text-sm font-medium'>Balance</p>
      <div className='border border-border py-2 px-[10px] rounded-[20px] text-sm font-semibold'>
        {balance.formatted} SOL
      </div>
    </div>
  );
};
