import { BorderWrapper } from '@/components/border-wrapper';
import { bondingCurveAbi } from '@/lib/abi/bonding-curve';
import { priceFeedAbi } from '@/lib/abi/price-feed';
import { ContractsName, contracts } from '@/lib/contracts';
import { ChartData } from '@/types/chart';
import { createConfig, readContracts } from '@wagmi/core';
import { formatEther, formatUnits, http } from 'viem';
import { sepolia } from 'viem/chains';

import { calculateBondingCurveDataData, initialLiquidity } from '../helprers';
import { BondingCurve } from './bonding-curve';

export const wagmiCoreConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

export const Charts = async () => {
  const res = await readContracts(wagmiCoreConfig, {
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
  });

  const ethLiquidity = Number(formatEther(res[0].result ?? BigInt(0)));

  const ethPrice =
    res[1].result && res[2].result ? Number(formatUnits(res[1].result, res[2].result)) : 1;

  const arr: ChartData[] = [];

  const currentData = calculateBondingCurveDataData(initialLiquidity, ethLiquidity, ethPrice);

  arr.push(currentData);
  let ethAmount = 0.001;
  arr.push(calculateBondingCurveDataData(initialLiquidity, ethAmount, ethPrice, ethLiquidity));
  const step = 40;

  for (let i = 0; i <= step; i++) {
    ethAmount = ethAmount + 1;
    arr.push(calculateBondingCurveDataData(initialLiquidity, ethAmount, ethPrice, ethLiquidity));
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <p className='text-lg leading-6 font-semibold'>Token Fair Launch</p>
      </div>
      <BorderWrapper className='flex flex-col gap-[6px] items-center min-h-[272px] pl-5 pr-2'>
        <BondingCurve bondingCurveData={arr.sort((a, b) => a.x - b.x)} />
      </BorderWrapper>
    </div>
  );
};
