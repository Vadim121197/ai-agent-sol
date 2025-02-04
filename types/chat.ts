export enum Challenges {
  TRANSFER_PRIZE = 'transferPrize',
  SWAP = 'swap', // token_launch
  SHILLING = 'shilling',
}

export enum Role {
  SYSTEM = 'system',
  USER = 'user',
}

export type Message = {
  content: string;
  is_approved: boolean;
  timestamp: number;
} & (
  | { role: Role.SYSTEM; decision: 'reject'; isPending?: true }
  | { role: Role.USER; tx_hash: string }
);

export interface Chat {
  created_at: string;
  id: number;
  name: null;
  state: 'active';
  user_id: number;
  uuid: string;
  history: Message[];
}
