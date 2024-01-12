import { ChangeEvent } from 'react';
import SearchIcon from '../SearchIcon';

interface SearchInputProps {
  placeholder: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ placeholder, onChange }: SearchInputProps) {
  return (
    <div className="w-full relative">
      <input
        className="body-regular w-full text-primary-dark placeholder:text-dark-400 py-3.5 px-3 pl-10 rounded-md border border-light-300"
        placeholder={placeholder}
        onChange={onChange}
      />
      <SearchIcon className="absolute left-3 top-3.5 bottom-3.5" />
    </div>
  );
}
