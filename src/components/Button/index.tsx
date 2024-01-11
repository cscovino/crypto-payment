import { ReactNode } from 'react';

interface SubmitProps {
  type: undefined | 'submit';
  text: string;
  icon?: ReactNode;
  onClick?: undefined;
  disabled?: boolean;
}

interface ButtonProps {
  type: 'button';
  text: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

type Props = SubmitProps | ButtonProps;

export default function Button({ text, type, icon, disabled = false, onClick }: Props) {
  return (
    <button
      type={type}
      className="heading-6 w-full py-[1.12rem] px-6 inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent text-light-white bg-primary-light hover:opacity-85 disabled:bg-complementary-400 disabled:pointer-events-none"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {icon}
    </button>
  );
}
