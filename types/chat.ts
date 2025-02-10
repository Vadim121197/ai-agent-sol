export enum Role {
  SYSTEM = 'system',
  USER = 'user',
}

export enum Decision {
  REJECT = 'reject',
  DISCUSS = 'discuss',
  READY_TO_SHILLING = 'ready_to_shilling',
}

export enum Payment {
  SOLANA = 'solana',
}

export interface AuxData {
  feeRate: number;
  logoURI: string;
  poolAddress: string;
  price: string;
  symbol: string;
  tokenAddress: string;
  tvl: number;
  decimals: number;
}

export interface SystemMessage {
  role: Role.SYSTEM;
  decision: Decision;
  isPending?: true;
  aux_data?: null | AuxData;
}

export type Message = {
  content: string;
  is_approved: boolean;
  timestamp: number;
} & (SystemMessage | { role: Role.USER; tx_hash: string | null });

export interface Chat {
  created_at: string;
  id: number;
  name: null;
  state: 'active';
  user_id: number;
  uuid: string;
  history: Message[];
}
