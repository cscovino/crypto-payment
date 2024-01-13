import { PropsWithChildren } from 'react';

interface TooltipProps {
  text: string;
}
export default function Tooltip({ text, children }: PropsWithChildren<TooltipProps>) {
  return (
    <div
      data-tooltip={text}
      className={`relative before:absolute before:hidden hover:before:block before:z-10 
        before:p-2 before:rounded-lg before:border before:border-light-300 before:text-xs 
        before:content-[attr(data-tooltip)] before:bg-light-white before:-translate-y-[80%]
        before:-top-1/2 before:left-1/2 before:-translate-x-1/2 before:font-normal before:w-max
        border:text-center
      `}
    >
      {children}
    </div>
  );
}
