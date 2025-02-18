import { useBalance } from '@/hooks/use-balance';
import { useToast } from '@/hooks/use-toast';
import { chatsApi } from '@/lib/api/chats';
import { infoApi } from '@/lib/api/info';
import { MESSAGE_PRICE, paymentApi } from '@/lib/api/payment';
import { queryClient } from '@/lib/query-client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { Rocket } from 'lucide-react';

import { Button } from '../ui/button';

interface PayWithSolProps {
  prevMassage: string;
}

export const PayWithSol = ({ prevMassage }: PayWithSolProps) => {
  const { toast } = useToast();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { balance } = useBalance();

  const { mutate, isPending } = useMutation({
    mutationFn: paymentApi.payWithSol,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [chatsApi.baseQueryKey],
      });
      await queryClient.invalidateQueries({
        queryKey: [infoApi.baseQueryKey],
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    },
  });

  const enoughBalance = Number(balance) > MESSAGE_PRICE;

  return (
    <Button
      className='flex items-center gap-[10px] min-w-[82px] max-w-[240px]'
      onClick={() => {
        if (!publicKey) {
          return;
        }
        mutate({
          fromPubkey: publicKey,
          recipient: 'EU9nux1Wt3Fxaf42VmWVQXcfQKoYJQjbf1hKTc51Ndie',
          connection,
          message: prevMassage,
          sendTransaction,
        });
      }}
      disabled={!publicKey || isPending || !enoughBalance}
    >
      <Rocket className='size-4' />
      <p className='text-sm font-semibold'>
        {enoughBalance ? 'Shill' : `Need ${MESSAGE_PRICE / LAMPORTS_PER_SOL} SOL`}
      </p>
    </Button>
  );
};
