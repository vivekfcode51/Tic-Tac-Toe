import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import LevelSelect from "./components/LevelSelect";
import bgImage from "./assets/gradient-bg.jpg";

function App() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <div
      className="w-screen min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-black"
      // style={{ backgroundImage: `url(${bgImage})` }}
    >
      {!selectedLevel ? (
        <LevelSelect onSelect={(level) => setSelectedLevel(level)} />
      ) : (
        <GameBoard selectedLevel={selectedLevel} />
      )}
    </div>
  );
}

export default App;
