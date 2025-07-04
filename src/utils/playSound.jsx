// src/utils/playSound.js
import moveSound from "../assets/sounds/tic.mp3";
import winSound from "../assets/sounds/win.mp3"
import tieSound from "../assets/sounds/game-over.mp3";


export const playSound = (type, isSoundOn = true) => {

  if (!isSoundOn) return;

  let audio;
  switch (type) {
    case "move":
      audio = new Audio(moveSound);
      break;
    case "win":
      audio = new Audio(winSound);
      break;
    case "tie":
      audio = new Audio(tieSound);
      break;
    default:
      return;
  }

  audio.volume = 0.8;
  audio.play().catch((err) =>
    console.warn("Autoplay blocked or sound error:", err)
  );
};
