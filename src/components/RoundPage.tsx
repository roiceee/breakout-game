import RoundType from "../types/round-type";
import AnswerCard from "./AnswerCard";
import RoundDisplayCard from "./RoundDisplayCard";

export default function RoundPage({ data }: { data: RoundType }) {
  return (
    <div className="xl:flex items-start justify-center xl:gap-10">
      <div className="card border-2 shadow-lg w-full sm:w-[600px] md:w-[700px] xl:w-[1000px] mx-auto xl:mx-0 bg-base-100">
        <div className="card-body">
          <img src={data.imageUrl} className=" w-full h-auto mx-auto" />
          <RoundDisplayCard className="my-2" />
        </div>
      </div>
      <AnswerCard className="mt-4 xl:mt-0 xl:mx-0 bg-base-100" data={data} />
    </div>
  );
}
