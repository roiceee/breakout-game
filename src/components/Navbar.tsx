import { DoorOpen } from "lucide-react";
import { useContext } from "react";
import TimerContext from "../context/timer-context";
import Countdown from "./Countdown";

export default function Navbar({ className }: { className?: string }) {
  const { secondsRemaining } = useContext(TimerContext);

  return (
    <div className={`navbar bg-base-100 ${className} max-w-[1920px] mx-auto`}>
      <div className="navbar-start">
        <div>
          <button
            className="btn btn-ghost"
            onClick={() => {
              window.location.reload();
            }}
          >
            <DoorOpen /> Umalis
          </button>
        </div>
      </div>
      <div className="navbar-center">
        <img src="/icon-192.png" className="h-12 -mr-5"/>
        <a className="btn btn-ghost text-lg sm:text-xl">reakout Game</a>
      </div>
      <div className="navbar-end">
        <div className="px-4">
          <Countdown seconds={secondsRemaining} />
        </div>
      </div>
    </div>
  );
}
