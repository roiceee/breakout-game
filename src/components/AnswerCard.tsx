/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lightbulb, LightbulbOff, Trash2Icon } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import HintContext from "../context/hint-context";
import RoundContext from "../context/round-context";
import useError from "../hooks/useError";
import useModal from "../hooks/useModal";
import { RoundType } from "../types/round-type";
import _ from "lodash";

interface Props {
  data: RoundType;
  className?: string;
  onSubmit?: (answer: any, correctAnswer: string[]) => boolean;
  type?: "word" | "number";
}

export default function AnswerCard({ data, className }: Props) {
  const { nextRound } = useContext(RoundContext);
  const { useHint, hints } = useContext(HintContext);
  const [isHintUsed, setIsHintUsed] = useState<boolean>(false);

  const { openModal, ModalComponent } = useModal(
    "success",
    "Tumpak!",
    "Pinduton ang button sa baba para magpatuloy. Tumatakbo pa ang oras!",
    "Magpatuloy",
    nextRound
  );

  const {
    openModal: openHintModal,
    ModalComponent: HintModalComponent,
    setContent: setHintModalContent,
  } = useModal("primary", "Hint", data.hintText, "Close");

  const onSubmit = (answer: any, correctAnswer: string[]): boolean => {
    if (correctAnswer.includes(answer)) {
      openModal();
      new Audio("/correct.mp3").play();
      return true;
    } else {
      new Audio("/error.mp3").play();
      return false;
    }
  };

  const onUseHint = () => {
    if (isHintUsed) {
      openHintModal();
      return;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (useHint()) {
      // fire hint modal
      openHintModal();
      setIsHintUsed(true);
    }
  };

  useEffect(() => {
    setHintModalContent(
      undefined,
      "Hint",
      data.hintText ? data.hintText : "",
      "Close"
    );
    setIsHintUsed(false);
  }, [data.hintText, setHintModalContent]);

  return (
    <div
      className={`card border-2 shadow-lg w-full sm:w-[600px] md:w-[700px] mx-auto ${className}`}
    >
      <div className="card-body">
        <h2 className="card-title my-2">{data.title}</h2>

        <p>{data.instruction}</p>

        <div className="flex items-center gap-3 justify-end mb-4">
          <span>
            Natitirang Hints: <span className="font-bold">{hints}</span>
          </span>
          <button
            onClick={onUseHint}
            className={`btn btn-sm ${
              isHintUsed ? "btn-outline" : "btn-secondary"
            }`}
            disabled={(hints === 0 && !isHintUsed) || !data.hintText}
          >
            {hints !== 0 || isHintUsed ? <Lightbulb /> : <LightbulbOff />}
          </button>
        </div>
        {/* give me a div for word answer input, it should render per letter */}
        {(data.roundType === "word" || data.roundType === "number") && (
          <InputAnswerCard
            data={data}
            onSubmit={onSubmit}
            type={data.roundType}
          />
        )}
        {data.roundType === "multiple-choice" && (
          <MultipleChoiceCard data={data} onSubmit={onSubmit} />
        )}
      </div>
      {ModalComponent}
      {HintModalComponent}
    </div>
  );
}

function InputAnswerCard({ data, className, onSubmit, type }: Props) {
  const [answer, setAnswer] = useState<string>("");
  const { isError, setIsError } = useError();

  const handleAnswer = useCallback(
    (str: string) => {
      // Prevent input for hyphens and commas
      if (str === "Backspace") {
        setAnswer(answer.slice(0, -1));
        return;
      }

      if (typeof data.answer === "string") {
        if (answer.length >= data.answer.length) {
          return;
        }
      } else {
        if (answer.length >= (data.answer as string[])[0].length) {
          return;
        }
      }

      setAnswer((prev) => prev + str);
    },
    [data.answer, answer]
  );

  const handleSubmit = useCallback(() => {
    if (onSubmit) {
      const cleanedAnswer = answer.replace(/[-,\s]/g, "").toLowerCase();

      let cleanedDataAnswer: string[];

      if (typeof data.answer === "string") {
        cleanedDataAnswer = new Array(
          data.answer.replace(/[-,\s]/g, "").toLowerCase()
        );
      } else {
        cleanedDataAnswer = (data.answer as string[]).map((ans) =>
          ans.replace(/[-,\s]/g, "").toLowerCase()
        );
      }

      const res = onSubmit(cleanedAnswer, cleanedDataAnswer);
      if (!res) {
        setIsError();
        return;
      }
      setAnswer("");
    }
  }, [answer, data.answer, onSubmit, setIsError]);

  const RenderAnswer = (): React.ReactNode => {
    let roundAnswerArray: string[];

    //if data.answer is either string or string[], if string [], get the first value

    if (typeof data.answer === "string") {
      roundAnswerArray = data.answer.split("");
    } else {
      roundAnswerArray = (data.answer as string[])[0].split("");
    }

    const currentAnswerArray = answer.toLowerCase().split("");

    let answerIndexCounter = 0;

    return roundAnswerArray.map((value, index) => {
      if (value === " ") {
        return <span key={`space-${index}`} className="w-8" />;
      }
      if (value === "-") {
        return (
          <span
            key={`hyphen-${index}`}
            className="border-2 rounded-full w-16 h-16 flex justify-center items-center font-bold text-2xl text-gray-400"
          >
            -
          </span>
        );
      }
      if (value === ":") {
        return (
          <span
            key={`colon-${index}`}
            className="border-2 rounded-full w-16 h-16 flex justify-center items-center font-bold text-2xl text-gray-400"
          >
            :
          </span>
        );
      }
      if (value === ",") {
        return (
          <span
            key={`comma-${index}`}
            className="border-2 rounded-full w-16 h-16 flex justify-center items-center font-bold text-2xl text-gray-400"
          >
            ,
          </span>
        );
      }

      return (
        <span
          key={`${value}-answer-${index}`}
          className="border-2 rounded-full w-16 h-16 flex justify-center items-center font-bold text-2xl"
        >
          {_.upperCase(currentAnswerArray[answerIndexCounter++])}
        </span>
      );
    });
  };

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }

      if (type === "word") {
        if (e.key.match(/^[a-zA-Z]$/) || e.key === "Backspace") {
          handleAnswer(e.key);
        }
      }

      if (type === "number") {
        if (e.key.match(/^[0-9]$/) || e.key === "Backspace") {
          handleAnswer(e.key);
        }
      }
    };

    window.addEventListener("keydown", keyPressHandler);

    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [handleAnswer, handleSubmit, type]);

  return (
    <div className={`s${className}`}>
      <div className="flex gap-2 justify-center flex-wrap max-h-[350px] overflow-y-auto overflow-x-hidden">
        {<RenderAnswer />}
      </div>

      {/* Render a-z keys, capital letters */}
      {type === "word" && (
        <div className="flex gap-2 justify-center flex-wrap mt-10">
          {Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(65 + i)
          ).map((char) => (
            <button
              key={char}
              onClick={() => handleAnswer(char)}
              className="border-2 rounded-full w-14 h-14 flex justify-center items-center"
            >
              {char}
            </button>
          ))}
          <button
            onClick={() => handleAnswer("Backspace")}
            className="border-2 rounded-full w-14 h-14 flex justify-center items-center"
          >
            ⌫
          </button>
          <button
            onClick={() => setAnswer("")}
            className="border-2 rounded-full w-14 h-14 flex justify-center items-center"
          >
            <Trash2Icon />
          </button>
        </div>
      )}

      {/* Render 0-9 keys */}
      {type === "number" && (
        <div className="flex gap-2 justify-center flex-wrap mt-10">
          {Array.from({ length: 10 }, (_, i) => i).map((num) => (
            <button
              key={num}
              onClick={() => handleAnswer(num.toString())}
              className="border-2 rounded-full w-14 h-14 flex justify-center items-center"
            >
              {num}
            </button>
          ))}
          {/* backspace */}
          <button
            onClick={() => handleAnswer("Backspace")}
            className="border-2 rounded-full w-14 h-14 flex justify-center items-center"
          >
            ⌫
          </button>
          <button
            onClick={() => setAnswer("")}
            className="border-2 rounded-full w-14 h-14 flex justify-center items-center"
          >
            <Trash2Icon />
          </button>
        </div>
      )}

      {/* Submit */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          className={`btn ${
            isError ? "btn-error" : "btn-accent"
          } btn-wide text-lg`}
        >
          {isError ? "Ulitin Muli" : "Isumite"}
        </button>
      </div>
    </div>
  );
}

