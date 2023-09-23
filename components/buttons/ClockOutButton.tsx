import React from 'react';
import { useTimer } from '../../hooks/useTimer';

type ClockOutButtonProps = {
  handleUpdateSession: (updatedSession: any) => void;
};

const ClockOutButton: React.FC<ClockOutButtonProps> = ({ handleUpdateSession }) => {
  const { clockOut, time } = useTimer();
  
  const handleClick = () => {
    clockOut();
    handleUpdateSession({ endTime: Date.now(), totalTime: time });
  };

  return (
    <button onClick={handleClick}>Clock Out</button>
  );
};

export default ClockOutButton;