import { useState } from "react";
import HintContext from "./hint-context";

export default function HintContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //3 hints by default
  const [hint, setHints] = useState(3);

  const setHint = (hint: number) => {
    if (hint < 0) {
      return;
    }
    setHints(hint);
  };

  const useHint = () : boolean => {
    if (hint > 0) {
      setHint(hint - 1);
      return true;
    } else {
      return false;
    }
  };

  return (
    <HintContext.Provider
      value={{
        hints: hint,
        useHint: useHint,
        setHints: setHint,
      }}
    >
      {children}
    </HintContext.Provider>
  );
}
