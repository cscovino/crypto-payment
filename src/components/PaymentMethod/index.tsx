import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Badge from '../Badge';
import QRCard from '../QRCard';
import Image from 'next/image';
import toast from 'react-hot-toast';

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
        {method === Method.QR ? (
          <QRCard info={paymentUri} />
        ) : (
          <div className="w-[12.375rem] h-[12.375rem] rounded-lg border border-light-300 flex justify-center items-center">
            <button type="button" onClick={() => toast(t('Metamask.soon'))}>
              <Image src="/metamask.png" alt="metamask" width={137} height={43} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
