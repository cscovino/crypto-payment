import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Badge from '../Badge';
import QRCard from '../QRCard';
import MetaMask from '../MetaMask';

enum Method {
  QR = 'qr',
  WEB3 = 'web3',
}

interface PaymentMethodProps {
  paymentUri: string;
}

export default function PaymentMethod({ paymentUri }: PaymentMethodProps) {
  const t = useTranslations();
  const [method, setMethod] = useState(Method.QR);

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
        {method === Method.QR ? <QRCard info={paymentUri} /> : <MetaMask paymentUri={paymentUri} />}
      </div>
    </>
  );
}
