import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import OrderSection from '@/components/OrderSection';
import PaymentSection from '@/components/PaymentSection';

export default function PaymentResume({
  order,
  payment,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="w-full flex justify-center items-start gap-8">
      <OrderSection
        fiat={order.fiat}
        fiatAmount={order.fiat_amount}
        currency={order.currency}
        createdAt={order.created_at}
        notes={order.notes}
        commerce={order.commerce}
      />
      <PaymentSection
        expiredTime={order.expired_time}
        expectedAmout={payment.expected_input_amount}
        currencySymbol={payment.input_currency}
        paymentUri={payment.payment_uri}
        tagMemo={payment.tag_memo}
        address={payment.address}
      />
    </main>
  );
}

export const getServerSideProps = (async context => {
  return {
    props: {
      order: {
        fiat_amount: '56.06',
        fiat: 'EUR',
        currency: {
          symbol: 'XRP_TEST',
          name: 'Ripple Test XRP',
          min_amount: '0.01',
          max_amount: '20000.00',
          image:
            'https://payments.pre-bnvo.com/media/crytocurrencies/CurrencyXRP_Size36_px_StrokeON.png',
          blockchain: 'XRP_TEST',
        },
        commerce: 'Comercio de pruebas Semega',
        created_at: '2024-01-12T18:27:22Z',
        expired_time: '2024-01-12T17:46:22Z',
        notes: 'Viajes & Ocio',
      },
      payment: {
        tag_memo: '2557164061',
        address: 'Xp4Lw2PtQgB7RmedTak143LrXp4Lw2PtQgB7RmedEV731CdTak143LrXp4L',
        input_currency: 'XRP_TEST',
        expected_input_amount: '108.92',
        payment_uri: 'uriuri',
      },
      messages: (await import(`@/translations/${context.locale}.json`)).default,
    },
  };
}) satisfies GetServerSideProps;
