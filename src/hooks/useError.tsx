import { useState } from "react";

export default function useError() {
  const [isError, setError] = useState<boolean>(false);

  const setIsError = (number: number = 5000) => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, number);
  };

  return {
    isError,
    setIsError,
  };
}
