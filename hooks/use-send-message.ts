import { useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { chatsApi } from '@/lib/api/chats';
import { infoApi } from '@/lib/api/info';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSendMessage = () => {
  const { toast } = useToast();
  const wallet = useWallet();

  const queryClient = useQueryClient();

  const [message, setMessage] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: chatsApi.sendMessage,
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

  const sendMessage = () => {
    const publicKey = wallet.publicKey?.toBase58();
    if (!publicKey) {
      return;
    }
    mutate({
      message,
      wallet: publicKey,
    });

    setMessage('');
  };

  return {
    message,
    isPending,
    sendMessage,
    setMessage,
  };
};
