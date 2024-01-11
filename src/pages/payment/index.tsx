import Button from '@/components/Button';
import Input from '@/components/Input';

export default function CreatePayment() {
  return (
    <main className="p-8 w-[42rem] flex flex-col justify-between gap-8 items-center rounded-2xl border border-light-200 shadow-payment">
      <h2 className="heading-2 text-primary-dark">Crear pago</h2>
      <form className="w-full flex flex-col justify-center items-center gap-8">
        <div className="w-full flex flex-col justify-center items-start gap-1">
          <Input
            type="number"
            label="Importe a pagar"
            placeholder="Añade importe a pagar"
            name="amount"
            id="amount"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-1">
          <Input
            type="text"
            label="Concepto"
            placeholder="Añade descripción del pago"
            name="notes"
            id="notes"
          />
        </div>
        <Button type="submit" text="Continuar" />
      </form>
    </main>
  );
}
