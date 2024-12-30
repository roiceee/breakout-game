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
    <div className={`card p-1 ${className}`}>
      <div className="card-body p-3">
        <RoundDisplayCard className="m-2 w-fit" />
        <h2 className="card-title my-2">{data.title}</h2>

        <div className="text-xl">
          {/* accept html tags */}

          <div
            dangerouslySetInnerHTML={{
              __html: data.instruction
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
