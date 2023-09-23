type PauseButtonProps = {
  pause: () => void;
};

const PauseButton: React.FC<PauseButtonProps> = ({ pause }) => {
  return (
    <button onClick={pause}>Pause</button>
  );
};

export default PauseButton;