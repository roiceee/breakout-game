/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoundType } from "../types/round-type";
import RoundDisplayCard from "./RoundDisplayCard";

interface Props {
  data: RoundType;
  className?: string;
  onSubmit?: (answer: any, correctAnswer: string[]) => boolean;
  type?: "word" | "number";
}

export default function InstructionCard({ data, className }: Props) {
  return (
    <div
      className={`card p-1 bg-white border-2 shadow-lg w-full mx-auto ${className}`}
    >
      <div className="card-body p-3">
        <RoundDisplayCard className="m-2 w-fit mx-auto" />
        <h2 className="card-title my-2">{data.title}</h2>

        <p>{data.instruction}</p>
      </div>
    </div>
  );
}
