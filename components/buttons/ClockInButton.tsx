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
    <button 
      onClick={handleClick}
      className='bg-gray-700 p-2 rounded'
    >
      Clock In
    </button>
  );
};

export default ClockInButton;