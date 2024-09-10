/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lightbulb, LightbulbOff, Trash2Icon } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import HintContext from "../context/hint-context";
import RoundContext from "../context/round-context";
import useError from "../hooks/useError";
import useModal from "../hooks/useModal";
import RoundType from "../types/round-type";
import AudioPlayerButton from "./TextToSpeechButton";

interface Props {
  data: RoundType;
  className?: string;
  onSubmit?: (answer: any, correctAnswer: any) => boolean;
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

  const onSubmit = (answer: any, correctAnswer: any): boolean => {
    if (answer === correctAnswer) {
      openModal();
      return true;
    } else {
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
    setHintModalContent(undefined, "Hint", data.hintText, "Close");
    setIsHintUsed(false);
    console.log("sheesh");
  }, [data.hintText, setHintModalContent]);

  return (
    <div
      className={`card border-2 shadow-lg w-full sm:w-[600px] md:w-[700px] mx-auto ${className}`}
    >
      <div className="card-body">
        <h2 className="card-title my-2">{data.title}</h2>
        <div>
          <AudioPlayerButton audioSrc={data.audioUrl} />
        </div>
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
            disabled={hints === 0 && !isHintUsed}
          >
            {hints !== 0 || isHintUsed ? <Lightbulb /> : <LightbulbOff />}
          </button>
        </div>
        {/* give me a div for word answer input, it should render per letter */}
        {data.roundType === "word" && (
          <WordAnswerCard data={data} onSubmit={onSubmit} />
        )}
        {data.roundType === "number" && (
          <NumberAnswerCard data={data} onSubmit={onSubmit} />
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

function WordAnswerCard({ data, className, onSubmit }: Props) {
  const [answer, setAnswer] = useState<string>("");
  const { isError, setIsError } = useError();

  const handleAnswer = useCallback(
    (str: string) => {
      if (str === "Backspace") {
        setAnswer(answer.slice(0, -1));
        return;
      }
      if (answer.length === (data.answer as string).length) {
        return;
      }
      setAnswer((prev) => {
        return prev + str;
      });
    },
    [data.answer, answer]
  );

  const handleSubmit = useCallback(() => {
    if (onSubmit) {
      const res = onSubmit(answer, data.answer);
      if (!res) {
        setIsError();
      }
    }
  }, [answer, data.answer, onSubmit, setIsError]);

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }

      if (e.key.match(/^[a-zA-Z]$/) || e.key === "Backspace") {
        handleAnswer(e.key);
      }
    };

    window.addEventListener("keydown", keyPressHandler);

    // Proper cleanup to prevent multiple event listeners
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [handleAnswer, handleSubmit]);

  return (
    <div className={`s${className}`}>
      <div className="flex gap-2 justify-center flex-wrap">
        {
          // cast data.answer to string
          (data.answer as string).split("").map((value, index) => {
            //return an empty circle if depending on answer state

            return (
              <span
                key={`${value}-answer-${index}`}
                className="border-2 rounded-full w-16 h-16 flex justify-center items-center font-bold text-2xl"
              >
                {answer.charAt(index).toUpperCase()}
              </span>
            );
          })
        }
      </div>

      {/* {render a-z keys, capital all} */}

      <div className="flex gap-2 justify-center flex-wrap mt-10">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(
          (char) => (
            <button
              key={char}
              onClick={() => handleAnswer(char)}
              className="border-2 rounded-full w-14 h-14 flex justify-center items-center"
            >
              {char}
            </button>
          )
        )}
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
      {/* submit */}
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

function NumberAnswerCard({ data, className, onSubmit }: Props) {
  const [answer, setAnswer] = useState<string>("");
  const { isError, setIsError } = useError();

  const handleAnswer = useCallback(
    (str: string) => {
      if (str === "Backspace") {
        setAnswer((prev) => {
          return prev.slice(0, -1);
        });
        return;
      }
      if (answer.length === (data.answer as string).length) {
        return;
      }
      setAnswer((prev) => {
        return (prev || "") + str;
      });
    },
    [answer.length, data.answer]
  );

  const handleSubmit = useCallback(() => {
    if (onSubmit) {
      const res = onSubmit(answer, data.answer);
      if (!res) {
        setIsError();
      }
    }
  }, [answer, data.answer, onSubmit, setIsError]);

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }

      if (e.key.match(/^[0-9]$/) || e.key === "Backspace") {
        handleAnswer(e.key);
      }
    };

    window.addEventListener("keydown", keyPressHandler);

    // Proper cleanup to prevent multiple event listeners
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [handleAnswer, handleSubmit]);

  return (
    <div className={`${className}`}>
      {/* render div based on digits */}

      <div className="flex justify-center gap-2">
        {Array.from(
          { length: (data.answer as number).toString().length },
          (_, i) => i
        ).map((_, index) => (
          <span
            key={index}
            className="border-2 rounded-full w-16 h-16 flex justify-center items-center font-bold"
          >
            {answer?.toString().charAt(index) || ""}
          </span>
        ))}
      </div>

      <div className="flex gap-2 justify-center flex-wrap mt-10">
        {Array.from({ length: 10 }, (_, i) => i).map((num) => (
          <button
            key={num}
            onClick={() => handleAnswer(num.toString())}
            className="border-2 rounded-full w-14 h-14 flex justify-center items-center text-2xl"
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

      {/* submit */}
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
      const res = onSubmit(selectedChoice, data.answer);
      if (!res) {
        setIsError(10000);
      }
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
        <div className="mt-2">10 seconds timeout for wrong answer.</div>
      </div>
    </div>
  );
}
