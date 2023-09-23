import React from 'react';
import { useTimer } from '../../hooks/useTimer';

const PauseButton: React.FC = () => {
  const { pause } = useTimer();
  
  return (
    <button onClick={pause}>Pause</button>
  );
};

export default PauseButton;