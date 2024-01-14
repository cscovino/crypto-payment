import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Currency } from '@/types';

import CloseIcon from '../CloseIcon';
import SearchInput from '../SearchInput';
import DownArrow from '../DownArrow';
import ModalOption from './ModalOption';

interface SelectModalProps {
  label: string;
  labelIcon?: ReactNode;
  name: string;
  options: Currency[];
  defaultOption: Currency;
}

export default function SelectModal({
  options,
  label,
  labelIcon,
  defaultOption,
  name,
}: SelectModalProps) {
  const t = useTranslations('Common');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [optionsFiltered, setOptionsFiltered] = useState(options);
  const [value, setValue] = useState(options[0] || defaultOption);

  useEffect(() => {
    setOptionsFiltered(options);
  }, [options]);

  const openModal = () => {
    dialogRef.current?.showModal();
  };
  const closeModal = () => dialogRef.current?.close();
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.value) {
      setOptionsFiltered(options);
    } else {
      const re = new RegExp(evt.target.value, 'i');
      setOptionsFiltered(options.filter(opt => opt.name.match(re) || opt.symbol.match(re)));
    }
  };
  const onSelect = (option: Currency) => {
    setValue(option);
    closeModal();
  };
  return (
    <>
      <label
        className="flex justify-center items-center gap-1 body-bold text-primary-dark"
        onClick={openModal}
      >
        {label}
        {labelIcon}
      </label>
      <div className="relative w-full">
        <select
          className="absolute top-0 left-0 w-full h-full opacity-0"
          id={name}
          name={name}
          value={value.symbol}
          onClick={openModal}
          onChange={() => { }}
        >
          {options.map(opt => (
            <option value={opt.symbol} key={opt.symbol} />
          ))}
        </select>
        <div className="w-full flex py-[1.12rem] px-3 rounded-md border border-dark-500 gap-2">
          <Image src={value.image} alt={value.symbol} width={20} height={20} />
          <span className="body-regular w-full text-primary-dark">{value.name}</span>
          <DownArrow />
        </div>
      </div>
      <dialog ref={dialogRef} className="rounded-xl shadow-modal bg-light-white w-[42rem]">
        <div className="w-full flex flex-col justify-center items-center p-6">
          <div className="w-full flex justify-between items-center mb-4">
            <span className="heading-5 text-primary-dark">{label}</span>
            <button type="button" onClick={closeModal}>
              <CloseIcon />
            </button>
          </div>
          <SearchInput placeholder={t('search')} onChange={onChange} />
          <div className="w-full flex flex-col justify-center items-center py-3 mt-2 gap-6">
            {optionsFiltered.map(option => (
              <ModalOption
                key={option.symbol}
                name={option.name}
                symbol={option.symbol}
                image={option.image}
                selectedName={value.name}
                onClick={() => onSelect(option)}
              />
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
