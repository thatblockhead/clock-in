import { useEffect, useState } from "react";

export const useTimer = () => {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const clockIn = () => {
    setTime(0);
    setIsActive(true);
  };

  const clockOut = () => {
    setTime(0);
    setIsActive(false);
  };

  const pause = () => {
    setIsActive(false);
  };

  const unpause = () => {
    setIsActive(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  return {
    time,
    isActive,
    clockIn,
    clockOut,
    pause,
    unpause,
  };
};