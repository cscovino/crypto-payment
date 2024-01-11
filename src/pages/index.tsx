import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';

import PaymentIcon from '@/components/PaymentIcon';
import Button from '@/components/Button';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link href="/payment">
        <Button type={undefined} text={t('payment')} icon={<PaymentIcon />} />
      </Link>
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
