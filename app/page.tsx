"use client"

import { useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import ClockInButton from "../components/buttons/ClockInButton";
import ClockOutButton from "../components/buttons/ClockOutButton";
import PauseButton from "../components/buttons/PauseButton";
import UnpauseButton from "../components/buttons/UnpauseButton";
import TimerDisplay from "../components/TimerDisplay";
import JobTitleSelector from "../components/JobTitleSelector";
import { Session, Job } from "@/models";
import EarningsDisplay from "@/components/EarningsDisplay";

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const { time, isActive, clockIn, clockOut, pause, unpause } = useTimer();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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
      <JobTitleSelector selectedJob={selectedJob} setSelectedJob={setSelectedJob}/>
      <TimerDisplay time={time} />
      {selectedJob && <EarningsDisplay wage={selectedJob.wage} time={time}/>}
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