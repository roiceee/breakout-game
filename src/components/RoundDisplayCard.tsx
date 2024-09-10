import { useContext } from "react";
import RoundContext from "../context/round-context";
import roundsData from "../assets/rounds";
import { CircleDot, LockKeyholeIcon, WholeWord } from "lucide-react";

export default function RoundDisplayCard({
  className,
}: {
  className?: string;
}) {
  const { currentRound } = useContext(RoundContext);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-2 flex-wrap mx-auto justify-center ">
        {roundsData.map((value, index) => {
          return (
            <span
              
              key={value.title}
              className={`${
                currentRound === index + 1
                  ? "border-accent bg-accent text-accent-content "
                  : ""
              } ${
                index + 1 < currentRound
                  ? " bg-base-300 text-base-content opacity-60"
                  : ""
              } border-2 rounded-full w-12 h-12 flex justify-center items-center select-none`}
            >
              {index + 1 === roundsData.length ? <LockKeyholeIcon/> : <></> }
              {index + 1 !== roundsData.length &&  value.roundType === "word" ? <WholeWord /> : <></>}
              {index + 1 !== roundsData.length &&  value.roundType === "multiple-choice" ? <CircleDot /> : <></>}
              {index + 1 !== roundsData.length &&  value.roundType === "number" ? <span>123</span> : <></>}
            </span>
          );
        })}
      </div>
    </div>
  );
}
