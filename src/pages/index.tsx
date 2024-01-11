import Link from 'next/link';

import PaymentIcon from '@/components/PaymentIcon';
import Button from '@/components/Button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link href="/payment">
        <Button text="Crear Pago" icon={<PaymentIcon />} onClick={() => { }} />
      </Link>
    </main>
  );
}
