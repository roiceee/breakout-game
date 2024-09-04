import "./App.css";
import HintContextProvider from "./context/HintContextProvider";
import RoundContextProvider from "./context/RoundContextProvider";
import TimerContextProvider from "./context/TimerContextProvider";
import MainPage from "./MainPage";

function App() {
  return (
    <HintContextProvider>
      <TimerContextProvider>
        <RoundContextProvider>
          <MainPage />
        </RoundContextProvider>
      </TimerContextProvider>
    </HintContextProvider>
  );
}

export default App;
