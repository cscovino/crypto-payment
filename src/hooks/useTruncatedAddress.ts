import { useMemo } from 'react';

export default function useTruncatedAddress(account: string) {
  const truncated = useMemo(
    () => `${account?.substring(0, 6)}...${account?.substring(account.length - 4)}`,
    [account],
  );

  return truncated;
}
