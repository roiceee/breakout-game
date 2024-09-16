import "./App.css";
import HintContextProvider from "./context/HintContextProvider";
import RoundContextProvider from "./context/RoundContextProvider";
import TimerContextProvider from "./context/TimerContextProvider";
import SelectionPage from "./SelectionPage";

function App() {
  return (
    <HintContextProvider>
      <TimerContextProvider>
        <RoundContextProvider>
          <SelectionPage />
        </RoundContextProvider>
      </TimerContextProvider>
    </HintContextProvider>
  );
}

export default App;
