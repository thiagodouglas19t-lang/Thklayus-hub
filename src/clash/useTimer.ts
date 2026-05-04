import { useEffect, useState } from "react";

export function useTimer(initial: number) {
  const [time, setTime] = useState(initial);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (time <= 0) {
      setRunning(false);
      return;
    }
    const id = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [running, time]);

  function start() {
    setTime(initial);
    setRunning(true);
  }

  function reset() {
    setTime(initial);
    setRunning(false);
  }

  return { time, running, start, reset };
}
