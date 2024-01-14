import { useTranslations } from 'next-intl';

import { copyToClipboard } from '@/helpers/clipboard';

import CopyIcon from '../CopyIcon';
import WarningIcon from '../WarningIcon';
import Stopwatch from '../Stopwatch';
import PaymentMethod from '../PaymentMethod';

interface PaymentSectionProps {
  paymentUri: string;
  expiredTime: string;
  expectedAmout: string;
  currencySymbol: string;
  address: string;
  tagMemo: string;
}

export default function PaymentSection({
  expiredTime,
  expectedAmout,
  currencySymbol,
  address,
  tagMemo,
  paymentUri,
}: PaymentSectionProps) {
  const t = useTranslations();
  const copy = (text: string) => copyToClipboard(text, t('Clipboard.message'));
  return (
    <section className="w-[36.4rem] flex flex-col justify-center">
      <h4 className="heading-4 mb-6">{t('Summary.payment.title')}</h4>
      <div className="w-full flex flex-col justify-center bg-light-white border border-light-200 rounded-2xl p-8 gap-[1.94rem] shadow-payment">
        <div className="flex justify-center items-center gap-1">
          <Stopwatch start={new Date().toISOString()} end={expiredTime} />
        </div>
        <PaymentMethod paymentUri={paymentUri} />
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="flex gap-2 justify-center items-center">
            <p className="self-end body-regular font-semibold text-primary-dark">
              {t('Summary.payment.send')}
            </p>
            <p className="stylized-medium font-bold text-primary-dark">
              {expectedAmout} {currencySymbol}
            </p>
            <button type="button" onClick={() => copy(expectedAmout)}>
              <CopyIcon />
            </button>
          </div>
          <div className="flex gap-2 justify-center items-center px-10">
            <p className="body-regular text-primary-dark break-all text-center">{address}</p>
            <button type="button" className="self-start" onClick={() => copy(address)}>
              <CopyIcon />
            </button>
          </div>
          {!!tagMemo ? (
            <div className="flex gap-2 justify-center items-center px-10">
              <WarningIcon />
              <p className="stylized-semibold text-primary-dark text-center">
                {t('Summary.payment.tag')}: {tagMemo}
              </p>
              <button type="button" className="self-start" onClick={() => copy(tagMemo)}>
                <CopyIcon />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
