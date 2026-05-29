const usdFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => {
  const formatted = usdFormatter.format(Math.abs(value));
  const prefix = value < 0 ? "- " : "";
  return `${prefix}$ ${formatted}`;
};

export const formatLoss = (value: number) => `- $ ${usdFormatter.format(value)}`;

export const formatNumber = (value: number, decimals = 4) => {
  return Number(value).toFixed(decimals);
};

export const formatGainDisplay = (value: number) => {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}$${usdFormatter.format(Math.abs(value))}`;
};

export const formatHoldingAmount = (amount: number, coin: string) => {
  return `${formatNumber(amount)} ${coin}`;
};

export const formatRatePerCoin = (price: number, coin: string) => {
  return `$ ${usdFormatter.format(price)}/${coin}`;
};
