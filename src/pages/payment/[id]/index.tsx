import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { getOrder } from '@/api/payment';
import { getCurrencies } from '@/api/currency';
import OrderSection from '@/components/OrderSection';
import PaymentSection from '@/components/PaymentSection';
import { formatDate } from '@/helpers/date';
import useWebSocket from '@/hooks/useWebSocket';
import { WS_URL } from '@/config';
import { Currency, GetOrderResponse, PaymentStatus } from '@/types';

export default function PaymentResume({
  order,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const statusMessage = useWebSocket<GetOrderResponse>(`${WS_URL}/${order.identifier}`);
  if (statusMessage !== undefined) {
    if ([PaymentStatus.EX, PaymentStatus.OC].includes(statusMessage.status)) {
      router.push(`/payment/${order.identifier}/canceled`);
    } else if ([PaymentStatus.CO, PaymentStatus.AC].includes(statusMessage.status)) {
      router.push(`/payment/${order.identifier}/completed`);
    }
  }
  return (
    <main className="w-full flex justify-center items-start gap-8">
      <OrderSection
        fiat={order.fiat}
        fiatAmount={order.fiatAmount}
        currency={order.currency}
        createdAt={order.createdAt}
        notes={order.notes}
        commerce={order.commerce}
      />
      <PaymentSection
        expiredTime={order.expiredTime}
        expectedAmout={order.cryptoAmount}
        currencySymbol={order.currency.symbol}
        paymentUri={order.paymentUri}
        tagMemo={order.tagMemo}
        address={order.address}
      />
    </main>
  );
}

export const getServerSideProps = (async context => {
  try {
    const orderInfo = await getOrder((context.params?.id as string) || '');
    if ([PaymentStatus.EX, PaymentStatus.OC].includes(orderInfo.status)) {
      return {
        redirect: { destination: `/payment/${orderInfo.identifier}/canceled`, permanent: false },
      };
    }
    if ([PaymentStatus.CO, PaymentStatus.AC].includes(orderInfo.status)) {
      return {
        redirect: { destination: `/payment/${orderInfo.identifier}/completed`, permanent: false },
      };
    }
    const currencies = await getCurrencies();
    const currency = currencies.find(currency => currency.symbol === orderInfo.currency_id);
    return {
      props: {
        order: {
          identifier: orderInfo.identifier,
          fiatAmount: orderInfo.fiat_amount.toString(),
          fiat: orderInfo.fiat,
          tagMemo: orderInfo.tag_memo,
          address: orderInfo.address,
          cryptoAmount: orderInfo.crypto_amount.toString(),
          currency: currency as Currency,
          createdAt: formatDate(orderInfo.created_at, context.locale),
          expiredTime: orderInfo.expired_time,
          commerce: orderInfo.merchant_device_id.toString(),
          notes: orderInfo.notes,
          paymentUri: context.query.uri as string,
        },
        messages: (await import(`@/translations/${context.locale}.json`)).default,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: { destination: '/', permanent: false },
    };
  }
}) satisfies GetServerSideProps;
