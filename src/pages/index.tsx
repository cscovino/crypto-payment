import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslations } from 'next-intl';

import PaymentIcon from '@/components/PaymentIcon';
import Button from '@/components/Button';
import toast from 'react-hot-toast';

export default function Home({ error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const t = useTranslations('Home');
  if (error) {
    toast.error(error, { id: 'toast-server-error' });
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link href="/payment">
        <Button type={undefined} text={t('payment')} icon={<PaymentIcon />} />
      </Link>
    </main>
  );
}

export const getServerSideProps = (async context => {
  return {
    props: {
      error: (context.query.error as string) || null,
      messages: (await import(`@/translations/${context.locale}.json`)).default,
    },
  };
}) satisfies GetServerSideProps;
