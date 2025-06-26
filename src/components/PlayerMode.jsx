import React from "react";
import { FaUserFriends, FaRobot } from "react-icons/fa";
import logo from "../assets/man_logo.png";
import logo2 from "../assets/man_icon.png";
import botLogo from "../assets/tongue-out.png";

const PlayerMode = ({ isBotEnabled, setIsBotEnabled, initGame, wins, gameInfo }) => {
  const handleToggle = () => {
    setIsBotEnabled((prev) => !prev);
    initGame();
  };

  return (
    <div className="relative w-full max-w-5xl px-4 mb-8">
      {/* 🟩 Top Section */}
      <div className="flex justify-between items-center text-white w-full gap-x-4">
        {/* 🔹 Player 1 */}
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="Player 1" width={60} />
          <span className="font-semibold text-lg">Player 1</span>
          <span className="text-sm text-white/70">Wins: {wins.player1}</span>
        </div>

        {/* 🟨 Game Info (center) */}
        <div className="flex-1 flex justify-center">
          <p className="text-sm font-medium bg-white/10 px-6 py-2 rounded-full border border-white/40 backdrop-blur-sm">
            {gameInfo}
          </p>
        </div>

        {/* 🔸 Player 2 / Bot */}
        <div className="flex flex-col items-center gap-2">
          <img src={isBotEnabled ? botLogo : logo2} alt="Player 2" width={60} />
          <span className="font-semibold text-lg">{isBotEnabled ? "Bot" : "Player 2"}</span>
          <span className="text-sm text-white/70">Wins: {wins.player2}</span>
        </div>
      </div>

      {/* 🔘 Toggle Button - Bottom Center */}
      {/* <div className="absolute bottom-4 left-[56.4%] transform -translate-x-1/2 group">
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
        >
          {isBotEnabled ? <FaRobot /> : <FaUserFriends />}
          {isBotEnabled ? "Player vs Bot" : "Player vs Player"}
        </button>
        <span className="absolute -top-6 right-0 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
          Toggle Game Mode
        </span>
      </div> */}
    </div>
  );
};

export default PlayerMode;