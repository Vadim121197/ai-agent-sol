import { Challenges } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { chatsApi } from '../lib/api/chats';

export function useSelectedChat(type: Challenges) {
  const { address } = useAccount();
  const { data: selectedChat, isFetched } = useQuery({
    ...chatsApi.getSelectedChatQueryOptions({
      wallet: address,
      type,
    }),
  });

  return { selectedChat, isFetched };
}
