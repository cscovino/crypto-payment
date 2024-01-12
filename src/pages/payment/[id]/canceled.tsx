import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Link from 'next/link';

export default function PaymentCanceled() {
  const t = useTranslations('Canceled');
  return (
    <main className="p-8 w-[30.62rem] flex flex-col justify-between gap-8 items-center rounded-2xl border border-light-200 shadow-payment">
      <div className="flex flex-col flex-1 justify-center items-center gap-4">
        <RedX />
        <h4 className="heading-4 text-primary-dark">{t('title')}</h4>
        <p className="body-16 text-dark-400 w-4/5 text-center">{t('message')}</p>
      </div>
      <Link href="/payment" className="w-full">
        <Button type={undefined} text={t('button')} />
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

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

function RedX() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81" fill="none">
      <path
        opacity="0.4"
        d="M40 73.8333C58.4095 73.8333 73.3333 58.9095 73.3333 40.5C73.3333 22.0905 58.4095 7.16666 40 7.16666C21.5905 7.16666 6.66663 22.0905 6.66663 40.5C6.66663 58.9095 21.5905 73.8333 40 73.8333Z"
        fill="#DC2626"
      />
      <path
        d="M43.5333 40.5L51.1999 32.8333C52.1666 31.8667 52.1666 30.2667 51.1999 29.3C50.2333 28.3333 48.6333 28.3333 47.6666 29.3L39.9999 36.9667L32.3333 29.3C31.3666 28.3333 29.7666 28.3333 28.8 29.3C27.8333 30.2667 27.8333 31.8667 28.8 32.8333L36.4666 40.5L28.8 48.1667C27.8333 49.1333 27.8333 50.7333 28.8 51.7C29.3 52.2 29.9333 52.4333 30.5666 52.4333C31.2 52.4333 31.8333 52.2 32.3333 51.7L39.9999 44.0333L47.6666 51.7C48.1666 52.2 48.7999 52.4333 49.4333 52.4333C50.0666 52.4333 50.6999 52.2 51.1999 51.7C52.1666 50.7333 52.1666 49.1333 51.1999 48.1667L43.5333 40.5Z"
        fill="#DC2626"
      />
    </svg>
  );
}
