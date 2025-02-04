import { bondingCurveAbi } from '@/lib/abi/bonding-curve';
import { paymentAbi } from '@/lib/abi/payment';
import { wagmiConfig } from '@/lib/wagmi';
import { Challenges, Chat, Message, Role } from '@/types/chat';
import { queryOptions } from '@tanstack/react-query';
import { estimateGas, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import moment from 'moment';
import { Address, encodeFunctionData, sha256 } from 'viem';

import { queryClient } from '../query-client';
import { ApiRoutes, jsonApiInstance } from './api-instance';

export const chatsApi = {
  baseQueryKey: 'chats',
  sendMessage: async ({
    message,
    to,
    price,
    wallet,
    type,
  }: {
    message: string;
    to: Address;
    price: bigint;
    wallet: Address;
    type: Challenges;
  }) => {
    const timestamp = Date.now();
    const selectedChat = queryClient.getQueryData(
      chatsApi.getSelectedChatQueryOptions({ wallet, type }).queryKey,
    );

    if (selectedChat) {
      queryClient.setQueryData(chatsApi.getSelectedChatQueryOptions({ wallet, type }).queryKey, {
        ...selectedChat,
        history: [
          ...selectedChat.history,
          {
            content: message,
            is_approved: false,
            role: Role.USER,
            timestamp,
            tx_hash: '',
          },
          {
            content: '',
            is_approved: false,
            role: Role.SYSTEM,
            timestamp,
            decision: 'reject',
            isPending: true,
          },
        ],
      });
    }

    if (type === Challenges.SHILLING) {
      await jsonApiInstance(
        `${ApiRoutes.CHAT_SELECTED}?action_param=${type}&wallet_address=${wallet}`,
        {
          method: 'POST',
          json: {
            message,
            timestamp: Date.now(),
            transaction_hash: '',
            context_data: {},
          },
        },
      );
      return;
    }
    const hashedPrompt = sha256(Buffer.from(message, 'utf-8'));

    const gas = await estimateGas(wagmiConfig, {
      to,
      data: encodeFunctionData({
        abi: type === Challenges.SWAP ? bondingCurveAbi : paymentAbi,
        args: [hashedPrompt],
        functionName: 'buyIn',
      }),
      value: price,
    });

    const txHash = await writeContract(wagmiConfig, {
      address: to,
      abi: type === Challenges.SWAP ? bondingCurveAbi : paymentAbi,
      functionName: 'buyIn',
      args: [hashedPrompt],
      value: price,
      gas,
    });

    await waitForTransactionReceipt(wagmiConfig, { hash: txHash });

    await jsonApiInstance(
      `${ApiRoutes.CHAT_SELECTED}?action_param=${type}&wallet_address=${wallet}`,
      {
        method: 'POST',
        json: {
          message,
          timestamp: Date.now(),
          transaction_hash: txHash,
          context_data: {},
        },
      },
    );
  },
  getSelectedChatQueryOptions: ({ wallet, type }: { wallet?: string; type: Challenges }) => {
    return queryOptions({
      queryKey: [chatsApi.baseQueryKey, 'selected', { wallet, type }],
      queryFn: meta =>
        jsonApiInstance<Chat>(
          `${ApiRoutes.CHAT_SELECTED}?action_param=${type}&wallet_address=${wallet}`,
          {
            signal: meta.signal,
          },
        ),
      enabled: Boolean(wallet),
      select: result => {
        const array: {
          date: string;
          items: Message[];
        }[] = [];

        for (const message of result.history) {
          const date = moment(message.timestamp).format('MMM DD');
          const index = array.findIndex(i => i.date === date);

          if (index !== -1) {
            const prev = array[index]?.items ?? [];
            prev.push(message);
            array[index] = {
              date,
              items: prev,
            };
          } else {
            array.unshift({
              date,
              items: [message],
            });
          }
        }
        return array;
      },
    });
  },
};
