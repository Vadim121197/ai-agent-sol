'use client';

import { PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowBigRight,
  ArrowRightLeft,
  ArrowUpDown,
  ChartColumnStacked,
  Coins,
  Link,
} from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;

  // Change the shape of the data
  from: string;
  to: string;
  price: number;
  wallet: string;
  txn?: string;
  date: string;
  type: string;
  token?: string;
  dex?: string;
}

const WrapperIcon = ({ children }: PropsWithChildren) => {
  return (
    <div className='border rounded-full size-6 flex items-center justify-center'>{children}</div>
  );
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'date',
    header: () => <div className='text-center'>Date</div>,
    cell: info => {
      return <div className='font-medium text-sm'>{info.getValue() as string}</div>;
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <div className='flex items-center justify-center'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Type
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: info => {
      return <div className='font-medium text-sm'>{info.getValue() as string}</div>;
    },
  },
  {
    accessorKey: 'tx_detail',
    header: () => <div className='text-center'>Transaction details</div>,
    cell: ({ row }) => {
      const { from, to, price, status, token } = row.original;
      return (
        <div className='text-center font-medium text-xs'>
          <div className='flex flex-col gap-2'>
            {status === 'failed' ? (
              <>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-1.5'>
                    <WrapperIcon>
                      <Coins size={14} className='stroke-number' />
                    </WrapperIcon>
                    Token :
                  </div>
                  <div className='flex items-center gap-1.5 font-semibold'>{token}</div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-1.5'>
                    <WrapperIcon>
                      <ChartColumnStacked size={14} className='stroke-number' />
                    </WrapperIcon>
                    DEX :
                  </div>
                  <div className='flex items-center gap-1.5 font-semibold '>Raydium</div>
                </div>
              </>
            ) : (
              <>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-1.5'>
                    <WrapperIcon>
                      <ArrowRightLeft size={14} className='stroke-number' />
                    </WrapperIcon>
                    Swap :
                  </div>
                  <div className='flex items-center gap-1.5 font-semibold'>
                    ${from} <ArrowBigRight size={16} /> ${to}
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-1.5'>
                    <WrapperIcon>
                      <ChartColumnStacked size={14} className='stroke-number' />
                    </WrapperIcon>
                    ASSAI Price :
                  </div>
                  <div className='flex items-center gap-1.5 font-semibold text-success'>
                    ${price}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'destination',
    header: () => <div className='text-center'>From / To</div>,
    cell: ({ row }) => {
      const { wallet } = row.original;
      return (
        <div className='text-center font-medium text-xs'>
          Shilled by :{' '}
          <span className='px-1.5 py-0.5 bg-secondary rounded-xxs'>{wallet.slice(0, 6)}...</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'txn',
    header: () => <div className='text-center'>TXN & X share</div>,
    cell: ({ row }) => {
      const { txn, status } = row.original;
      return (
        <div className='flex justify-center font-medium'>
          <div className='w-[58px]'>
            {status === 'failed' ? (
              <span>-</span>
            ) : (
              <div className='flex gap-2 items-center'>
                <WrapperIcon>
                  <Link size={14} className='stroke-number' />
                </WrapperIcon>
                <a href={txn} target='_blank' rel='noreferrer' className='underline text-xs'>
                  Link
                </a>
              </div>
            )}
          </div>
        </div>
      );
    },
  },
];