function MultipleChoiceCard({ data, className, onSubmit }: Props) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const { isError, setIsError } = useError();

  const handleChoice = useCallback((choice: string) => {
    setSelectedChoice(choice);
  }, []);

  const handleSubmit = useCallback(() => {
    if (onSubmit) {
      const res = onSubmit(selectedChoice, [data.answer as string]);
      if (!res) {
        setIsError(10000);
        return;
      }
      setSelectedChoice(null);
    }
  }, [selectedChoice, data.answer, onSubmit, setIsError]);

  return (
    <div className={`${className}`}>
      <div className="text-center">Select your answer.</div>
      {/* Render multiple-choice options */}
      <div className="flex gap-4 justify-center flex-wrap mt-4">
        {data.choices &&
          Object.entries(data.choices).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleChoice(key)}
              className={`border-3 font-bold btn ${
                selectedChoice === key ? "btn-primary text-primary-content" : ""
              }`}
            >
              {value}
            </button>
          ))}
      </div>

      {/* Submit button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          className={`btn ${
            isError ? "btn-error" : "btn-accent"
          } btn-wide text-xl`}
          disabled={!selectedChoice || isError} // Disable the button if no choice is selected
        >
          {isError ? "Ulitin Muli" : "Isumite"}
        </button>
        <div className="mt-2">10 segundo na penalty sa maling sagot.</div>
      </div>
    </div>
  );
}
