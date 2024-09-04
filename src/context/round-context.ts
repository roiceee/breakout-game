import { createContext } from "react";

const RoundContext = createContext<{
  rounds: number;
  currentRound: number;
  nextRound: () => void;
  setCurrentRound: (currentRound: number) => void;
}>({
  rounds: 0,
  currentRound: 0,
  nextRound: () => {},
  setCurrentRound: () => {},
});

export default RoundContext;
