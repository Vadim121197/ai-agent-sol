import { defaultSelectPeriod } from '@/constants';
import { ApiRoutes, jsonApiInstance } from '@/lib/api/api-instance';
import { AgentBalance, Trade } from '@/types/chart';
import { DashboardStats } from '@/types/stats';
import { queryOptions } from '@tanstack/react-query';
import moment from 'moment';

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
  getDashboardInfo: () => {
    return queryOptions({
      queryKey: [infoApi.baseQueryKey, 'param'],
      queryFn: meta =>
        jsonApiInstance<{ result: DashboardStats }>(
          `${ApiRoutes.STAT_SHILLING}?action_param=dashboard-info`,
          {
            signal: meta.signal,
          },
        ),

      select: res => res.result,
    });
  },
  getTrades: ({ period = defaultSelectPeriod }: { period?: string }) => {
    return queryOptions({
      queryKey: [infoApi.baseQueryKey, 'trades', period],
      queryFn: meta =>
        jsonApiInstance<{ result: Trade[] }>(
          `${ApiRoutes.STAT_SHILLING}?action_param=trades-by-${period}`,
          {
            signal: meta.signal,
          },
        ),
      placeholderData: prev => prev,
      select: res =>
        res.result.map(i => {
          return {
            ...i,
            period: moment(i.period).format('MMMM'),
          };
        }),
    });
  },
  getAgentBalance: ({ period = defaultSelectPeriod }: { period?: string }) => {
    return queryOptions({
      queryKey: [infoApi.baseQueryKey, 'agent', 'balance', period],
      queryFn: meta =>
        jsonApiInstance<{ result: AgentBalance[] }>(
          `${ApiRoutes.STAT_SHILLING}?action_param=agent-balance-by-${period}`,
          {
            signal: meta.signal,
          },
        ),
      placeholderData: prev => prev,
      select: res => {
        return [
          { period: 'March', total_amount: 0 },
          ...res.result.map(i => {
            return {
              ...i,
              period: moment(i.period).format('MMMM'),
            };
          }),
        ];
      },
    });
  },
};
