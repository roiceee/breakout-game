import { createContext } from "react";
import { BreakoutType } from "../types/round-type";

const RoundContext = createContext<{
  rounds: number;
  currentRound: number;
  setRoundsData: (roundData: BreakoutType) => void;
  roundsData: BreakoutType;
  nextRound: () => void;
  setCurrentRound: (currentRound: number) => void;
}>({
  rounds: 0,
  currentRound: 0,
  roundsData: {
    title: "",
    rounds: [],
    videoUrl: "",
    greetings: "",
    objective: "",
    description: "",
  },
  setRoundsData: () => {},
  nextRound: () => {},
  setCurrentRound: () => {},
});

export default RoundContext;
