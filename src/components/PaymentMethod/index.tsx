import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Badge from '../Badge';
import QRCard from '../QRCard';
import MetaMask from '../MetaMask';
import MetaMaskIcon from '../MetaMaskIcon';

enum Method {
  QR = 'qr',
  WEB3 = 'web3',
}

interface PaymentMethodProps {
  currencySymbol: string;
  paymentUri: string;
  amount: string;
  address: string;
}

export default function PaymentMethod({
  paymentUri,
  amount,
  address,
  currencySymbol,
}: PaymentMethodProps) {
  const t = useTranslations();
  const [method, setMethod] = useState(Method.QR);

  let metamask;
  if (currencySymbol.includes('ETH')) {
    metamask = <MetaMask amount={amount} address={address} />;
  } else {
    metamask = (
      <div className="w-[12.375rem] h-[12.375rem] rounded-lg border border-light-300 flex flex-col p-2 gap-2 justify-center items-center">
        <div className="flex justify-center items-center gap-2 p-2 rounded-lg opacity-50">
          <MetaMaskIcon />
          <span>METAMASK</span>
        </div>
        <span className="stylized-semibold px-1 text-center">{t('Metamask.supported')}</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <button type="button" onClick={() => setMethod(Method.QR)}>
          <Badge text={t('Summary.payment.qr')} active={method === Method.QR} />
        </button>
        <button type="button" onClick={() => setMethod(Method.WEB3)}>
          <Badge text={t('Summary.payment.web3')} active={method === Method.WEB3} />
        </button>
      </div>
      <div className="flex justify-center items-center">
        {method === Method.QR ? <QRCard info={paymentUri} /> : metamask}
      </div>
    </>
  );
}
