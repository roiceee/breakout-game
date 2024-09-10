import { convertSecondsToSecondsMinutes } from "../utils/timer";

export default function Countdown({ seconds }: { seconds: number }) {
  return (
    <div className="text-center">
      <span className="countdown font-mono text-md sm:text-lg md:text-2xl">
        {convertSecondsToSecondsMinutes(seconds)}
      </span>
      <div className="text-xs">Natitirang Oras</div>
    </div>
  );
}
