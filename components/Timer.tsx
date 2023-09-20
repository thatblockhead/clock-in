"use client"

import { useEffect, useState } from "react";

type Session = {
  startTime: number;
  endTime: number;
  breaks: number[];
  totalTime: number;
};

export default function Timer() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
  };

  // Run or stop the clock
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

  return (
    <div>
      <h1>{time}s</h1>
      <button onClick={toggleTimer}>
        {isActive ? 'Pause' : 'Clock In'}
      </button>
      <button onClick={resetTimer}>Clock Out</button>
    </div>
  );

}