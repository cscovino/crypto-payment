import { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  maxLength?: number;
  min?: string;
  max?: string;
}

export default function Input({
  label,
  id,
  name,
  placeholder,
  type,
  maxLength,
  min,
  max,
}: InputProps) {
  return (
    <>
      <label className="label-form text-primary-dark" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="input-form w-full text-primary-dark placeholder:text-dark-400 py-[1.12rem] px-3 rounded-md border border-light-300"
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        min={min}
        max={max}
      />
    </>
  );
}
