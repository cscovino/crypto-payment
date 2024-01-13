import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

import Image from 'next/image';
import Button from '../Button';
import MetaMaskIcon from '../MetaMaskIcon';
import { useTranslations } from 'next-intl';
import useTruncatedAddress from '@/hooks/useTruncatedAddress';
import { formatBalance, formatChainAsNum } from '@/helpers/metamask';

interface MetaMaskProps {
  paymentUri: string;
}

const initialState: { accounts: string[]; balance: string; chainId: string } = {
  accounts: [],
  balance: '',
  chainId: '',
};

export default function MetaMask({ paymentUri }: MetaMaskProps) {
  const t = useTranslations('Metamask');
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [wallet, setWallet] = useState(initialState);
  const truncatedAccount = useTruncatedAddress(wallet.accounts ? wallet.accounts[0] : '');

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

  return (
    <div className="w-[12.375rem] h-[12.375rem] rounded-lg border border-light-300 flex flex-col p-2 justify-center items-center">
      <button
        className="flex justify-center items-center gap-2 p-2 rounded-lg enabled:hover:bg-light-200 disabled:opacity-50"
        type="button"
        title={t('connect')}
        onClick={handleConnect}
        disabled={!hasProvider}
      >
        <MetaMaskIcon />
        <span>METAMASK</span>
      </button>
      {!hasProvider ? (
        <span className="stylized-semibold px-1 text-center">{t('install')}</span>
      ) : null}
      {wallet.accounts.length && wallet.chainId && wallet.balance ? (
        <div className="flex flex-col px-6">
          <span className="stylized-semibold px-1 text-center">{t('account')}:</span>
          <span className="stylized-lead px-1 text-center">{truncatedAccount}</span>
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-center items-center">
              <span className="stylized-semibold px-1 text-center">{t('balance')}:</span>
              <span className="stylized-lead px-1 text-center">{wallet.balance}</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="stylized-semibold px-1 text-center">{t('network')}:</span>
              <span className="stylized-lead px-1 text-center">
                {formatChainAsNum(wallet.chainId)}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
