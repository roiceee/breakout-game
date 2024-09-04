import { useState } from "react";
import RoundContext from "./round-context";
import roundsData from "../assets/rounds";
import RoundType from "../types/round-type";

export default function RoundContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //rounds, 8 for now
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rounds, _] = useState((roundsData as RoundType[]).length);
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

  return (
    <RoundContext.Provider
      value={{
        rounds: rounds,
        currentRound: currentRound,
        nextRound: nextRound,
        setCurrentRound: setRound,
      }}
    >
      {children}
    </RoundContext.Provider>
  );
}
