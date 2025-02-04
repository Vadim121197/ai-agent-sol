import { useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { bondingCurveAbi } from '@/lib/abi/bonding-curve';
import { chatsApi } from '@/lib/api/chats';
import { infoApi } from '@/lib/api/info';
import { ContractsName, contracts } from '@/lib/contracts';
import { Challenges } from '@/types/chat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { parseEther } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

export const useSendMessage = (type: Challenges) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { chain, address } = useAccount();
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

  const messagePriceData = useReadContract({
    abi: bondingCurveAbi,
    address: contracts[ContractsName.BONDING_CURVE],
    functionName: 'FIXED_MESSAGE_PRICE',
  });

  const messagePrice = type === Challenges.SWAP ? messagePriceData.data : parseEther('0.0002');

  const sendMessage = () => {
    if (!address || !chain) {
      return;
    }

    mutate({
      message,
      to: contracts[type === Challenges.SWAP ? ContractsName.BONDING_CURVE : ContractsName.PAYMENT],
      price: messagePrice ?? BigInt(0),
      wallet: address,
      type,
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
