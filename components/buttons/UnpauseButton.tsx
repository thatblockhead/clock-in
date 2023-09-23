type UnpauseButtonProps = {
  unpause: () => void;
};

const UnpauseButton: React.FC<UnpauseButtonProps> = ({ unpause }) => {
  return (
    <button onClick={unpause}>Unpause</button>
  );
};

export default UnpauseButton;