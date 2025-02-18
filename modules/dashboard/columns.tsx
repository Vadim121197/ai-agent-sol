'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: () => {
      return <div className='font-medium'>asd</div>;
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
    cell: () => {
      return <div className='text-center font-medium'>asd</div>;
    },
  },
  {
    accessorKey: 'tx_detail',
    header: () => <div className='text-center'>Transaction details</div>,
    cell: () => {
      return <div className='text-center font-medium'>asd</div>;
    },
  },
  {
    accessorKey: 'destination',
    header: () => <div className='text-center'>From / To</div>,
    cell: () => {
      return <div className='text-center font-medium'>asd</div>;
    },
  },
  {
    accessorKey: 'txn',
    header: () => <div className='text-right'>TXN & X share</div>,
    cell: () => {
      return <div className='text-right font-medium'>asd</div>;
    },
  },
];
