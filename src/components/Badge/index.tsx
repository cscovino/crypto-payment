interface BadgeProps {
  active: boolean;
  text: string;
}

export default function Badge({ active, text }: BadgeProps) {
  return (
    <span
      className={`py-1.5 px-3 stylized-medium rounded-[6.25rem] ${active ? 'text-light-white bg-primary-light' : 'text-dark-400 bg-light-500'
        }`}
    >
      {text}
    </span>
  );
}
