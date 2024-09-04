import { createContext } from "react";

const HintContext = createContext<{
  hints: number;
  useHint: () => boolean;
  setHints: (num: number) => void;
}>({
  hints: 0,
  useHint: () => {
    return true;
  },
  setHints: () => {},
});

export default HintContext;
