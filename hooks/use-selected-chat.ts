import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';

import { chatsApi } from '../lib/api/chats';

export function useSelectedChat() {
  const wallet = useWallet();

  const {
    data: selectedChat,
    isFetched,
    isLoading,
  } = useQuery({
    ...chatsApi.getSelectedChatQueryOptions({
      wallet: wallet.publicKey?.toBase58(),
    }),
  });

  return { selectedChat, isFetched, isLoading };
}
