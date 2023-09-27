import { Session } from "@/models";

type ClockOutButtonProps = {
  clockOut: () => void;
  sessions: Session[];
  handleUpdateSession: (updatedSession: any) => void;
};

const ClockOutButton: React.FC<ClockOutButtonProps> = ({ clockOut, sessions, handleUpdateSession }) => {
  
  const handleClick = () => {
    const endTime = Date.now();
    clockOut();
    const lastSession = sessions[sessions.length - 1];
    const totalTime = endTime - lastSession.startTime;
    handleUpdateSession({ endTime, totalTime });
  };
  

  return (
    <button onClick={handleClick}>Clock Out</button>
  );
};

export default ClockOutButton;