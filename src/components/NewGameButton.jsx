import React from "react";

const NewGameButton = ({ initGame }) => {
  return (
    <button
      onClick={initGame}
      className="mt-6 px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg"
    >
      New Game
    </button>
  );
};

export default NewGameButton;
