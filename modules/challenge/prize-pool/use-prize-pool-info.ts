import { infoApi } from '@/lib/api/info';
import { ContractsName, contracts } from '@/lib/contracts';
import { Challenges } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';
import { formatEther } from 'viem';
import { useAccount, useBalance } from 'wagmi';

export const usePrizePoolInfo = () => {
  const { address } = useAccount();

  const messages = useQuery({
    ...infoApi.getMessageAmount({ type: Challenges.TRANSFER_PRIZE, wallet: address }),
  });

  const participants = useQuery({
    ...infoApi.getParticipants({ type: Challenges.TRANSFER_PRIZE }),
  });

  const ethLocked = useBalance({
    address: contracts[ContractsName.POOL],
    query: {
      select: result => Number(formatEther(result.value)).toFixed(4),
    },
  });

  const isPublicFetched = ethLocked.isFetched && participants.isFetched;

  return {
    messages: messages.data,
    ethLocked: ethLocked.data,
    participants: participants.data,
    isFetched: address ? isPublicFetched && messages.isFetched : isPublicFetched,
  };
};
