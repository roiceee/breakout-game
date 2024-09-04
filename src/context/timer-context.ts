import { createContext } from "react";

const TimerContext = createContext<{
  secondsRemaining: number;
  setTime: (seconds: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}>({
  secondsRemaining: 0,
  setTime: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  resetTimer: () => {},
});

export default TimerContext;