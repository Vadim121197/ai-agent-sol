import { ApiRoutes, jsonApiInstance } from '@/lib/api/api-instance';
import { queryOptions } from '@tanstack/react-query';

export const infoApi = {
  baseQueryKey: 'info',
  getMessageAmount: ({ wallet }: { wallet?: string }) => {
    return queryOptions({
      queryKey: [infoApi.baseQueryKey, 'messages', { wallet }],
      queryFn: meta =>
        jsonApiInstance<{ total_messages: number }>(
          `${ApiRoutes.STAT_MESSAGE}?wallet_address=${wallet}`,
          {
            signal: meta.signal,
          },
        ),
      select: result => result.total_messages,
      enabled: Boolean(wallet),
    });
  },
};
