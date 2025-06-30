import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import LevelSelect from "./components/LevelSelect";
import bgImage from "./assets/gradient-bg.jpg";

function App() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <div
      className="w-screen min-h-screen flex flex-col items-center justify-start bg-cover bg-center bg-no-repeat bg-black pt-4"
      // style={{ backgroundImage: `url(${bgImage})` }}
    >
      {!selectedLevel ? (
        <LevelSelect onSelect={(level) => setSelectedLevel(level)} />
      ) : (
         <GameBoard selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />
      )}
    </div>
  );
}

export default App;
