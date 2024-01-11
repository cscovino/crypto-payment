import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Input from '@/components/Input';

export default function CreatePayment() {
  const t = useTranslations('Payment');
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

export const getStaticProps = (async context => {
  return {
    props: {
      messages: (await import(`@/translations/${context.locale}.json`)).default,
    },
  };
}) satisfies GetStaticProps;
