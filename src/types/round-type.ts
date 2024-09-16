interface RoundType {
  imageUrl: string;
  instruction: string;
  hintText: string;
  roundType: "word" | "number" | "multiple-choice";
  choices?: {
    "a"?: string;
    "b"?: string;
    "c"?: string;
    "d"?: string;
  }
  answer: string | number | "a" | "b" | "c" | "d";
  title: string;
}

interface BreakoutType {
  title: string;
  rounds: RoundType[];
}

export type { RoundType, BreakoutType };