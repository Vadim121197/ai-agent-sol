'use client';

import { Stats } from '@/components/stats';

import { usePrizePoolInfo } from './use-prize-pool-info';

export const PrizePoolInfo = () => {
  const { messages, ethLocked, participants, isFetched } = usePrizePoolInfo();

  return (
    <Stats
      isFetched={isFetched}
      label='Explorer Prize Pool'
      cards={[
        {
          label: 'Total Prize',
          value: `${ethLocked ?? 0} ETH`,
        },
        {
          label: 'Time Remaining',
          value: '24:24:24',
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
          label: 'Message Price',
          value: '0.0002 ETH',
        },
      ]}
    />
  );
};
