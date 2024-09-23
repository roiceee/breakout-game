import "./App.css";
import ReloadPrompt from "./components/reloadprompt/ReloadPrompt";
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
          <ReloadPrompt />
        </RoundContextProvider>
      </TimerContextProvider>
    </HintContextProvider>
  );
}

export default App;
