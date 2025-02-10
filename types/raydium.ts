export interface RaydiumPool {
  type: 'Standard';
  programId: string;
  id: string;
  mintA: {
    chainId: number;
    address: string;
    programId: string;
    logoURI: string;
    symbol: string;
    name: string;
    decimals: number;
    tags: [];
    extensions: object;
  };
  mintB: {
    chainId: number;
    address: string;
    programId: string;
    logoURI: string;
    symbol: string;
    name: string;
    decimals: number;
    tags: [];
    extensions: object;
  };
  price: number;
  mintAmountA: number;
  mintAmountB: number;
  feeRate: number;
  openTime: string;
  tvl: number;
  day: {
    volume: number;
    volumeQuote: number;
    volumeFee: number;
    apr: number;
    feeApr: number;
    priceMin: number;
    priceMax: number;
    rewardApr: [];
  };
  week: {
    volume: number;
    volumeQuote: number;
    volumeFee: number;
    apr: number;
    feeApr: number;
    priceMin: number;
    priceMax: number;
    rewardApr: [];
  };
  month: {
    volume: number;
    volumeQuote: number;
    volumeFee: number;
    apr: number;
    feeApr: number;
    priceMin: number;
    priceMax: number;
    rewardApr: [];
  };
  pooltype: ['OpenBookMarket'];
  rewardDefaultInfos: [];
  farmUpcomingCount: number;
  farmOngoingCount: number;
  farmFinishedCount: number;
  marketId: string;
  lpMint: {
    chainId: number;
    address: string;
    programId: string;
    logoURI: string;
    symbol: string;
    name: string;
    decimals: number;
    tags: [];
    extensions: object;
  };
  lpPrice: number;
  lpAmount: number;
  burnPercent: number;
}

export interface RaydiumPoolPagination {
  id: string;
  success: boolean;
  data: {
    count: number;
    data: RaydiumPool[];
    hasNextPage: boolean;
  };
}
