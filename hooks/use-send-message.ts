import { useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { chatsApi } from '@/lib/api/chats';
import { infoApi } from '@/lib/api/info';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSendMessage = () => {
  const { toast } = useToast();

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

  const messagePrice = BigInt(0);

  const sendMessage = () => {
    mutate({
      message,
      wallet: 'CHqVwNg4L44qVicjZWMA1dbsqa3wQXd9jBeZqvYVDE77',
    });

    setMessage('');
  };

  return {
    message,
    messagePrice,
    isPending,
    sendMessage,
    setMessage,
  };
};
