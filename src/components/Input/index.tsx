import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface InputProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  maxLength?: number;
  min?: string;
  max?: string;
  step?: string;
  required?: boolean;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
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
  step,
  required = true,
  onChange,
}: InputProps) {
  return (
    <>
      <label className="body-bold text-primary-dark" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="body-regular w-full text-primary-dark placeholder:text-dark-400 py-[1.12rem] px-3 rounded-md border border-light-300 valid:border-dark-500"
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
        required={required}
        onChange={onChange}
      />
    </>
  );
}
