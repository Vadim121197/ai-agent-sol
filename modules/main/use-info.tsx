import { bondingCurveAbi } from '@/lib/abi/bonding-curve';
import { priceFeedAbi } from '@/lib/abi/price-feed';
import { ContractsName, contracts } from '@/lib/contracts';
import { ChartData } from '@/types/chart';
import { Challenges } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';
import { erc20Abi, formatEther, formatUnits } from 'viem';
import { useAccount, useReadContract, useReadContracts } from 'wagmi';

import { infoApi } from '../../lib/api/info';
import { calculateBondingCurveDataData, initialLiquidity } from './helprers';

function calculatePercentage(part: number, whole: number) {
  if (whole === 0) {
    return 0;
  }
  return (part / whole) * 100;
}

export const useMainInfo = () => {
  const { address } = useAccount();

  const messages = useQuery({
    ...infoApi.getMessageAmount({ type: Challenges.SWAP, wallet: address }),
  });

  const participants = useQuery({
    ...infoApi.getParticipants({ type: Challenges.SWAP }),
  });

  const ethLocked = useReadContract({
    abi: bondingCurveAbi,
    address: contracts[ContractsName.BONDING_CURVE],
    functionName: 'ethLiquidity',
    query: {
      select: result => Number(formatEther(result)).toFixed(3),
    },
  });

  const remainingSupply = useReadContracts({
    contracts: [
      {
        abi: bondingCurveAbi,
        address: contracts[ContractsName.BONDING_CURVE],
        functionName: 'tokenLiquidity',
      },
      {
        abi: erc20Abi,
        address: contracts[ContractsName.ERC_20],
        functionName: 'decimals',
      },
    ],
    query: {
      select: res => {
        const remainingSupply = Number(formatUnits(res[0].result ?? BigInt(0), res[1].result ?? 0));

        return {
          remainingSupply,
          bondingCurveProgress: calculatePercentage(
            initialLiquidity - remainingSupply,
            initialLiquidity,
          ).toFixed(2),
        };
      },
    },
  });

  const bondingCurveData = useReadContracts({
    contracts: [
      {
        abi: bondingCurveAbi,
        address: contracts[ContractsName.BONDING_CURVE],
        functionName: 'ethLiquidity',
      },
      {
        abi: priceFeedAbi,
        address: contracts[ContractsName.ETH_PRICE_FEED],
        functionName: 'latestAnswer',
      },
      {
        abi: priceFeedAbi,
        address: contracts[ContractsName.ETH_PRICE_FEED],
        functionName: 'decimals',
      },
    ],
    query: {
      select: res => {
        const ethLiquidity = Number(formatEther(res[0].result ?? BigInt(0)));

        const ethPrice =
          res[1].result && res[2].result ? Number(formatUnits(res[1].result, res[2].result)) : 1;

        const arr: ChartData[] = [];

        const currentData = calculateBondingCurveDataData(initialLiquidity, ethLiquidity, ethPrice);

        arr.push(currentData);
        let ethAmount = 0.001;
        arr.push(
          calculateBondingCurveDataData(initialLiquidity, ethAmount, ethPrice, ethLiquidity),
        );
        const step = 40;

        for (let i = 0; i <= step; i++) {
          ethAmount = ethAmount + 1;
          arr.push(
            calculateBondingCurveDataData(initialLiquidity, ethAmount, ethPrice, ethLiquidity),
          );
        }

        return {
          bondingCurveData: arr.sort((a, b) => a.x - b.x),
          currentTokenPrice: currentData.price * ethPrice,
        };
      },
    },
  });
  
  const isPublicFetched =
    ethLocked.isFetched &&
    remainingSupply.isFetched &&
    bondingCurveData.isFetched &&
    participants.isFetched;

  return {
    messages: messages.data,
    ethLocked: ethLocked.data,
    ...remainingSupply.data,
    ...bondingCurveData.data,
    participants: participants.data,
    isFetched: address ? isPublicFetched && messages.isFetched : isPublicFetched,
  };
};
