import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Currency } from '@/types';

import CheckStar from '../CheckStart';

interface OrderSectionProps {
  fiatAmount: string;
  fiat: string;
  currency: Currency;
  commerce: string;
  createdAt: string;
  notes: string;
}

export default function OrderSection({
  fiatAmount,
  fiat,
  currency,
  commerce,
  createdAt,
  notes,
}: OrderSectionProps) {
  const t = useTranslations('Summary.order');
  return (
    <section className="w-[clamp(22.4rem,80vw,36.4rem)] flex flex-col justify-center max-sm:m-6">
      <h4 className="heading-4 mb-6">{t('title')}</h4>
      <div className="w-full flex flex-col justify-center bg-light-500 rounded-2xl p-8 gap-[1.94rem] max-sm:p-6">
        <div className="w-full flex justify-between items-start pb-[1.375rem] px-2 border-b border-dark-500">
          <p className="heading-5 text-primary-dark">{t('amount')}:</p>
          <p className="heading-5 text-primary-dark">
            {fiatAmount} {fiat}
          </p>
        </div>
        <div className="w-full flex justify-between items-start pb-[1.375rem] px-2 border-b border-dark-500">
          <p className="stylized-lead text-primary-dark self-center">{t('currency')}:</p>
          <p className="stylized-lead text-primary-dark flex gap-2.5 justify-center items-center">
            <Image src={currency.image} alt={currency.symbol} width={24} height={24} />
            {currency.symbol}
          </p>
        </div>
        <div className="w-full flex justify-between items-start px-2">
          <p className="stylized-lead text-primary-dark self-center">{t('commerce')}:</p>
          <p className="stylized-lead text-primary-dark flex gap-2.5 justify-center items-center">
            <CheckStar />
            {commerce}
          </p>
        </div>
        <div className="w-full flex justify-between items-start px-2">
          <p className="stylized-lead text-primary-dark">{t('date')}:</p>
          <p className="heading-6 text-primary-dark">{createdAt}</p>
        </div>
        <div className="w-full flex justify-between items-start pt-[1.375rem] px-2 border-t border-dark-500">
          <p className="stylized-lead text-primary-dark">{t('notes')}:</p>
          <p className="heading-6 text-primary-dark">{notes}</p>
        </div>
      </div>
    </section>
  );
}
