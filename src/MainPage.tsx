import { useCallback, useContext, useEffect } from "react";
import roundsData from "./assets/rounds";
import Navbar from "./components/Navbar";
import RoundPage from "./components/RoundPage";
import RoundContext from "./context/round-context";
import TimerContext from "./context/timer-context";
import useModal from "./hooks/useModal";
import HintContext from "./context/hint-context";
import { Lightbulb, TimerReset, Trophy } from "lucide-react";
import { convertSecondsToSecondsMinutes } from "./utils/timer";

export default function MainPage() {
  const { rounds, currentRound, setCurrentRound } = useContext(RoundContext);
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
  }, [currentRound, setCurrentRound, startTimer]);

  //game over
  useEffect(() => {
    if (secondsRemaining === 0) {
      openGameOverModal();
    }
  }, [secondsRemaining, openGameOverModal]);

  //game finished
  useEffect(() => {
    if (currentRound === rounds + 1) {
      stopTimer();
    }
  }, [currentRound, rounds, stopTimer]);

  useEffect(() => {
    window.onbeforeunload = function () {
      return "Are you sure you want to leave?";
    };
  }, []);

  return (
    <main className=" min-h-screen pb-2 font-body" style={{backgroundImage: "url(/pattern.webp)"}}>
      <Navbar className="mb-6" />

      <div className="w-full px-2 md:px-4 lg:px-8">
        {currentRound === 0 && (
          <div className="card bg-primary text-primary-content min-w-[300px] max-w-[600px] mx-auto absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="card-body">
              <h2 className="card-title mx-auto">Breakout Game</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis tenetur, itaque corrupti a assumenda est recusandae
                quod ipsum voluptates cum debitis vel dolorum facilis! Odio quos
                ea blanditiis. Dicta, laboriosam deserunt blanditiis odio quas
                facere quam fugiat accusamus architecto quae delectus, provident
                possimus, amet pariatur quasi repudiandae obcaecati expedita
                qui?
              </p>
              <ul className="px-5 mt-4">
                <li className="font-bold list-disc">Mayroon kang 3 hints</li>

                <li className="list-disc">Kung maubos ang oras ay hindi na maaaring magpatuloy pa</li>
                <li className="list-disc">
                  Magsisimula ang laro pag pinindot mo ang{" "}
                  <span className="font-bold">"Handa kana ba"</span>
                </li>
              </ul>
              <div className="card-actions justify-center">
                <button className="btn btn-wide text-lg mt-4" onClick={play}>
                  Handa na ako
                </button>
              </div>
            </div>
          </div>
        )}
        {currentRound !== 0 && currentRound < rounds + 1 && (
          <RoundPage data={roundsData[currentRound - 1]} />
        )}
        {currentRound == rounds + 1 && (
          //thank you page
          <div className="card bg-primary text-primary-content min-w-[300px] max-w-[600px] absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="card-body">
              <div>
                <Trophy size={100} className="mx-auto" />
              </div>
              <h2 className="card-title">
                Pagbati! Natapos mo ang laro!
              </h2>
              <ul>
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
      </div>
      {ModalComponent}
    </main>
  );
}
