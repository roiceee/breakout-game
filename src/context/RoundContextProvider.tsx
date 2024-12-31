import { useState } from "react";
import { BreakoutType } from "../types/round-type";
import RoundContext from "./round-context";

export default function RoundContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //rounds, 8 for now

  const [rounds, setRounds] = useState(0);
  const [roundsData, setRoundsData] = useState<BreakoutType>({
    title: "",
    rounds: [],
    description: "",
    greetings: "",
    objective: "",
    videoUrl: "",

    ins: [],
  });
  const [currentRound, setCurrentRound] = useState(0);

  const setRound = (currentRound: number) => {
    if (currentRound < 0 || currentRound > rounds) {
      return;
    }
    setCurrentRound(currentRound);
  };

  const nextRound = () => {
    if (currentRound > rounds) {
      return;
    }
    setCurrentRound(currentRound + 1);
  };

  const setRoundData = (roundData: BreakoutType) => {
    setRoundsData(roundData);
    setRounds(roundData.rounds.length);
  };

  return (
    <RoundContext.Provider
      value={{
        rounds: rounds,
        currentRound: currentRound,
        roundsData: roundsData,
        setRoundsData: setRoundData,
        nextRound: nextRound,
        setCurrentRound: setRound,
      }}
    >
      {children}
    </RoundContext.Provider>
  );
}
