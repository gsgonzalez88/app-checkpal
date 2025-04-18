import { useState } from "react";
import checkPalLogo from "./assets/checkpal.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <img
          src={checkPalLogo}
          className="logo"
          alt="CheckPal logo"
        />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          el contador es {count}
        </button>
      </div>
    </>
  );
}

export default App;
