export const initialLiquidity = 1_000_000_000;

export const calculateBondingCurveDataData = (
  initialLiquidity: number,
  ethAmount: number,
  ethPrice: number,
  ethLiquidity?: number,
) => {
  const supplied = initialLiquidity - (2 * initialLiquidity) / (2 + ethAmount);
  const remainder = initialLiquidity - supplied;
  const price = ethAmount ? ethAmount / supplied : 0;
  const marketCap = price * ethPrice * initialLiquidity;

  return {
    y: Number(marketCap.toFixed(0)),
    z:
      !ethLiquidity || Number(ethLiquidity) >= ethAmount ? Number(remainder.toFixed(0)) : undefined,
    x: Number(remainder.toFixed(0)),
    price,
  };
};
