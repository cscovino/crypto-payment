import { fontTokens } from '@/styles/tokens/font';
import { ReactNode } from 'react';

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  onClick: () => void;
}

export default function Button({ text, onClick, icon }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-3 px-4 inline-flex items-center gap-x-2 rounded-lg border border-transparent ${fontTokens.headings[6]} text-light-white bg-primary-light hover:opacity-85`}
    >
      {text}
      {icon}
    </button>
  );
}
