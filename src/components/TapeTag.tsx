import type { ReactNode } from "react";

interface TapeTagProps {
  children: ReactNode;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  rotation?: number;
  color?: "black" | "white";
  className?: string;
}

const TapeTag = ({
  children,
  position = "bottom-right",
  rotation = -24,
  color = "black",
  className = "",
}: TapeTagProps) => {
  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-0 -left-8";
      case "top-right":
        return "top-0 -right-10";
      case "bottom-left":
        return "-bottom-1 -left-8";
      case "bottom-right":
        return "-bottom-1 -right-10";
      default:
        return "bottom-2 right-2";
    }
  };

  const getColorValue = () => {
    switch (color) {
      case "black":
        return "rgba(0,0,0,0.8)";
      case "white":
        return "rgba(255,255,255,0.8)";
      default:
        return color;
    }
  };

  const getTextColor = () => {
    return color === "white" ? "text-black" : "text-white";
  };

  const tapeColor = getColorValue();

  return (
    <div
      className={`absolute ${getPositionClasses()} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative">
        {/* SVG with solid background and torn edges cut out */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 160 32"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="tapeShadow">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.5" />
            </filter>

            {/* Torn edges mask */}
            <mask id="tornMask">
              <rect width="160" height="32" fill="white" />
              {/* Left torn edge cutout - with curves */}
              <path
                d="M0,4 Q2,6 3,8 L1,12 Q4,14 2,17 L5,20 Q3,23 4,26 L2,29 Q3,30 0,32 L0,0 Z"
                fill="black"
              />
              {/* Right torn edge cutout - with curves */}
              <path
                d="M160,4 Q158,6 157,8 L159,12 Q156,14 158,17 L155,20 Q157,23 156,26 L158,29 Q157,30 160,32 L160,0 Z"
                fill="black"
              />
            </mask>

            {/* Gradient texture */}
            <linearGradient
              id="tapeTexture"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.02)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
            </linearGradient>
          </defs>

          {/* Main tape rectangle with torn edges masked out */}
          <rect
            width="160"
            height="32"
            fill={tapeColor}
            mask="url(#tornMask)"
            filter="url(#tapeShadow)"
          />

          {/* Subtle texture overlay */}
          <rect
            width="160"
            height="32"
            fill="url(#tapeTexture)"
            mask="url(#tornMask)"
            opacity="0.3"
          />
        </svg>

        {/* Content with padding for text */}
        <div
          className={`px-4 py-2 font-semibold text-xs whitespace-nowrap relative z-10 ${getTextColor()}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default TapeTag;
