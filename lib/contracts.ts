import { Address } from 'viem';

export enum ContractsName {
  ETH_PRICE_FEED,
  BONDING_CURVE,
  ERC_20,
  PAYMENT,
  POOL,
}

export const contracts: Record<ContractsName, Address> = {
  [ContractsName.ETH_PRICE_FEED]: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
  [ContractsName.BONDING_CURVE]: '0x0388252Fa20de58E2C6CE927187185082AC002E9',
  [ContractsName.ERC_20]: '0x15B77d6d6cb817EDA49633825cAfeE297B776BB0',
  [ContractsName.POOL]: '0x816a81fb3E083fD85d8ae4fd2e7Fe381a4883d87',
  [ContractsName.PAYMENT]: '0xE2ed2a7BeE11e2C936b7999913E3866D4cfc4f8E', // Prize pool
};
