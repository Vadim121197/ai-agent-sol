import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { queryOptions } from '@tanstack/react-query';

export const userApi = {
  baseQueryKey: 'user',
  getBalance: ({
    publicKey,
    connection,
  }: {
    publicKey: PublicKey | null;
    connection: Connection;
  }) => {
    return queryOptions({
      queryKey: [userApi.baseQueryKey, 'balance', { publicKey: publicKey?.toBase58() }],
      queryFn: () => connection.getAccountInfo(publicKey as unknown as PublicKey),
      select: res => {
        return {
          balance: res?.lamports ?? 0,
          formatted: ((res?.lamports ?? 0) / LAMPORTS_PER_SOL).toFixed(2),
        };
      },
      enabled: Boolean(publicKey),
    });
  },
};
