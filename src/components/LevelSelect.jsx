// import React from "react";

// const LevelSelect = ({ onSelect }) => {
//   const levels = [
//     {
//       label: "Easy (3x3)",
//       value: "easy",
//       gradient: "from-green-400 to-green-600",
//     },
//     {
//       label: "Medium (4x4)",
//       value: "medium",
//       gradient: "from-yellow-300 to-yellow-500",
//     },
//     {
//       label: "Hard (5x5)",
//       value: "hard",
//       gradient: "from-pink-400 to-pink-600",
//     },
//   ];

//   return (
//     <div className="h-screen w-screen flex items-center justify-center bg-black">
//       <div className="text-center">
//         <h1 className="text-5xl pb-9 font-bold mb-6 bg-gradient-to-br from-[#E040FB] to-[#18FFFF] bg-clip-text text-transparent">
//           Select Level
//         </h1>

//         <div className="flex flex-col gap-6 justify-center">
//           {levels.map((level) => (
//             <button
//               key={level.value}
//               onClick={() => onSelect(level.value)}
//              className={`px-6 py-4 rounded-lg text-black text-[14px] font-bold 
//                 bg-gradient-to-r ${level.gradient} hover:opacity-90 transition`}
//             >
//               {level.label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LevelSelect;
import React from "react";

const LevelSelect = ({ onSelect }) => {
  const levels = [
    {
      label: "Easy (3x3)",
      value: "easy",
      gradient: "from-green-400 to-green-600",
    },
    {
      label: "Medium (4x4)",
      value: "medium",
      gradient: "from-yellow-300 to-yellow-500",
    },
    {
      label: "Hard (5x5)",
      value: "hard",
      gradient: "from-pink-400 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-black px-4 py-8">
      <div className="text-center max-w-sm">
        <h1 className="text-4xl sm:text-5xl pb-6 font-bold mb-6 bg-gradient-to-br from-[#E040FB] to-[#18FFFF] bg-clip-text text-transparent">
          Select Level
        </h1>

        <div className="flex flex-col gap-4 w-full">
          {levels.map((level) => (
            <button
              key={level.value}
              onClick={() => onSelect(level.value)}
              className={`w-full py-3 rounded-lg text-sm sm:text-base text-black font-semibold 
              bg-gradient-to-r ${level.gradient} hover:opacity-90 transition duration-200`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;

