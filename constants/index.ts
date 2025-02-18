import { Periods } from '@/types/chart';

export const selectPeriodOptions = [
  // { label: 'Year', value: Periods.YEAR },
  // { label: 'Month', value: Periods.MONTH },
  { label: 'Week', value: Periods.WEEK },
] as const;

export const tradeSelectPeriodOptions = [
  { label: 'Year', value: Periods.YEAR },
  { label: 'Month', value: Periods.MONTH },
  { label: 'Week', value: Periods.WEEK },
] as const;

export const defaultSelectPeriod = selectPeriodOptions[0].value;
export const tradeDefaultSelectPeriod = tradeSelectPeriodOptions[0].value;
