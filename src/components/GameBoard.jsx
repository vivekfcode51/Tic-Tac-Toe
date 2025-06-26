import React, { useEffect, useState } from "react";
import PlayerMode from "./PlayerMode";
import { FaUser, FaRobot } from "react-icons/fa";

const GameBoard = ({ selectedLevel }) => {
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

  const [gameGrid, setGameGrid] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameInfo, setGameInfo] = useState("Current Player - X");
  const [winner, setWinner] = useState(null);
  const [isBotEnabled, setIsBotEnabled] = useState(true);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);

  // 🧠 Game restart
  const initGame = () => {
    setGameGrid(Array(9).fill(""));
    setCurrentPlayer("X");
    setGameInfo("Current Player - X");
    setWinner(null);
  };

  // 🧠 Toggle Score Clear
  const clearScore = () => {
    setPlayer1Wins(0);
    setPlayer2Wins(0);
    initGame();
  };

  // 🧠 Switch turn
  const swapTurn = () => {
    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  // 🧠 Check winner
  const checkGameOver = (grid) => {
    for (let position of winningPositions) {
      const [a, b, c] = position;
      if (grid[a] && grid[a] === grid[b] && grid[b] === grid[c]) {
        setWinner(grid[a]);
        setGameInfo(`Winner Player - ${grid[a]}`);

        if (grid[a] === "X") {
          setPlayer1Wins((prev) => prev + 1);
        } else if (grid[a] === "O") {
          setPlayer2Wins((prev) => prev + 1);
        }
        return;
      }
    }

    if (grid.every((cell) => cell)) {
      setGameInfo("Game Tied !");
      setWinner("tie");
    } else {
      setGameInfo(`Current Player - ${currentPlayer === "X" ? "O" : "X"}`);
    }
  };

  // 🧠 Handle click
  const handleClick = (index) => {
    if (gameGrid[index] || winner) return;

    const newGrid = [...gameGrid];
    newGrid[index] = currentPlayer;
    setGameGrid(newGrid);
    checkGameOver(newGrid);

    if (!winner) swapTurn();
  };

  // 🤖 Bot logic (easy level: random)
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
      {/* Top Info */}
      <PlayerMode
        isBotEnabled={isBotEnabled}
        setIsBotEnabled={setIsBotEnabled}
        initGame={initGame}
        wins={{ player1: player1Wins, player2: player2Wins }}
      />

      {/* Game Info */}
      <p className="text-white text-xl bg-white/10 border border-white/30 rounded px-6 py-2 mb-4">
        {gameInfo}
      </p>

      {/* Game Grid */}
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

      {/* Clear Score Button */}
      {/* <button
        onClick={clearScore}
        className="mt-6 px-4 py-2 text-white border border-white/30 rounded-lg bg-white/10 hover:bg-white/20 transition"
      >
        Clear Score
      </button> */}
    </div>
  );
};

export default GameBoard;
