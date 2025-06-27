// GameBoard.jsx
import React, { useEffect, useState } from "react";
import PlayerMode from "./PlayerMode";
import { playSound } from "../utils/playSound";
import { FaUserFriends, FaRobot } from "react-icons/fa";
import Xicon from "../assets/xColorTic.png";
import Oicon from "../assets/ticColor.png";

const generateWinningPositions = (size) => {
  const positions = [];

  // Rows
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) row.push(r * size + c);
    positions.push(row);
  }

  // Columns
  for (let c = 0; c < size; c++) {
    const col = [];
    for (let r = 0; r < size; r++) col.push(r * size + c);
    positions.push(col);
  }

  // Main Diagonal
  const diag1 = [],
    diag2 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
    diag2.push(i * size + (size - i - 1));
  }
  positions.push(diag1, diag2);

  return positions;
};

const GameBoard = ({ selectedLevel }) => {
  const gridSize = selectedLevel === "hard" ? 5 : selectedLevel === "medium" ? 4 : 3;
  const totalCells = gridSize * gridSize;
  const winningPositions = generateWinningPositions(gridSize);

  const [gameGrid, setGameGrid] = useState(Array(totalCells).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameInfo, setGameInfo] = useState("Turn Player - X");
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isBotEnabled, setIsBotEnabled] = useState(true);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);

  const initGame = () => {
    setGameGrid(Array(totalCells).fill(""));
    setCurrentPlayer("X");
    setGameInfo("Turn Player - X");
    setWinner(null);
    setShowModal(false);
  };

  const clearScore = () => {
    setPlayer1Wins(0);
    setPlayer2Wins(0);
    initGame();
  };

  const swapTurn = () => {
    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  const checkGameOver = (grid) => {
    for (let position of winningPositions) {
      if (
        position.every(
          (index) => grid[index] && grid[index] === grid[position[0]]
        )
      ) {
        setWinner(grid[position[0]]);
        setGameInfo(`Winner Player - ${grid[position[0]]}`);
        setShowModal(true);
        playSound("win");

        if (grid[position[0]] === "X") {
          setPlayer1Wins((prev) => prev + 1);
        } else {
          setPlayer2Wins((prev) => prev + 1);
        }
        return;
      }
    }

    if (grid.every((cell) => cell)) {
      setWinner("tie");
      setGameInfo("Game Tied !");
      setShowModal(true);
      playSound("tie");
    } else {
      setGameInfo(`Turn Player - ${currentPlayer === "X" ? "O" : "X"}`);
    }
  };

  const handleClick = (index) => {
    if (gameGrid[index] || winner) return;

    const newGrid = [...gameGrid];
    newGrid[index] = currentPlayer;
    setGameGrid(newGrid);
    playSound("move");
    checkGameOver(newGrid);

    if (!winner) swapTurn();
  };

  useEffect(() => {
    if (isBotEnabled && currentPlayer === "O" && !winner) {
      const available = gameGrid
        .map((val, i) => (val === "" ? i : null))
        .filter((val) => val !== null);

      if (available.length > 0) {
        const randomIndex =
          available[Math.floor(Math.random() * available.length)];
        setTimeout(() => {
          handleClick(randomIndex);
        }, 500);
      }
    }
  }, [currentPlayer, isBotEnabled, winner]);

  const maxBoardWidth = gridSize === 5 ? "max-w-[520px]" : gridSize === 4 ? "max-w-[400px]" : "max-w-[340px]";

  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <h1 className="bg-gradient-to-br from-[#667eea] to-[#00f2fe] bg-clip-text text-transparent font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-center">
        TIC-TAC-TOE
      </h1>

      <PlayerMode
        isBotEnabled={isBotEnabled}
        setIsBotEnabled={setIsBotEnabled}
        initGame={initGame}
        wins={{ player1: player1Wins, player2: player2Wins }}
        gameInfo={gameInfo}
      />

      <div className={`relative w-full ${maxBoardWidth} aspect-square`}>
        <div
          className={`grid w-full h-full ${
            gridSize === 3
              ? "grid-cols-3"
              : gridSize === 4
              ? "grid-cols-4"
              : "grid-cols-5"
          }`}
        >
          {gameGrid.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`border border-white flex items-center justify-center cursor-pointer transition duration-200 relative group overflow-hidden
                ${
                  winner &&
                  winningPositions.some(
                    (combo) =>
                      combo.includes(index) &&
                      combo.every((i) => gameGrid[i] === gameGrid[index])
                  )
                    ? "bg-green-400/30"
                    : "hover:bg-white/10"
                }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                {value && (
                  <img
                    src={value === "X" ? Xicon : Oicon}
                    alt={value}
                    className="w-8 h-8 sm:w-10 sm:h-10 z-10 object-contain animate-scaleIn"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-[31%] w-full px-4 pb-2 flex justify-start z-50">
        <div className="relative group">
          <button
            onClick={clearScore}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm hover:text-[#00f2fe]"
          >
            Clear Score
          </button>
          <span className="absolute -top-6 right-0 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
            Resets win counters
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 right-[31%] w-full px-4 pb-2 flex justify-end z-50">
        <div className="relative group">
          <button
            onClick={() => {
              setIsBotEnabled((prev) => !prev);
              initGame();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm hover:text-[#00f2fe]"
          >
            {isBotEnabled ? <FaRobot /> : <FaUserFriends />}
            {isBotEnabled ? "Player vs Bot" : "Player vs Player"}
          </button>
          <span className="absolute -top-6 right-0 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
            Toggle Game Mode
          </span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black rounded-lg shadow-lg p-8 h-[130px] w-[250px] flex flex-col justify-center items-center mt-[5.5rem]">
            <h2 className="text-[14px] font-bold  text-white">
              {winner === "tie"
                ? "🤝 It's a Tie!"
                : winner === "X"
                ? "🎉🎊 Congratulation Player 1 (X) Wins!!"
                : isBotEnabled
                ? "🤖🎉 Congratulation Bot Wins!"
                : "🎉🎊 Congratulation Player 2 (O) Wins!!"}
            </h2>
            <button
              onClick={() => {
                setShowModal(false);
                initGame();
              }}
              className="mt-4 px-4 py-2 text-[16px] pl-[5.8rem] font-semibold text-white hover:text-blue-500"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
