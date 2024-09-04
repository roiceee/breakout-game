import { useCallback } from "react";

export default function Countdown({ seconds }: { seconds: number }) {
  const convertSecondsToSecondsMinutes = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    //add leading zero if seconds is less than
    //10

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }, []);

  return (
    <div className="text-center">
      <span className="countdown font-mono text-md sm:text-lg md:text-2xl">
        {convertSecondsToSecondsMinutes(seconds)}
      </span>
      <div className="text-xs">Time left</div>
    </div>
  );
}
