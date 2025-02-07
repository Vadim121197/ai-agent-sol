import { useQuery } from '@tanstack/react-query';

import { chatsApi } from '../lib/api/chats';

export function useSelectedChat() {
  const { data: selectedChat, isFetched } = useQuery({
    ...chatsApi.getSelectedChatQueryOptions({
      wallet: 'CHqVwNg4L44qVicjZWMA1dbsqa3wQXd9jBeZqvYVDE77',
    }),
  });

  return { selectedChat, isFetched };
}
