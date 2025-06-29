// GameBoard.jsx
import React, { useEffect, useState } from "react";
import PlayerMode from "./PlayerMode";
import { playSound } from "../utils/playSound";
import { FaUserFriends, FaRobot } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Xicon from "../assets/xColorTic.png";
import Oicon from "../assets/ticColor.png";

// const winningPositions = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];
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
  const gridSize =
    selectedLevel === "hard" ? 5 : selectedLevel === "medium" ? 4 : 3;
  const totalCells = gridSize * gridSize;
  const winningPositions = generateWinningPositions(gridSize);
  // const [gameGrid, setGameGrid] = useState(Array(9).fill(""));
  const [gameGrid, setGameGrid] = useState(Array(totalCells).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameInfo, setGameInfo] = useState("X's Turn");
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isBotEnabled, setIsBotEnabled] = useState(true);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const initGame = () => {
    // setGameGrid(Array(9).fill(""));
    setGameGrid(Array(totalCells).fill(""));
    setCurrentPlayer("X");
    setGameInfo("X's Turn");
    setWinner(null);
    setShowModal(false);
  };

  const clearScore = () => {
    setPlayer1Wins(0);
    setPlayer2Wins(0);
    initGame();
  };

  // const swapTurn = () => {
  //   setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  // };
  const swapTurn = () => {
    const nextPlayer = currentPlayer === "X" ? "O" : "X";
    setCurrentPlayer(nextPlayer);
    setGameInfo(`${nextPlayer}'s Turn`);
  };

  const checkGameOver = (grid) => {
    for (let position of winningPositions) {
      if (
        position.every(
          (index) => grid[index] && grid[index] === grid[position[0]]
        )
      ) {
        const winnerPlayer = grid[position[0]];
        setWinner(winnerPlayer); // ✅ sets state
        setGameInfo(`Winner - ${winnerPlayer}`);
        setShowModal(true);
        playSound("win");

        // ✅ Immediately update score based on winnerPlayer (not `winner`)
        if (winnerPlayer === "X") {
          console.log("Player 1 wins");
          setPlayer1Wins((prev) => prev + 1);
        } else if (winnerPlayer === "O") {
          console.log("Player 2 wins");
          setPlayer2Wins((prev) => prev + 1);
        }

        return;
      }
    }

    if (grid.every((cell) => cell)) {
      setWinner("tie");
      setGameInfo("Game Tied !!");
      setShowModal(true);
      playSound("tie");
    } else {
      setGameInfo(`${currentPlayer === "X" ? "O" : "X"}'s Turn`);
    }
  };

  const handleClick = (index) => {
    if (gameGrid[index] || winner) return;

    const newGrid = [...gameGrid];
    newGrid[index] = currentPlayer;
    setGameGrid(newGrid);
    playSound("move", isSoundOn);
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

  const maxBoardWidth =
    gridSize === 5
      ? "max-w-[520px]"
      : gridSize === 4
      ? "max-w-[400px]"
      : "max-w-[340px]";
  const gridColsClass =
    gridSize === 5
      ? "grid-cols-5"
      : gridSize === 4
      ? "grid-cols-4"
      : "grid-cols-3";

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto flex flex-col items-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 pt-4 pb-2">
      <h1 className="bg-gradient-to-br from-[#667eea] to-[#00f2fe] bg-clip-text text-transparent font-bold text-4xl sm:text-5xl mb-6 text-center">
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
        {/* Grid Lines (Optional, can be removed if using box borders) */}
        {[...Array(gridSize - 1)].map((_, i) => (
          <React.Fragment key={i}>
            <div
              className="absolute left-0 w-full border-t-4 border-white pointer-events-none"
              style={{ top: `${((i + 1) / gridSize) * 100}%` }}
            ></div>
            <div
              className="absolute top-0 h-full border-l-4 border-white pointer-events-none"
              style={{ left: `${((i + 1) / gridSize) * 100}%` }}
            ></div>
          </React.Fragment>
        ))}

        {/* Grid Boxes with border and gap */}
        <div className={`grid w-full h-full gap-[4px] ${gridColsClass}`}>
          {gameGrid.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`relative cursor-pointer flex items-center justify-center 
              rounded-md bg-black/20 transition duration-200
              ${
                winner &&
                winningPositions.some(
                  (combo) =>
                    combo.includes(index) &&
                    combo.every((i) => gameGrid[i] === gameGrid[index])
                )
                  ? "bg-green-400/30"
                  : ""
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {value && (
                  <img
                    src={value === "X" ? Xicon : Oicon}
                    alt={value}
                    className="h-[65%] w-[65%] object-contain object-center z-20 animate-scaleIn"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Buttons Row */}
      <div className="w-full px-4 mt-4 flex flex-col gap-3">
        {/* Top Row: Left and Right Aligned Toggles */}
        <div className="w-full flex justify-between items-start">
          {/* Sound Toggle - Left Aligned */}
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white font-semibold">Sound</span>
              <button
                onClick={() => setIsSoundOn((prev) => !prev)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  isSoundOn ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    isSoundOn ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Bot Toggle - Right Aligned */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white font-semibold"> Player vs Bot</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBotEnabled}
                  onChange={() => {
                    setIsBotEnabled((prev) => !prev);
                    initGame();
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:bg-[#00f2fe] transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Bottom Row: Clear Score Button - Centered */}
        <div className="w-full flex justify-center mb-4">
          <button
            onClick={clearScore}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10
        hover:bg-white/20 text-white transition-all backdrop-blur-sm hover:text-[#00f2fe]"
          >
            <MdDelete className="text-sm font-semibold" />
            Clear Score
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-black rounded-lg shadow-lg px-6 py-6 w-[280px] sm:w-[320px] flex flex-col gap-4 mt-10">
            {/* Message */}
            <h2 className="text-sm font-bold text-start text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
              <span className="text-white">🎉</span> Congratulation you wins!
            </h2>

            {/* Play Again Button aligned to right */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  initGame();
                }}
                className="px-4 py-2 text-sm font-semibold text-white hover:text-blue-500"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
