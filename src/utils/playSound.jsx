export const playSound = (type) => {
  const audioMap = {
    move: new Audio("/sounds/click.mp3"),
    win: new Audio("/sounds/win.mp3"),
  };

  audioMap[type]?.play();
};
