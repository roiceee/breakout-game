import breakoutThree from "./assets/breakoutThree";
import breakoutFour from "./assets/breakoutFour";
import breakoutFive from "./assets/breakoutFive";
import GamePage from "./GamePage";
import { useContext, useState } from "react";
import { BreakoutType } from "./types/round-type";
import RoundContext from "./context/round-context";
import Navbar from "./components/Navbar";

export default function SelectionPage() {
  const [hasSelected, setHasSelected] = useState(false);
  const { setRoundsData } = useContext(RoundContext);

  const selectBreakoutGame = (breakOutGame: BreakoutType) => {
    setRoundsData(breakOutGame);
    setHasSelected(true);
  };

  return (
    <main
      className=" min-h-screen pb-2 font-body"
      style={{ backgroundImage: "url(/pattern.webp)" }}
    >
      <Navbar className="mb-6" />
      {!hasSelected ? (
        <section className="bg-base-100 p-6 max-w-[600px] rounded-xl text-center mx-auto mt-40  ">
          <h1 className="text-xl font-bold">Piliin ang uri ng Breakout Game na iyong nais laruin.</h1>
          <div className="flex flex-col gap-4 mt-8">
            {/* render buttons */}
            <button
              className="btn btn-secondary text-lg"
              onClick={() => {
                selectBreakoutGame(breakoutThree);
              }}
            >
              {breakoutThree.title}
            </button>
            <button
              className="btn btn-secondary text-lg"
              onClick={() => {
                selectBreakoutGame(breakoutFour);
              }}
            >
              {breakoutFour.title}
            </button>
            <button
              className="btn btn-secondary text-lg"
              onClick={() => {
                selectBreakoutGame(breakoutFive);
              }}
            >
              {breakoutFive.title}
            </button>
          </div>
        </section>
      ) : (
        <GamePage />
      )}
    </main>
  );
}
