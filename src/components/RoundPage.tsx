import { RoundType } from "../types/round-type";
import AnswerCard from "./AnswerCard";
import InstructionCard from "./InstructionCard";

export default function RoundPage({ data }: { data: RoundType }) {
  return (
    <div className="flex flex-col items-center gap-2">
        <div className="card border-2 p-2 shadow-lg w-full mx-auto xl:mx-0 bg-base-100">
          <div className="card-body p-2 justify-center flex-col xl:flex-row gap-6">
            <img src={data.imageUrl} className="max-h-[60vh] mx-auto w-auto " />
            <InstructionCard data={data} className="w-full" />
          </div>

          <AnswerCard className="mt-2" data={data} />
      </div>
    </div>
  );
}
