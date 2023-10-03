import { useEffect, useState } from "react";

export const useTimer = () => {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [pauseStart, setPauseStart] = useState<number | null>(null);
  const [pausedTime, setPausedTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const clockIn = () => {
    setTime(0.01);
    setIsActive(true);
    setPausedTime(0);
    setStartTime(Date.now());
  };

  const clockOut = () => {
    setTime(0);
    setIsActive(false);
    setPausedTime(0);
    setPauseStart(null);
    setStartTime(null);
  };

  const pause = () => {
    setIsActive(false);
    setPauseStart(Date.now());
  };

  const unpause = () => {
    if (pauseStart) {
      setPausedTime((prevPausedTime) => prevPausedTime + (Date.now() - pauseStart));
      setPauseStart(null);
    }
    setIsActive(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && startTime !== null) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        setTime(Math.floor((currentTime - startTime - pausedTime) / 1000));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, pausedTime, startTime]);

  return {
    time,
    isActive,
    clockIn,
    clockOut,
    pause,
    unpause,
    pauseStart,
    pausedTime,
  };
};