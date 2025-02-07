import { AgentBalanceChart } from './charts/agent-balance';
import { TradeChart } from './charts/trade'
import { Info } from './info';

export const Stats = () => {
  return (
    <div className='flex flex-col max-h-screen w-[32%]'>
      <div className='flex flex-col gap-[14px] max-h-screen overflow-y-auto scrollbar-thumb-black scrollbar-thumb-rounded scrollbar-w-2 scrolling-touch'>
        <AgentBalanceChart />
        <TradeChart />
        <Info />
      </div>
    </div>
  );
};
