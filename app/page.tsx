"use client"

import { useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import ClockInButton from "../components/buttons/ClockInButton";
import ClockOutButton from "../components/buttons/ClockOutButton";
import PauseButton from "../components/buttons/PauseButton";
import UnpauseButton from "../components/buttons/UnpauseButton";
import TimerDisplay from "../components/TimerDisplay";
import JobTitleSelector from "../components/JobTitleSelector";

type Session = {
  startTime: number;
  endTime: number;
  totalTime: number;
};

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const { time, isActive, clockIn, clockOut, pause, unpause } = useTimer();

  const handleNewSession = (newSession: Session) => {
    setSessions([...sessions, newSession]);
    saveSessionsToLocalStorage();
  };

  const handleUpdateSession = (updatedSession: Session) => {
    const lastSessionIndex = sessions.length - 1;
    if (lastSessionIndex >= 0) {
      const updatedSessions = [...sessions];
      updatedSessions[lastSessionIndex] = { ...sessions[lastSessionIndex], ...updatedSession };
      setSessions(updatedSessions);
      saveSessionsToLocalStorage();
    }
  };

  const saveSessionsToLocalStorage = () => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  };

  useEffect(() => {
    const savedSessions = localStorage.getItem('sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <JobTitleSelector />
      <TimerDisplay time={time} />
      <div>
        <PauseButton pause={pause} />
        <UnpauseButton unpause={unpause} />
      </div>
      <div>
        <ClockInButton clockIn={clockIn} handleNewSession={handleNewSession}/>
        <ClockOutButton clockOut={clockOut} handleUpdateSession={handleUpdateSession} />
      </div>
    </main>
  );
}