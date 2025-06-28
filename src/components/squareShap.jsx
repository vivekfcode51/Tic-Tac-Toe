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
  const [gameInfo, setGameInfo] = useState("Turn Player - X");
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
    // for (let position of winningPositions) {
    //   const [a, b, c] = position;
    //   if (grid[a] && grid[a] === grid[b] && grid[b] === grid[c]) {
    //     setWinner(grid[a]);
    //     setGameInfo(`Winner Player - ${grid[a]}`);
    //     setShowModal(true);
    //     playSound("win");

    //     if (grid[a] === "X") {
    //       setPlayer1Wins((prev) => prev + 1);
    //     } else if (grid[a] === "O") {
    //       setPlayer2Wins((prev) => prev + 1);
    //     }
    //     return;
    //   }
    // }
    for (let position of winningPositions) {
      if (
        position.every(
          (index) => grid[index] && grid[index] === grid[position[0]]
        )
      ) {
        setWinner(grid[position[0]]);
        setGameInfo(`Winner Player - ${grid[position[0]]}`);
        setShowModal(true);
        playSound("win", isSoundOn);

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
   <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 pt-6 pb-4 relative">
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

        <div className={`grid w-full h-full ${gridColsClass}`}>
          {gameGrid.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`relative cursor-pointer flex items-center justify-center group overflow-hidden transition duration-200
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
      <div className="w-full flex justify-between items-center mt-6 px-4 gap-4 flex-wrap">
        {/* Left Buttons: Clear Score & Sound Toggle */}
        <div className="flex gap-3 items-center">
          {/* Clear Score */}
          <div className="relative group">
            <button
              onClick={clearScore}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10
              hover:bg-white/20 text-white transition-all backdrop-blur-sm hover:text-[#00f2fe]"
            >
              <MdDelete className="text-lg" />
              Clear Score
            </button>
            <span className="absolute -top-6 right-0 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
              Resets win counters
            </span>
          </div>

          {/* Sound Toggle */}
          <div className="relative group">
            <button
              onClick={() => setIsSoundOn((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10
              hover:bg-white/20 text-white transition-all backdrop-blur-sm hover:text-[#00f2fe]"
            >
              {isSoundOn ? <HiSpeakerWave /> : <HiSpeakerXMark />}
              {isSoundOn ? "Sound On" : "Sound Off"}
            </button>
            <span className="absolute -top-6 right-0 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
              Toggle Sound
            </span>
          </div>
        </div>

        {/* Right Button: Toggle Game Mode */}
        <div className="relative group">
          <button
            onClick={() => {
              setIsBotEnabled((prev) => !prev);
              initGame();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10
            hover:bg-white/20 text-white transition-all backdrop-blur-sm hover:text-[#00f2fe]"
          >
            {isBotEnabled ? <FaRobot /> : <FaUserFriends />}
            {isBotEnabled ? "Player vs Bot" : "Player vs Player"}
          </button>
          <span className="absolute -top-6 right-0 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
            Toggle Game Mode
          </span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-black rounded-lg shadow-lg p-8 w-[250px] flex flex-col justify-center items-center mt-10">
            <h2 className="text-sm font-bold text-white text-center">
              {winner === "tie"
                ? "🤝 It's a Tie!"
                : winner === "X"
                ? "🎉🎊 Congratulations Player 1 (X) Wins!!"
                : isBotEnabled
                ? "🤖🎉 Congratulations Bot Wins!"
                : "🎉🎊 Congratulations Player 2 (O) Wins!!"}
            </h2>

            <button
              onClick={() => {
                setShowModal(false);
                initGame();
              }}
              className="mt-4 px-4 py-2 text-sm font-semibold text-white hover:text-blue-500"
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
