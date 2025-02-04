import { useQuery } from '@tanstack/react-query';

import { chatsApi } from '../lib/api/chats';

export function useSelectedChat() {
  const { data: selectedChat, isFetched } = useQuery({
    ...chatsApi.getSelectedChatQueryOptions({
      wallet: '',
    }),
  });

  return { selectedChat, isFetched };
}
