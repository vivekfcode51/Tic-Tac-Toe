// GameBoard.jsx
import React, { useEffect, useState } from "react";
import PlayerMode from "./PlayerMode";
import { playSound } from "../utils/playSound";
import { FaUserFriends, FaRobot } from "react-icons/fa";

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
    setGameInfo("Current Player - X");
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
    <div className="flex flex-col items-center justify-center">

    {/* toggle-mode */}
      <PlayerMode
        isBotEnabled={isBotEnabled}
        setIsBotEnabled={setIsBotEnabled}
        initGame={initGame}
        wins={{ player1: player1Wins, player2: player2Wins }}
        gameInfo={gameInfo}
      />

      <div className="grid grid-cols-3 w-72 aspect-square bg-white/20 border border-white/30 rounded-xl p-4 gap-2">
        {gameGrid.map((value, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`w-full aspect-square text-white text-3xl flex items-center justify-center cursor-pointer border-2 border-white ${
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
            {value}
          </div>
        ))}
      </div>
      
      {/* Clear-score */}
      <div className="absolute bottom-4 right-1/2 transform -translate-x-1/2 group">
        <button
          onClick={clearScore}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
        >
          Clear Score
        </button>
        <span className="absolute -top-6 left-0 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
          Resets win counters
        </span>
      </div>

      {/* Toggle Button at Bottom Center */}
      <div className="absolute bottom-4 right-[39%] group z-50">
        <button
          onClick={() => {
            setIsBotEnabled((prev) => !prev);
            initGame();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
        >
          {isBotEnabled ? <FaRobot /> : <FaUserFriends />}
          {isBotEnabled ? "Player vs Bot" : "Player vs Player"}
        </button>

        <span className="absolute -top-6 right-0 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
          Toggle Game Mode
        </span>
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-black/70 rounded-lg shadow-lg p-8 h-[130px] w-[250px] flex flex-col justify-center items-center">
            <h2 className="text-[14px] font-bold  text-white">
              {winner === "tie"
                ? "🤝 It's a Tie!"
                : winner === "X"
                ? "🎉🎊 Congratulation Player 1 Wins!!"
                : isBotEnabled
                ? "🤖🎉 Congratulation Bot Wins!"
                : "🎉🎊 Congratulation Player 2 Wins!!"}
            </h2>

            <button
              onClick={() => {
                setShowModal(false);
                initGame();
              }}
              className="mt-4 px-4 py-2 text-[16px] pl-[5.8rem] font-semibold text-white "
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
