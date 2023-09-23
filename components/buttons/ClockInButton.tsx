import React from 'react';

type ClockInButtonProps = {
  clockIn: () => void;
  handleNewSession: (newSession: any) => void;
};

const ClockInButton: React.FC<ClockInButtonProps> = ({ clockIn, handleNewSession }) => {
  
  const handleClick = () => {
    clockIn();
    handleNewSession({ startTime: Date.now(), endTime: 0, totalTime: 0 });
  };

  return (
    <button onClick={handleClick}>Clock In</button>
  );
};

export default ClockInButton;