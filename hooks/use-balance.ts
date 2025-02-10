import { userApi } from '@/lib/api/user';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';

export const useBalance = () => {
  const { publicKey } = useWallet();

  const { connection } = useConnection();

  const { data: balance } = useQuery({
    ...userApi.getBalance({
      publicKey,
      connection,
    }),
  });

  return (
    balance ?? {
      balance: 0,
      formatted: '0.00',
    }
  );
};
