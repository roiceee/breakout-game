import { RoundType } from "../types/round-type";
import AnswerCard from "./AnswerCard";
import InstructionCard from "./InstructionCard";

export default function RoundPage({ data }: { data: RoundType }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col xl:flex-row items-start justify-center gap-2 w-full">
        <div className="card border-2 shadow-lg w-full mx-auto xl:mx-0 bg-base-100">
          <div className="card-body p-2 flex-row justify-center">
            <img src={data.imageUrl} className="max-h-[60vh] mx-auto w-auto " />
          </div>

          <AnswerCard
            className="mt-2"
            data={data}
          />
        </div>
        <InstructionCard data={data} className="w-full" />
      </div>
    </div>
  );
}
