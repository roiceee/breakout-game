import { useCallback, useContext, useEffect } from "react";
import roundsData from "./assets/rounds";
import Navbar from "./components/Navbar";
import RoundPage from "./components/RoundPage";
import RoundContext from "./context/round-context";
import TimerContext from "./context/timer-context";

export default function MainPage() {
  const { rounds, currentRound, setCurrentRound } = useContext(RoundContext);
  const { startTimer } = useContext(TimerContext);

  const play = useCallback(() => {
    startTimer();
    setCurrentRound(currentRound + 1);
  }, [currentRound, setCurrentRound, startTimer]);

  useEffect(() => {
    window.onbeforeunload = function () {
      return "Are you sure you want to leave?";
    };
  }, []);

  return (
    <main className=" min-h-screen pb-6">
      <Navbar className="mb-12" />

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
              <ul>
                <li className="font-bold list-disc">You have 3 hints</li>
                <li className="list-disc">
                  Time starts when you hit{" "}
                  <span className="font-bold">Play</span>
                </li>
                <li className="list-disc">Game over when time runs out</li>
              </ul>
              <div className="card-actions justify-center">
                <button className="btn btn-wide" onClick={play}>
                  Play
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
          <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
              <h2 className="card-title">
                Congratulations, You Finished The Game!
              </h2>
              <div className="card-actions justify-end">
                <button className="btn">Reset Game</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
