import { Chat, Decision, Message, Payment, Role } from '@/types/chat';
import { queryOptions } from '@tanstack/react-query';
import moment from 'moment';

import { queryClient } from '../query-client';
import { ApiRoutes, jsonApiInstance } from './api-instance';

export const chatsApi = {
  baseQueryKey: 'chats',
  sendMessage: async ({
    message,
    wallet,
    transaction_hash = null,
    payment_type = null,
  }: {
    message: string;
    wallet: string;
    transaction_hash?: null | string;
    payment_type?: null | Payment;
  }) => {
    const timestamp = Date.now();
    const selectedChat = queryClient.getQueryData(
      chatsApi.getSelectedChatQueryOptions({ wallet }).queryKey,
    );

    if (selectedChat) {
      queryClient.setQueryData(chatsApi.getSelectedChatQueryOptions({ wallet }).queryKey, {
        ...selectedChat,
        history: [
          ...selectedChat.history,
          {
            content: message,
            is_approved: false,
            role: Role.USER,
            timestamp,
            tx_hash: null,
          },
          {
            content: '',
            is_approved: false,
            role: Role.SYSTEM,
            timestamp,
            decision: Decision.REJECT,
            isPending: true,
          },
        ],
      });
    }

    await jsonApiInstance(
      `${ApiRoutes.CHAT_SELECTED}?wallet_address=${wallet}&action_param=shilling`,
      {
        method: 'POST',
        json: {
          message,
          timestamp: Date.now(),
          transaction_hash,
          payment_type,
        },
      },
    );
  },
  getSelectedChatQueryOptions: ({ wallet }: { wallet?: string }) => {
    return queryOptions({
      queryKey: [chatsApi.baseQueryKey, 'selected', { wallet }],
      queryFn: meta =>
        jsonApiInstance<Chat>(
          `${ApiRoutes.CHAT_SELECTED}?&wallet_address=${wallet}&action_param=shilling`,
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
