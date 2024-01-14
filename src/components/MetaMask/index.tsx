import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { formatChainAsNum } from '@/helpers/metamask';
import useMetaMask from '@/hooks/useMetaMask';
import { copyToClipboard } from '@/helpers/clipboard';
import useTruncatedHex from '@/hooks/useTruncatedHex';

import MetaMaskIcon from '../MetaMaskIcon';
import CopyIcon from '../CopyIcon';

interface MetaMaskProps {
  amount: string;
  address: string;
}

export default function MetaMask({ amount, address }: MetaMaskProps) {
  const t = useTranslations('Metamask');
  const [txHash, setTxHash] = useState('');
  const { wallet, hasProvider, handleConnect, sendTransaction } = useMetaMask();
  const truncatedAccount = useTruncatedHex(wallet.accounts ? wallet.accounts[0] : '');
  const truncatedTxHash = useTruncatedHex(txHash);
  const walletConnected = !!wallet.accounts.length && wallet.chainId && wallet.balance;
  const sufficientBalance = parseFloat(wallet.balance) > parseFloat(amount);

  const copy = (text: string) => copyToClipboard(text, t('Clipboard.message'));

  let sendButton = null;
  if (walletConnected) {
    if (sufficientBalance && !txHash) {
      const handleSendTransaction = () => {
        toast.promise(sendTransaction(amount, address), {
          loading: t('loading'),
          success: hash => {
            setTxHash(hash);
            return t('success');
          },
          error: t('error'),
        });
      };
      sendButton = (
        <button
          className="flex justify-center items-center gap-2 p-2 rounded-lg enabled:hover:bg-light-200 disabled:opacity-50"
          type="button"
          onClick={handleSendTransaction}
        >
          {t('send')}
        </button>
      );
    } else if (!txHash) {
      sendButton = <span className="stylized-semibold px-1 text-center">{t('insufficient')}</span>;
    }
  }

  return (
    <div className="w-[12.375rem] h-[12.375rem] rounded-lg border border-light-300 flex flex-col p-2 gap-2 justify-center items-center">
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
      {walletConnected ? (
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
      {sendButton}
      {!!txHash ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <span className="stylized-semibold px-1 text-center">{t('txHash')}:</span>
          <div className="flex gap-1 justify-center items-center">
            <p className="stylized-lead font-bold px-1 break-all text-center">{truncatedTxHash}</p>
            <button type="button" className="self-start" onClick={() => copy(txHash)}>
              <CopyIcon />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
