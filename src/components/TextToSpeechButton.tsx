import { Megaphone, MegaphoneOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function TextToSpeechButton({ text }: { text: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const readAloud = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices()[3];
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    speechSynthesis.speak(utterance);

    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  return (
    <button
      className="btn btn-outline btn-sm text-xs"
      onClick={!isSpeaking ? readAloud : stopSpeaking}
    >
      {!isSpeaking ? (
        <>
          Read Aloud <Megaphone />
        </>
      ) : (
        <>
          Stop Reading <MegaphoneOff />
        </>
      )}
    </button>
  );
}
