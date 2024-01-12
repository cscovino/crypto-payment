import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { Currency } from '@/types';
import SelectModal from '@/components/SelectModal';

export default function CreatePayment({
  currencies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const t = useTranslations('Payment');
  const [amount, setAmount] = useState('0');
  const options = currencies.filter(
    currency =>
      parseFloat(currency.max_amount) >= parseFloat(amount) &&
      parseFloat(currency.min_amount) <= parseFloat(amount),
  );
  return (
    <main className="p-8 w-[42rem] flex flex-col justify-between gap-8 items-center rounded-2xl border border-light-200 shadow-payment">
      <h2 className="heading-2 text-primary-dark">{t('title')}</h2>
      <form className="w-full flex flex-col justify-center items-center gap-8">
        <div className="w-full flex flex-col justify-center items-start gap-1">
          <Input
            type="number"
            label={t('form.amount.label')}
            placeholder={t('form.amount.placeholder')}
            name="amount"
            id="amount"
            step="0.01"
            min="0"
            onChange={evt => setAmount(evt.target.value)}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-1">
          <SelectModal
            defaultOption={currencies[0]}
            options={options}
            label={t('form.currency.label')}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-1">
          <Input
            type="text"
            label={t('form.notes.label')}
            placeholder={t('form.notes.placeholder')}
            name="notes"
            id="notes"
          />
        </div>
        <Button type="submit" text={t('form.submit')} />
      </form>
    </main>
  );
}

export const getServerSideProps = (async context => {
  // const currencies = await getCurrencies();
  const currencies = [
    {
      symbol: 'BCH_TEST',
      name: 'Bitcoin Cash Test BCH',
      min_amount: '0.05',
      max_amount: '20000.00',
      image: 'https://payments.pre-bnvo.com/media/crytocurrencies/CryptoBCH_Size36_px_TT7Td9Q.png',
      blockchain: 'BCH_TEST',
    },
    {
      symbol: 'BTC_TEST',
      name: 'Bitcoin Test BTC',
      min_amount: '0.01',
      max_amount: '10000.00',
      image:
        'https://payments.pre-bnvo.com/media/crytocurrencies/CurrencyBTC_Size36_px_StrokeON.png',
      blockchain: 'BTC_TEST',
    },
    {
      symbol: 'ETH_TEST3',
      name: 'Ethereum Goerli ETH',
      min_amount: '0.05',
      max_amount: '20000.00',
      image:
        'https://payments.pre-bnvo.com/media/crytocurrencies/CurrencyETH_Size36_px_StrokeON.png',
      blockchain: 'ETH_TEST3',
    },
    {
      symbol: 'XRP_TEST',
      name: 'Ripple Test XRP',
      min_amount: '0.01',
      max_amount: '20000.00',
      image:
        'https://payments.pre-bnvo.com/media/crytocurrencies/CurrencyXRP_Size36_px_StrokeON.png',
      blockchain: 'XRP_TEST',
    },
    {
      symbol: 'USDC_TEST3',
      name: 'USD Coin USDC',
      min_amount: '0.05',
      max_amount: '100.00',
      image:
        'https://payments.pre-bnvo.com/media/crytocurrencies/Property_1USDC_-_Ethereum_StrokeON.png',
      blockchain: 'ETH_TEST3',
    },
  ];
  return {
    props: {
      currencies,
      messages: (await import(`@/translations/${context.locale}.json`)).default,
    },
  };
}) satisfies GetServerSideProps<{ currencies: Currency[] }>;
