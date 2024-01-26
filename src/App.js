import { BrowserRouter } from 'react-router-dom';
import MainComponent from './Components/MainComponent';
import './index.css';
function App() {
  return (
    <BrowserRouter
    // basename={process.env.NODE_ENV == "production" ? "/convertoo" : ""}
    >
      <MainComponent />
    </BrowserRouter>
  );
}

export default App;
