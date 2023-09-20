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

  function clockIn() {
    const startTime = Date.now();
    setSessions([...sessions, { startTime, endTime: 0, breaks: [], totalTime: 0 }]);
    setTime(0);
    setIsActive(true);
  }

  function clockOut() {
    const endTime = Date.now();
    const newSession = { ...sessions[sessions.length - 1], endTime, totalTime: time };
    setSessions([...sessions.slice(0, -1), newSession]);
    setTime(0);
    setIsActive(false);

    // Update local storage with complete session object
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }

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
      {isActive ? (
        <button onClick={() => clockOut()}>Clock Out</button>
      ) : (
        <button onClick={() => clockIn()}>Clock In</button>
      )}
    </div>
  );

}