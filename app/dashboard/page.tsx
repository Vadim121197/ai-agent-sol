import { AgentBalanceChart } from '@/components/charts/agent-balance';
import { TradeChart } from '@/components/charts/trade';
import { Info } from '@/components/info';

export default function Dashboard() {
  return (
    <div className='flex overflow-y-hidden gap-[28px] flex-1'>
      <div className='flex flex-col max-h-screen'>
        <div className='flex flex-col gap-[50px] max-h-screen overflow-y-auto scrollbar-thumb-black scrollbar-thumb-rounded scrollbar-w-2 scrolling-touch w-[32rem]'>
          <AgentBalanceChart className='h-[264px]' />
          <TradeChart className='h-[271px]' />
        </div>
      </div>
      <div className='flex-1 flex flex-col gap-5'>
        <Info className='grid grid-cols-3 gap-x-5 gap-y-6' label={<p className='text-lg leading-6 font-medium mb-6'>Information</p>} />
      </div>
    </div>
  );
}
