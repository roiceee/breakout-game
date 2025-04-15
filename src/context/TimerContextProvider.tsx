import { useCallback, useEffect, useRef, useState } from "react";
import TimerContext from "./timer-context";

// This is the initial time in seconds
const seconds = 60 * 60;

export default function TimerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const setTime = (seconds: number) => {
    setSecondsRemaining(seconds);
  };

  const startTimer = useCallback(() => {
    // Avoid starting a new interval if one is already running
    if (intervalRef.current !== null) {
      return;
    }

    // Start timer and save interval reference
    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    // Stop the timer if it is running
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setSecondsRemaining(seconds);
  }, [stopTimer]);

  useEffect(() => {
    // Stop the timer when the count reaches 0
    if (secondsRemaining === 0) {
      stopTimer();
    }
  }, [secondsRemaining, stopTimer]);

  // Cleanup the interval when the component unmounts
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  return (
    <TimerContext.Provider
      value={{
        secondsRemaining,
        setTime,
        startTimer,
        stopTimer,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
