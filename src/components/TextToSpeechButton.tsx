import { Megaphone, MegaphoneOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayerButton({ audioSrc }: { audioSrc: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const handleAudioEnd = () => setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnd);
      }
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={audioSrc} />
      <button
        className="btn btn-outline btn-sm text-xs"
        onClick={!isPlaying ? playAudio : pauseAudio}
      >
        {!isPlaying ? (
          <>
            Basahin <Megaphone />
          </>
        ) : (
          <>
            Kansel <MegaphoneOff />
          </>
        )}
      </button>
    </>
  );
}
