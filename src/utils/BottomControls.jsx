import React from "react";
import { FaRedo, FaUserFriends, FaRobot } from "react-icons/fa";

const BottomControls = ({ isBotEnabled, handleToggle, handleClearScore }) => {
  return (
    <div className="relative w-full h-0">
      {/* 🔽 Clear Score Button - Bottom Left */}
      <div className="absolute bottom-4 left-4 group">
        <button
          onClick={handleClearScore}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
        >
          <FaRedo />
          Clear Score
        </button>
        <span className="absolute -top-6 left-0 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
          Resets win counters
        </span>
      </div>

      {/* 🔽 Toggle Mode Button - Bottom Right */}
      <div className="absolute bottom-4 right-4 group">
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
      </div>
    </div>
  );
};

export default BottomControls;