import React from 'react';

interface WavyDividerProps {
  fillColor?: string;
  bgColor?: string;
  flip?: boolean;
  className?: string;
  height?: number;
}

export const WavyDivider: React.FC<WavyDividerProps> = ({
  fillColor = '#F7F2E8',
  bgColor = 'transparent',
  flip = false,
  className = '',
  height = 14
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none relative z-10 ${className}`}
      style={{
        backgroundColor: bgColor,
        transform: flip ? 'rotate(180deg)' : 'none'
      }}
    >
      <svg
        className="w-full block"
        style={{ height: `${height}px` }}
        viewBox="0 0 1200 30"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 0 
             C 50 25, 100 25, 150 0 
             C 200 25, 250 25, 300 0 
             C 350 25, 400 25, 450 0 
             C 500 25, 550 25, 600 0 
             C 650 25, 700 25, 750 0 
             C 800 25, 850 25, 900 0 
             C 950 25, 1000 25, 1050 0 
             C 1100 25, 1150 25, 1200 0 
             L 1200 30 L 0 30 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
