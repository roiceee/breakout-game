import { Gamepad, Lightbulb, TimerReset, Trophy } from "lucide-react";
import { useCallback, useContext, useEffect } from "react";
import RoundPage from "./components/RoundPage";
import HintContext from "./context/hint-context";
import RoundContext from "./context/round-context";
import TimerContext from "./context/timer-context";
import useModal from "./hooks/useModal";
import { convertSecondsToSecondsMinutes } from "./utils/timer";

export default function GamePage() {
  const { rounds, currentRound, setCurrentRound, roundsData } =
    useContext(RoundContext);
  const { hints } = useContext(HintContext);
  const { startTimer, secondsRemaining, stopTimer } = useContext(TimerContext);

  const { openModal: openGameOverModal, ModalComponent } = useModal(
    "error",
    "Game Over",
    "Naubos na ang iyong oras. Pindutin ang button para maglaro muli.",
    "Maglaro muli",
    () => {
      window.onbeforeunload = null;
      window.location.reload();
    }
  );

  const play = useCallback(() => {
    startTimer();
    setCurrentRound(currentRound + 1);
    const audio = new Audio("/start.wav");
    audio.volume = 0.3;
    audio.play();
  }, [currentRound, setCurrentRound, startTimer]);

  //game over
  useEffect(() => {
    if (secondsRemaining === 0) {
      openGameOverModal();
      new Audio("/lose.wav").play();
    }
  }, [secondsRemaining, openGameOverModal]);

  //game finished
  useEffect(() => {
    if (currentRound === rounds + 1) {
      new Audio("/win.wav").play();
      stopTimer();
    }
  }, [currentRound, rounds, stopTimer]);

  return (
    <div className="w-full px-2 md:px-4 lg:px-8">
      {currentRound === 0 && (
        <div className="card bg-base-100 border-primary border-2 min-w-[300px] max-w-[1000px] mx-auto md:absolute md:start-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="card-body">
            <h2 className="card-title mx-auto">{roundsData.title}</h2>

            {/* Greetings */}
            <div className="mt-4">
              <p>{roundsData.greetings}</p>
            </div>

            {/* Objective */}
            <div className="mt-4">
              <h3 className="font-bold text-lg">Layunin:</h3>
              <p>{roundsData.objective}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Panuto:</h3>
              <p>{roundsData.description}</p>
            </div>

            {/* Instructions */}
            <ul className="px-5 mt-4">
              <li className="font-bold list-disc">Mayroon kang 3 hints</li>
              <li className="list-disc">
                Kung maubos ang oras ay hindi na maaaring magpatuloy pa
              </li>
              <li className="list-disc">
                Magsisimula ang laro pag pinindot mo ang{" "}
                <span className="font-bold">"Handa kana ba"</span>
              </li>
            </ul>

            {/* Action Button */}
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary btn-wide text-lg mt-4"
                onClick={play}
              >
                Handa na ako
              </button>
            </div>

            {/* Video Link */}
            <p className="underline text-blue-500 text-right mt-4">
              <a
                href={roundsData.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Panuorin ang video
              </a>
            </p>
          </div>
        </div>
      )}
      {currentRound !== 0 && currentRound < rounds + 1 && (
        <RoundPage data={roundsData.rounds[currentRound - 1]} />
      )}
      {currentRound == rounds + 1 && (
        //thank you page
        <div className="card bg-primary text-primary-content min-w-[300px] max-w-[600px] md:absolute md:start-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="card-body">
            <div>
              <Trophy size={100} className="mx-auto" />
            </div>
            <h2 className="card-title">Pagbati! Natapos mo ang laro!</h2>
            <ul>
              <li className="flex items-center gap-1 mb-2">
                <Gamepad /> Uri ng laro: <b>{roundsData.title}</b>
              </li>
              <li className="flex items-center gap-1 mb-2">
                <TimerReset /> Natitirang oras:{" "}
                <b>{convertSecondsToSecondsMinutes(secondsRemaining)}</b>
              </li>
              <li className="flex items-center gap-1">
                <Lightbulb /> Natitirang hints: <b>{hints}</b>
              </li>
            </ul>
            <div className="card-actions justify-end">
              <button
                className="btn"
                onClick={() => {
                  window.onbeforeunload = null;
                  window.location.reload();
                }}
              >
                Maglaro Muli
              </button>
            </div>
          </div>
        </div>
      )}

      {ModalComponent}
    </div>
  );
}
