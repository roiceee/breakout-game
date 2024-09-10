export const convertSecondsToSecondsMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  //add leading zero if seconds is less than
  //10

  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
