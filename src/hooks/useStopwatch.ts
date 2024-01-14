import { useEffect, useState } from 'react';

import { msToStringTime } from '@/helpers/time';

export default function useStopwatch(start: string, end: string, step: number = 1000) {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const remainingTime = endTime - startTime;
  const [time, setTime] = useState(remainingTime > 0 ? remainingTime : 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        const remain = prev - step;
        if (remain < 0) {
          clearInterval(interval);
        }
        return remain > 0 ? remain : 0;
      });
    }, step);

    return () => clearInterval(interval);
  }, []);

  return msToStringTime(time);
}
