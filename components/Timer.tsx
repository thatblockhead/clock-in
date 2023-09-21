"use client"

import { useEffect, useState } from "react";

type Session = {
  startTime: number;
  endTime: number;
  breaks: Break[];
  totalTime: number;
};

type Break = {
  startTime: number;
  endTime: number;
};

export default function Timer() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentBreak, setCurrentBreak] = useState<Break | null>(null);

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
    setCurrentBreak(null);

    // Update local storage with complete session object
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }

  function pause() {
    const startTime = Date.now();
    setCurrentBreak({ startTime, endTime: 0 });
    setIsActive(false);
  }

  function unpause() {
    const endTime = Date.now();
    if (currentBreak) {
      const newBreak = { ...currentBreak, endTime };
      const currentSession = { ...sessions[sessions.length - 1] };
      currentSession.breaks.push(newBreak);
      setSessions([...sessions.slice(0, -1), currentSession]);
      setCurrentBreak(null);
      setIsActive(true);
    }
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
        <>
          <div>
            <button onClick={() => pause()}>Pause</button>
          </div>
          <div>
            <button onClick={() => clockOut()}>Clock Out</button>
          </div>
        </>
      ) : (
        <>
          {currentBreak || (sessions.length && sessions[sessions.length - 1].endTime === 0) ? (
            <>
              <div>
                <button onClick={() => unpause()}>Unpause</button>
              </div>
              <div>
                <button onClick={() => clockOut()}>Clock Out</button>
              </div>
            </>
          ) : (
            <div>
              <button onClick={() => clockIn()}>Clock In</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}