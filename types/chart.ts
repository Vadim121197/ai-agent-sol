export interface Trade {
  closed_count: number;
  open_count: number;
  period: string;
}

export interface AgentBalance {
  period: string;
  total_amount: number;
}

export enum Periods {
  YEAR = 'year',
  MONTH = 'month',
  WEEK = 'week',
}
