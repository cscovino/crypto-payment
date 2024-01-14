import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

import { ethToWei, formatBalance } from '@/helpers/metamask';

const initialState: { accounts: string[]; balance: string; chainId: string } = {
  accounts: [],
  balance: '',
  chainId: '',
};

export default function useMetaMask() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const refreshAccounts = (accounts: unknown) => {
      if ((accounts as string[]).length > 0) {
        updateAccount(accounts as string[]);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };
    const refreshChain = (chainId: unknown) => {
      updateChainId(chainId as string);
    };
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        window.ethereum?.on('accountsChanged', refreshAccounts);
        window.ethereum?.on('chainChanged', refreshChain);
      }
    };

    getProvider();
    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts);
      window.ethereum?.removeListener('chainChanged', refreshChain);
    };
  }, []);

  const updateChainId = async (chainId: string) => {
    const accounts = (await window.ethereum?.request({
      method: 'eth_requestAccounts',
    })) as string[];
    const balance = formatBalance(
      (await window.ethereum?.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      })) as string,
    );
    setWallet({ accounts, balance, chainId });
  };

  const updateAccount = async (accounts: string[]) => {
    const balance = formatBalance(
      (await window.ethereum?.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      })) as string,
    );
    const chainId = await window.ethereum!.request({
      method: 'eth_chainId',
    });
    setWallet({ accounts, balance, chainId: chainId as string });
  };

  const handleConnect = async () => {
    const accounts = await window.ethereum?.request({ method: 'eth_requestAccounts' });
    updateAccount(accounts as string[]);
  };

  const sendTransaction = async (amount: string, address: string) => {
    const txHash = await window.ethereum?.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: address,
          from: wallet.accounts[0],
          value: ethToWei(amount),
        },
      ],
    });
    return txHash as string;
  };

  return { handleConnect, hasProvider, sendTransaction, wallet };
}
