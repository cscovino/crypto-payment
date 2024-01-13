import useStopwatch from '@/hooks/useStopwatch';

import StopwatchIcon from '../StopwatchIcon';

interface StopwatchProps {
  start: string;
  end: string;
  step?: number;
}

export default function Stopwatch({ start, end, step = 1000 }: StopwatchProps) {
  const remainingTime = useStopwatch(start, end, step);
  return (
    <>
      <StopwatchIcon />
      <span className="stylized-semibold">{remainingTime}</span>
    </>
  );
}
