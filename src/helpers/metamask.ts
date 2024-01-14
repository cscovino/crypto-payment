export const formatBalance = (rawBalance: string) => {
  const balance = Math.trunc((parseInt(rawBalance) / 1e18) * 1000) / 1000;
  return balance.toString();
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const ethToWei = (eth: string) => {
  return `0x${(parseFloat(eth) * 1e18).toString(16)}`;
};
