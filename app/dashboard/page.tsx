import { AgentBalanceChart } from '@/components/charts/agent-balance';
import { TradeChart } from '@/components/charts/trade';
import { Info } from '@/components/info';
import { Payment, columns } from '@/modules/dashboard/columns';
import { Transactions } from '@/modules/dashboard/transactions';

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',

      from: '1 SOL',
      to: '1M ASSAI',
      price: 0.000521,
      wallet: '0x1234234523453245324',
      txn: 'gdsfgdsfgsdfgdfgdsfgdsfgsdf',
      date: '17.02.2025',
      type: 'Approve Shill & Buy',
    },
    {
      id: '72ased52f',
      amount: 1120,
      status: 'failed',
      email: 'masd@example.com',

      from: '1 SOL',
      to: '1M ASSAI',
      price: 0.000521,
      wallet: '0x1234234523453245324',
      date: '16.02.2025',
      type: 'Reject',
      token: 'ASSAI',
      dex: 'Raydium',
    },
    // ...
  ];
}

export default function Dashboard() {
  const data = getData();
  return (
    <div className='flex overflow-y-hidden gap-[28px] flex-1'>
      <div className='flex flex-col max-h-screen'>
        <div className='flex flex-col gap-[50px] max-h-screen overflow-y-auto scrollbar-thumb-black scrollbar-thumb-rounded scrollbar-w-2 scrolling-touch w-[32rem]'>
          <AgentBalanceChart className='h-[264px]' />
          <TradeChart className='h-[271px]' />
        </div>
      </div>
      <div className='flex-1'>
        <Info
          className='grid grid-cols-3 gap-x-5 gap-y-6'
          label={<p className='text-lg leading-6 font-medium mb-6'>Information</p>}
        />
        <Transactions columns={columns} data={data} />
      </div>
    </div>
  );
}
