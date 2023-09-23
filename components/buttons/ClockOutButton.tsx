type ClockOutButtonProps = {
  clockOut: () => void;
  handleUpdateSession: (updatedSession: any) => void;
};

const ClockOutButton: React.FC<ClockOutButtonProps> = ({ clockOut, handleUpdateSession }) => {
  
  const handleClick = () => {
    clockOut();
    handleUpdateSession({ endTime: Date.now() });
  };

  return (
    <button onClick={handleClick}>Clock Out</button>
  );
};

export default ClockOutButton;