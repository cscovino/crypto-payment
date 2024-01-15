import useStopwatch from '@/hooks/useStopwatch';

import StopwatchIcon from '../StopwatchIcon';

interface StopwatchProps {
  start: string;
  end: string;
  step?: number;
  onEnd?: () => void;
}

export default function Stopwatch({ start, end, step = 1000, onEnd }: StopwatchProps) {
  const { remainingTime, finished } = useStopwatch(start, end, step);
  if (finished && !!onEnd) {
    setTimeout(() => onEnd(), 2000);
  }
  return (
    <>
      <StopwatchIcon />
      <span className="stylized-semibold">{remainingTime}</span>
    </>
  );
}
