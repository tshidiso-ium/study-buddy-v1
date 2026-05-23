import logo from './logo.svg';
import './App.css';
import { useEffect } from "react";
import { loadGoogleAnalytics } from "./lib/analytics";
import WelcomePage from './components/WelcomePage';

function App() {
  useEffect(() => {
    loadGoogleAnalytics();
  }, []);

  return (
    <div className="App">
        <WelcomePage/>  
    </div>
  );
}

export default App;
