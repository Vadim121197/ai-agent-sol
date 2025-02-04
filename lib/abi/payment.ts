export const paymentAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'prizePoolAddress', type: 'address' },
      { internalType: 'uint256', name: 'poolFeePerc_', type: 'uint256' },
      { internalType: 'address', name: 'teamAddress', type: 'address' },
      { internalType: 'uint256', name: 'teamFeePerc_', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'bytes32', name: 'hashedPrompt', type: 'bytes32' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'BuyIn',
    type: 'event',
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    inputs: [{ internalType: 'bytes32', name: 'hashedPrompt', type: 'bytes32' }],
    name: 'buyIn',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'prizePoolAddress', type: 'address' },
      { internalType: 'address', name: 'teamAddress', type: 'address' },
    ],
    name: 'setAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'poolFeePerc_', type: 'uint256' },
      { internalType: 'uint256', name: 'teamFeePerc_', type: 'uint256' },
    ],
    name: 'setFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'operator_', type: 'address' }],
    name: 'setOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
] as const;
