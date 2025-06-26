import React from "react";

const GameInfo = ({ message }) => {
  return (
    <p className="text-white text-xl bg-white/20 border border-white/30 rounded-lg px-6 py-2 mb-6">
      {message}
    </p>
  );
};

export default GameInfo;
