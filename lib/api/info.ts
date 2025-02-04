import { paymentAbi } from '@/lib/abi/payment';
import { ApiRoutes, jsonApiInstance } from '@/lib/api/api-instance';
import { ContractsName, contracts } from '@/lib/contracts';
import { Challenges } from '@/types/chat';
import { queryOptions } from '@tanstack/react-query';
import { Address, createPublicClient, decodeEventLog, erc20Abi, http, parseAbiItem } from 'viem';
import { sepolia } from 'viem/chains';

export const infoApi = {
  baseQueryKey: 'info',
  getMessageAmount: ({ type, wallet }: { type: Challenges; wallet?: Address }) => {
    return queryOptions({
      queryKey: [infoApi.baseQueryKey, 'messages', { type, wallet }],
      queryFn: meta =>
        jsonApiInstance<{ total_messages: number }>(
          `${ApiRoutes.STAT_MESSAGE}?action_param=${type}&wallet_address=${wallet}`,
          {
            signal: meta.signal,
          },
        ),
      select: result => result.total_messages,
      enabled: Boolean(wallet),
    });
  },
  getParticipants: ({ type }: { type: Challenges }) => {
    return queryOptions({
      queryKey: [infoApi.baseQueryKey, 'participants', { type }],
      queryFn: () => {
        const client = createPublicClient({
          chain: sepolia,
          transport: http(),
        });

        return client.getLogs({
          address:
            contracts[type === Challenges.SWAP ? ContractsName.ERC_20 : ContractsName.PAYMENT],
          event:
            type === Challenges.SWAP
              ? parseAbiItem('event Transfer(address indexed from, address indexed to, uint256)')
              : parseAbiItem(
                  'event BuyIn(address indexed user, bytes32 hashedPrompt, uint256 amount)',
                ),
          toBlock: 'latest',
          fromBlock: BigInt(type === Challenges.SWAP ? 533118 : 7445522),
        });
      },
      select: result => {
        const addresses = result.map(log => {
          const event = decodeEventLog({
            abi: type === Challenges.SWAP ? erc20Abi : paymentAbi,
            data: log.data,
            topics: log.topics,
          });

          return type === Challenges.SWAP
            ? (event.args as { to: string }).to
            : (event.args as { user: string }).user;
        });
        return [...new Set(addresses)];
      },
    });
  },
};
