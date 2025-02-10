import { jsonApiInstance } from '@/lib/api/api-instance';
import { RaydiumPoolPagination } from '@/types/raydium';
import { queryOptions } from '@tanstack/react-query';

export const tokenApi = {
  baseQueryKey: 'token',
  getTokenInfoFromRaydium: ({ tokenId }: { tokenId?: string }) => {
    return queryOptions({
      queryKey: [tokenApi.baseQueryKey, { tokenId }],
      queryFn: meta =>
        jsonApiInstance<RaydiumPoolPagination>(
          `/pools/info/mint?mint1=${tokenId}&mint2=So11111111111111111111111111111111111111112&poolType=standard&poolSortField=default&sortType=desc&pageSize=100&page=1`,
          {
            signal: meta.signal,
          },
          'https://api-v3.raydium.io',
        ),
      select: result => result.data.data[0],
      enabled: Boolean(tokenId),
      refetchInterval: 1000 * 6,
    });
  },
};
