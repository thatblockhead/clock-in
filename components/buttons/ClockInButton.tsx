import React from 'react';
import { useTimer } from '../../hooks/useTimer';

type ClockInButtonProps = {
  handleNewSession: (newSession: any) => void;
};

const ClockInButton: React.FC<ClockInButtonProps> = ({ handleNewSession }) => {
  const { clockIn } = useTimer();
  
  const handleClick = () => {
    clockIn();
    handleNewSession({ startTime: Date.now(), endTime: 0, totalTime: 0 });
  };

  return (
    <button onClick={handleClick}>Clock In</button>
  );
};

export default ClockInButton;