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
import SessionHistoryDisplay from "@/components/SessionHistoryDisplay";

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const { time, isActive, clockIn, clockOut, pause, unpause, pauseStart, pausedTime } = useTimer();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleNewSession = (newSession: Session) => {
    const updatedSessions = [...sessions, newSession];
    if (selectedJob) {
      updatedSessions[updatedSessions.length - 1].jobTitle = selectedJob.title;
      updatedSessions[updatedSessions.length - 1].earnings = selectedJob.wage * (newSession.totalTime / 3600000);
    }
    setSessions(updatedSessions);
    saveSessionsToLocalStorage(updatedSessions);
  };

  const handleUpdateSession = (updatedSession: Session) => {
    const lastSessionIndex = sessions.length - 1;
    if (lastSessionIndex >= 0) {
      const updatedSessions = [...sessions];
      updatedSessions[lastSessionIndex] = { ...sessions[lastSessionIndex], ...updatedSession };

      if (selectedJob) {
        updatedSessions[lastSessionIndex].jobTitle = selectedJob.title;
        updatedSessions[lastSessionIndex].earnings = selectedJob.wage * (updatedSession.totalTime / 3600000);
      }

      setSessions(updatedSessions);
      saveSessionsToLocalStorage(updatedSessions);
    }
  };

  const saveSessionsToLocalStorage = (updatedSessions: Session[]) => {
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };

  useEffect(() => {
    const savedSessions = localStorage.getItem('sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }

    const savedJob = localStorage.getItem('selectedJob');
    if (savedJob) {
      setSelectedJob(JSON.parse(savedJob));
    }
  }, []);

  useEffect(() => {
    const handleWindowClose = () => {
      if (isActive) {
        const lastSession = sessions[sessions.length - 1];
        if (lastSession) {
          const updatedSession = {
            ...lastSession,
            endTime: Date.now(),
            totalTime: Date.now() - lastSession.startTime - pausedTime
          };
          handleUpdateSession(updatedSession);
        }
      }
    };

    window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, [isActive, sessions, pausedTime]);

  return (
    <main className="flex flex-col items-center p-12">
      <div className="min-h-[64px] flex items-center m-2">
        <JobTitleSelector selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
      </div>
      <div className="flex flex-col px-24 py-6 items-center border rounded-md">
      <div className="min-h-[24px] m-2">
        {selectedJob ? <EarningsDisplay wage={selectedJob.wage} time={time} /> : ""}
      </div>
      <TimerDisplay time={time} />
      <div className="min-h-[24px] m-2">
        {(isActive && pauseStart === null) && <PauseButton pause={pause} />}
        {(!isActive && pauseStart !== null) && <UnpauseButton unpause={unpause} />}
      </div>
      <div className="m-2">
        {!isActive && pauseStart === null && <ClockInButton clockIn={clockIn} handleNewSession={handleNewSession} />}
        {time !== 0 && <ClockOutButton clockOut={clockOut} sessions={sessions} handleUpdateSession={handleUpdateSession} pausedTime={pausedTime} />}
      </div>
      </div>
      <div className="flex flex-col mt-16 w-1/2 min-w-[384px]">
        <SessionHistoryDisplay sessions={sessions} />
      </div>
    </main>
  );
}