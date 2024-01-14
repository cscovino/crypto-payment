import { FormEvent, useRef, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import Button from '@/components/Button';
import Input from '@/components/Input';
import SelectModal from '@/components/SelectModal';
import { postOrder } from '@/api/payment';
import { getCurrencies } from '@/api/currency';
import InfoIcon from '@/components/InfoIcon';
import Tooltip from '@/components/Tooltip';
import { Currency } from '@/types';

export default function CreatePayment({
  currencies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const t = useTranslations('Payment');
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState('0');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const options = currencies.filter(
    currency =>
      parseFloat(currency.max_amount) >= parseFloat(amount) &&
      parseFloat(currency.min_amount) <= parseFloat(amount),
  );
  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (formRef.current) {
      setButtonDisabled(true);
      const formData = new FormData(formRef.current);
      const expected_output_amount = parseFloat(formData.get('amount') as string);
      const input_currency = formData.get('currency') as string;
      const notes = formData.get('notes') as string;
      toast.promise(postOrder({ expected_output_amount, input_currency, notes }), {
        loading: t('form.toast.loading'),
        success: orderInfo => {
          setButtonDisabled(false);
          router.push({
            pathname: `/payment/${orderInfo.identifier}`,
            query: { uri: orderInfo.payment_uri },
          });
          return t('form.toast.success');
        },
        error: () => {
          setButtonDisabled(false);
          return t('form.toast.error');
        },
      });
    }
  };
  return (
    <main className="p-8 w-[42rem] flex flex-col justify-between gap-8 items-center rounded-2xl border border-light-200 shadow-payment">
      <h2 className="heading-2 text-primary-dark">{t('title')}</h2>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="w-full flex flex-col justify-center items-center gap-8"
      >
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
            name="currency"
            defaultOption={currencies[0]}
            options={options}
            label={t('form.currency.label')}
            labelIcon={
              <Tooltip text={t('form.currency.tooltip')}>
                <InfoIcon />
              </Tooltip>
            }
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-1">
          <Input
            type="text"
            label={t('form.notes.label')}
            placeholder={t('form.notes.placeholder')}
            name="notes"
            id="notes"
            maxLength={512}
          />
        </div>
        <Button type="submit" text={t('form.submit')} disabled={buttonDisabled} />
      </form>
    </main>
  );
}

export const getServerSideProps = (async context => {
  try {
    const currencies = await getCurrencies();
    return {
      props: {
        currencies: currencies,
        messages: (await import(`@/translations/${context.locale}.json`)).default,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}) satisfies GetServerSideProps<{ currencies: Currency[] }>;
