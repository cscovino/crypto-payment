import Image from 'next/image';

import RightArrow from '../RightArrow';
import CheckCircle from '../CheckCircle';

interface ModalOptionProps {
  image: string;
  symbol: string;
  name: string;
  selectedName: string;
  onClick: () => void;
}

export default function ModalOption({
  image,
  symbol,
  name,
  selectedName,
  onClick,
}: ModalOptionProps) {
  return (
    <div
      className="px-3 py-2 w-full flex justify-between items-center gap-2 hover:bg-light-400"
      onClick={onClick}
    >
      <Image src={image} alt={symbol} width={32} height={32} />
      <div className="flex flex-col w-full">
        <span className="body-regular w-full text-primary-dark">{name}</span>
        <span className="stylized-small w-full text-dark-400">{symbol}</span>
      </div>
      {selectedName === name ? <CheckCircle /> : <RightArrow />}
    </div>
  );
}
