'use client';

import { Stats } from '@/components/stats';
import { compactNumber } from '@/lib/compact-number';

import { useMainInfo } from './use-info';

export const MainInfo = () => {
  const {
    messages,
    ethLocked,
    remainingSupply,
    bondingCurveProgress,
    currentTokenPrice,
    participants,
    isFetched,
  } = useMainInfo();

  return (
    <Stats
      isFetched={isFetched}
      label='Info'
      cards={[
        {
          label: 'Total Locked',
          value: `${ethLocked ?? 0} ETH`,
        },
        {
          label: 'Remaining Supply',
          value: remainingSupply ? compactNumber(remainingSupply) : 0,
        },
        {
          label: 'Bonding Curve progress',
          value: `${bondingCurveProgress ?? 0}%`,
        },
        {
          label: 'Total Participants',
          value: participants ? participants.length : 0,
        },
        {
          label: 'Total Messages',
          value: messages ?? 0,
        },
        {
          label: 'Current Price',
          value: currentTokenPrice ? currentTokenPrice.toFixed(7) : 0,
        },
      ]}
    />
  );
};
