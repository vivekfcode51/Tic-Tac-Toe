import React from "react";
import { FaUser, FaRobot } from "react-icons/fa";


const PlayerMode = ({ isBotEnabled, setIsBotEnabled, initGame, wins }) => {
  const handleToggle = () => {
    setIsBotEnabled((prev) => !prev);
    initGame();
  };

  return (
    <div className="text-white mb-4 flex justify-between items-center w-full max-w-4xl px-4">
      {/* Left: Player 1 */}
      <div className="flex flex-col items-center gap-3">
        <FaUser className="text-xl" />
        <div className="flex flex-col">
          <span className="font-semibold text-lg">Player 1</span>
          <span className="text-sm text-white/70">Wins: {wins.player1}</span>
        </div>
      </div>

      {/* Center: Toggle Button */}
      <div>
        <button
          onClick={handleToggle}
          className="px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10 hover:bg-white/20 transition-all"
        >
          {isBotEnabled ? "Player vs Bot" : "Player vs Player"}
        </button>
      </div>

      {/* Right: Player 2 / Bot */}
      <div className="flex flex-col items-center gap-3">
        {isBotEnabled ? (
          <FaRobot className="text-xl" />
        ) : (
          <FaUser className="text-xl" />
        )}
        <div className="flex flex-col items-end">
          <span className="font-semibold text-lg">
            {isBotEnabled ? "Bot" : "Player 2"}
          </span>
          <span className="text-sm text-white/70">Wins: {wins.player2}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerMode