import RoundType from "../types/round-type";
import AnswerCard from "./AnswerCard";
import RoundDisplayCard from "./RoundDisplayCard";
import TextToSpeechButton from "./TextToSpeechButton";

export default function RoundPage({ data }: { data: RoundType }) {
  return (
    <div className="xl:flex items-start justify-center xl:gap-10">
      <div className="card border-2 shadow-lg w-full sm:w-[600px] md:w-[700px] xl:w-[800px] mx-auto xl:mx-0">
        <div className="card-body">
          <h2 className="card-title mb-6">{data.title}</h2>
          <img src={data.imageUrl} className=" w-full h-auto mx-auto max-w-[600px] " />
          <RoundDisplayCard className="my-2"/>
          <div>
            <TextToSpeechButton text={data.instruction}/>
          </div>
          <p>{data.instruction}</p>
        </div>
      </div>
      <AnswerCard className="mt-4 xl:mt-0 xl:mx-0" data={data} />
    </div>
  );
}
