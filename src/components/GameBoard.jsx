// GameBoard.jsx
import React, { useEffect, useState } from "react";
import PlayerMode from "./PlayerMode";
import { playSound } from "../utils/playSound";
import { FaUserFriends, FaRobot } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Xicon from "../assets/xColorTic.png"
import Oicon from "../assets/ticColor.png"

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const GameBoard = ({ selectedLevel }) => {
  const [gameGrid, setGameGrid] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameInfo, setGameInfo] = useState("Turn Player - X");
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isBotEnabled, setIsBotEnabled] = useState(true);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);

  const initGame = () => {
    setGameGrid(Array(9).fill(""));
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
      const [a, b, c] = position;
      if (grid[a] && grid[a] === grid[b] && grid[b] === grid[c]) {
        setWinner(grid[a]);
        setGameInfo(`Winner Player - ${grid[a]}`);
        setShowModal(true);
        playSound("win");

        if (grid[a] === "X") {
          setPlayer1Wins((prev) => prev + 1);
        } else if (grid[a] === "O") {
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
        const randomIndex = available[Math.floor(Math.random() * available.length)];
        setTimeout(() => {
          handleClick(randomIndex);
        }, 500);
      }
    }
  }, [currentPlayer, isBotEnabled, winner]);

  return (
    <div className="flex flex-col items-center justify-center mb-8">

    <h1 className="bg-gradient-to-br from-[#667eea] to-[#00f2fe] bg-clip-text text-transparent font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-center">
      TIC-TAC-TOE
    </h1>

    {/* toggle-mode */}
      <PlayerMode
        isBotEnabled={isBotEnabled}
        setIsBotEnabled={setIsBotEnabled}
        initGame={initGame}
        wins={{ player1: player1Wins, player2: player2Wins }}
        gameInfo={gameInfo}
      />

      {/* Tic Tac Toe Grid */}
     <div className="relative w-full max-w-[340px] aspect-square">
        <div className="absolute top-1/3 left-0 w-full border-t-4 border-white pointer-events-none"></div>
        <div className="absolute top-2/3 left-0 w-full border-t-4 border-white pointer-events-none"></div>
        <div className="absolute top-0 left-1/3 h-full border-l-4 border-white pointer-events-none"></div>
        <div className="absolute top-0 left-2/3 h-full border-l-4 border-white pointer-events-none"></div>

        <div className="grid grid-cols-3 gap-0 w-full h-full">
          {gameGrid.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`flex items-center justify-center cursor-pointer transition duration-200 relative group overflow-hidden
                ${winner &&
                  winningPositions.some(
                    (combo) =>
                      combo.includes(index) &&
                      combo.every((i) => gameGrid[i] === gameGrid[index])
                  )
                  ? "bg-green-400/30"
                  : ""}`}
            >
              <div className="w-full h-full flex items-center justify-center">
                {value && (
                  <img
                    src={value === "X" ? Xicon : Oicon}
                    alt={value}
                    className="w-12 h-12 z-10 object-contain animate-scaleIn"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Clear-score */}
      <div className="absolute bottom-0 left-[33%] w-full px-4 pb-2 flex justify-start z-50">
        <div className="relative group">
          <button
            onClick={clearScore}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10
              hover:bg-white/20 text-white transition-all backdrop-blur-sm hover:text-[#00f2fe]"
          >
            <MdDelete className="text-lg" /> {/* 👈 icon here */}
            Clear Score
          </button>
          <span className="absolute -top-6 right-0 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
            Resets win counters
          </span>
        </div>
      </div>


      {/* Toggle Button at Bottom Center */}
      <div className="absolute bottom-0 right-[31%] w-full px-4 pb-2 flex justify-end z-50">
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
