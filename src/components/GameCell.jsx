import React from "react";
const GameCell = ({ index, value, winner, gameGrid, winningPositions, handleClick }) => {
  const isWinningCell =
    winner &&
    winningPositions.some((combo) =>
      combo.includes(index) &&
      combo.every((i) => gameGrid[i] === value && gameGrid[i] !== "")
    );

  return (
    <div
      onClick={() => handleClick(index)}
      className={`w-full aspect-square text-white text-3xl flex items-center justify-center cursor-pointer border-2 border-white ${
        isWinningCell ? "bg-green-400/30" : ""
      }`}
    >
      {value}
    </div>
  );
};

export default GameCell
