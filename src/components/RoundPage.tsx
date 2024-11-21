import { RoundType } from "../types/round-type";
import AnswerCard from "./AnswerCard";
import InstructionCard from "./InstructionCard";

export default function RoundPage({ data }: { data: RoundType }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="xl:flex items-start justify-center xl:gap-2 w-full">
        <div className="card border-2 shadow-lg w-2/3 mx-auto xl:mx-0 bg-base-100">
          <div className="card-body p-2 flex-row justify-center">
            <img src={data.imageUrl} className="max-h-[60vh] mx-auto w-auto " />
          </div>

          <AnswerCard
            className="mt-2"
            data={data}
          />
        </div>
        <InstructionCard data={data} className="w-1/3" />
      </div>
    </div>
  );
}
