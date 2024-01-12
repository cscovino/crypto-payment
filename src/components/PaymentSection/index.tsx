import { useTranslations } from 'next-intl';

import { copyToClipboard } from '@/helpers/clipboard';

import Badge from '../Badge';
import CopyIcon from '../CopyIcon';
import QRCard from '../QRCard';
import StopwatchIcon from '../StopwatchIcon';
import WarningIcon from '../WarningIcon';

interface PaymentSectionProps {
  createdAt: string;
  paymentUri: string;
  expiredTime: string;
  expectedAmout: string;
  currencySymbol: string;
  address: string;
  tagMemo: string;
}

export default function PaymentSection({
  createdAt,
  expiredTime,
  expectedAmout,
  currencySymbol,
  address,
  tagMemo,
  paymentUri,
}: PaymentSectionProps) {
  const t = useTranslations('Summary.payment');
  return (
    <section className="w-[36.4rem] flex flex-col justify-center">
      <h4 className="heading-4 mb-6">{t('title')}</h4>
      <div className="w-full flex flex-col justify-center bg-light-white border border-light-200 rounded-2xl p-8 gap-[1.94rem] shadow-payment">
        <div className="flex justify-center items-center gap-1">
          <StopwatchIcon />
          <span className="stylized-semibold">05:08</span>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Badge text={t('qr')} active />
          <Badge text={t('web3')} active={false} />
        </div>
        <div className="flex justify-center items-center">
          <QRCard info={paymentUri} />
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="flex gap-2 justify-center items-center">
            <p className="self-end body-regular font-semibold text-primary-dark">{t('send')}</p>
            <p className="stylized-medium font-bold text-primary-dark">
              {expectedAmout} {currencySymbol}
            </p>
            <button type="button" onClick={() => copyToClipboard(expectedAmout)}>
              <CopyIcon />
            </button>
          </div>
          <div className="flex gap-2 justify-center items-center px-10">
            <p className="body-regular text-primary-dark break-all text-center">{address}</p>
            <button type="button" className="self-start" onClick={() => copyToClipboard(address)}>
              <CopyIcon />
            </button>
          </div>
          <div className="flex gap-2 justify-center items-center px-10">
            <WarningIcon />
            <p className="stylized-semibold text-primary-dark text-center">
              {t('tag')}: {tagMemo}
            </p>
            <button type="button" className="self-start" onClick={() => copyToClipboard(tagMemo)}>
              <CopyIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
