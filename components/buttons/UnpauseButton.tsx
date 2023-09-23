import React from 'react';
import { useTimer } from '../../hooks/useTimer';

const UnpauseButton: React.FC = () => {
  const { unpause } = useTimer();
  
  return (
    <button onClick={unpause}>Unpause</button>
  );
};

export default UnpauseButton;