import React from "react";
import { FaUserFriends, FaRobot } from "react-icons/fa";
import logo from "../assets/man_logo.png";
import logo2 from "../assets/man_icon.png";
import botLogo from "../assets/tongue-out.png";
import Xicon from "../assets/xColorTic.png";
import Oicon from "../assets/ticColor.png";

const PlayerMode = ({
  isBotEnabled,
  setIsBotEnabled,
  initGame,
  wins,
  gameInfo,
}) => {
  const handleToggle = () => {
    setIsBotEnabled((prev) => !prev);
    initGame();
  };

  return (
    <div className="relative w-full max-w-5xl px-4 mb-4">
      <div className="flex justify-between items-center w-full text-white gap-2 sm:gap-4">
        {/* Player 1 Avatar with Conditional Circle Border */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 w-[70px] sm:w-[100px] flex-shrink-0">
          <div
            className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full border-4 flex items-center justify-center
      ${gameInfo.includes("X") ? "border-green-500" : "border-[#696969]"}
      bg-white/10 shadow-inner`}
          >
            <img
              src={logo}
              alt="Player 1"
              className="w-10 sm:w-14 rounded-full object-cover"
            />
          </div>
          <span className="font-semibold text-xs sm:text-base">Player 1</span>
          <span className="text-[10px] sm:text-sm text-[#00f2fe]">
            Wins: {wins.player1}
          </span>
        </div>

        {/* 🟨 Game Info Styled Like Image */}
        <div className="flex flex-col items-center justify-center w-[70px] sm:w-[100px] flex-shrink-0">
          {/* <div className="text-red-500 text-xl sm:text-2xl">✖</div> */}
          <img src={Xicon} alt="X" className="w-5 sm:w-7 md:w-8 h-auto object-contain"/>
          <div
            className={`font-bold text-base sm:text-lg md:text-xl ${
              gameInfo.includes("X")
                ? "text-red-600"
                : gameInfo.includes("O")
                ? "text-green-400"
                : "text-white"
            }`}
          >
            {gameInfo}
          </div>
          {/* <div className="text-green-500 text-xl sm:text-2xl">⭕</div> */}
          <img src={Oicon} alt="O"className="w-5 sm:w-7 md:w-8 h-auto object-contain"/>

        </div>

        {/* Player 2 or Bot */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 w-[70px] sm:w-[100px] flex-shrink-0">
          <div
            className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full border-4 flex items-center justify-center
      ${gameInfo.includes("O") ? "border-green-500" : "border-[#696969]"}
      bg-white/10 shadow-inner`}
          >
            <img
              src={isBotEnabled ? botLogo : logo2}
              alt="Player 2"
              className="w-10 sm:w-14 rounded-full object-cover"
            />
          </div>
          <span className="font-semibold text-xs sm:text-base">
            {isBotEnabled ? "Bot" : "Player 2"}
          </span>
          <span className="text-[10px] sm:text-sm text-[#00f2fe]">
            Wins: {wins.player2}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerMode;
