import { useEffect, useState } from "react";
import JobTitleSelector from "@/components/JobTitleSelector";
import Timer from "@/components/Timer";

type Session = {
  startTime: number;
  endTime: number;
  totalTime: number;
};

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <JobTitleSelector />
      <Timer />
    </main>
  )
}
