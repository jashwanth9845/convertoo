import { BrowserRouter } from "react-router-dom";
import MainComponent from "./Components/MainComponent";
import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <MainComponent />
    </BrowserRouter>
  );
}

export default App;
