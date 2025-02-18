export const selectPeriodOptions = [
  { label: 'Year', value: 'year' },
  { label: 'Month', value: 'month' },
  { label: 'Week', value: 'week' },
] as const;

export const defaultSelectPeriod = selectPeriodOptions[0].value;
