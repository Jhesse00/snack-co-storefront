import React from 'react';
import { FlavorConfig } from '../../config/snackConfig';
import { useCart } from '../../context/CartContext';

interface SnackPouchMockupProps {
  flavor: FlavorConfig;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  animate?: boolean;
}

export const SnackPouchMockup: React.FC<SnackPouchMockupProps> = ({
  flavor,
  size = 'md',
  className = '',
  animate = true
}) => {
  const { customBrandName } = useCart();

  const sizeDimensions = {
    sm: { width: 140, height: 180, scale: 0.5 },
    md: { width: 220, height: 290, scale: 0.75 },
    lg: { width: 280, height: 370, scale: 0.95 },
    hero: { width: 340, height: 450, scale: 1.1 }
  };

  const dim = sizeDimensions[size];

  // Specific color accents per flavor
  const isOriginal = flavor.id === 'original';
  const isSweet = flavor.id === 'sweet';
  const isSavory = flavor.id === 'savory';

  // Gradient stops
  const bagBgTop = isOriginal ? '#FEF08A' : isSweet ? '#FED7AA' : '#99F6E4';
  const bagBgMid = isOriginal ? '#FDE047' : isSweet ? '#FDBA74' : '#5EEAD4';
  const bagBgBottom = isOriginal ? '#EAB308' : isSweet ? '#FB923C' : '#14B8A6';
  const foilAccent = isOriginal ? '#CA8A04' : isSweet ? '#EA580C' : '#0D9488';
  const darkInk = isOriginal ? '#713F12' : isSweet ? '#7C2D12' : '#134E4A';

  return (
    <div
      className={`relative inline-block transition-transform duration-500 select-none ${
        animate ? 'hover:scale-105 hover:-rotate-1' : ''
      } ${className}`}
      style={{
        filter: 'drop-shadow(0px 20px 25px rgba(0, 0, 0, 0.12)) drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.08))'
      }}
    >
      <svg
        width={dim.width}
        height={dim.height}
        viewBox="0 0 340 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Main bag surface gradient */}
          <linearGradient id={`bagGrad-${flavor.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={bagBgTop} />
            <stop offset="50%" stopColor={bagBgMid} />
            <stop offset="100%" stopColor={bagBgBottom} />
          </linearGradient>

          {/* Shiny plastic reflection */}
          <linearGradient id="glossGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="85%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>

          {/* Top/bottom crimp metallic gradient */}
          <linearGradient id="crimpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          {/* Center emblem glow */}
          <radialGradient id={`emblemGlow-${flavor.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
          </radialGradient>
        </defs>

        {/* --- POUCH BASE SILHOUETTE --- */}
        <path
          d="M 40 30 
             Q 35 150 28 395 
             Q 170 420 312 395 
             Q 305 150 300 30 
             Z"
          fill={`url(#bagGrad-${flavor.id})`}
          stroke={darkInk}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 3D Curved Side Creases */}
        <path
          d="M 40 30 Q 55 220 50 392"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="6"
          fill="none"
        />
        <path
          d="M 300 30 Q 285 220 290 392"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="6"
          fill="none"
        />

        {/* --- TOP CRIMPED FOIL SEAL --- */}
        <g>
          {/* Top seal bar */}
          <rect
            x="34"
            y="18"
            width="272"
            height="18"
            rx="3"
            fill={foilAccent}
            stroke={darkInk}
            strokeWidth="3"
          />
          {/* Crimp vertical ridges */}
          {Array.from({ length: 32 }).map((_, i) => (
            <line
              key={`crimp-top-${i}`}
              x1={42 + i * 8}
              y1="20"
              x2={42 + i * 8}
              y2="34"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
            />
          ))}
          {/* Hanging hole notch */}
          <path
            d="M 160 27 C 160 24 163 22 170 22 C 177 22 180 24 180 27 C 180 30 177 31 170 31 C 163 31 160 30 160 27 Z"
            fill="#ffffff"
            stroke={darkInk}
            strokeWidth="2"
          />
        </g>

        {/* --- BOTTOM CRIMPED FOIL SEAL --- */}
        <g>
          <path
            d="M 30 390 Q 170 415 310 390 L 308 406 Q 170 430 32 406 Z"
            fill={foilAccent}
            stroke={darkInk}
            strokeWidth="3"
          />
          {Array.from({ length: 32 }).map((_, i) => (
            <line
              key={`crimp-bot-${i}`}
              x1={38 + i * 8.2}
              y1="395"
              x2={38 + i * 8.2}
              y2="415"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
            />
          ))}
        </g>

        {/* --- BRAND WORDMARK HEADER --- */}
        <g transform="translate(170, 75)">
          <rect
            x="-75"
            y="-16"
            width="150"
            height="32"
            rx="16"
            fill="#ffffff"
            stroke={darkInk}
            strokeWidth="2.5"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill={darkInk}
            fontFamily="Fredoka, cursive"
            fontWeight="700"
            fontSize="18"
            letterSpacing="2"
          >
            ★ {customBrandName} ★
          </text>
        </g>

        {/* --- MAIN PRODUCT TITLE --- */}
        <g transform="translate(170, 132)">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill={darkInk}
            fontFamily="Fredoka, cursive"
            fontWeight="800"
            fontSize="26"
            letterSpacing="0.5"
          >
            CRUNCHY
          </text>
          <text
            x="0"
            y="30"
            textAnchor="middle"
            fill="#ffffff"
            stroke={darkInk}
            strokeWidth="2"
            fontFamily="Fredoka, cursive"
            fontWeight="800"
            fontSize="32"
            letterSpacing="1"
            style={{ paintOrder: 'stroke fill' }}
          >
            SNACK BITES
          </text>
        </g>

        {/* --- CENTER EMBLEM & FLAVOR ILLUSTRATION --- */}
        <g transform="translate(170, 245)">
          {/* Circular badge container */}
          <circle
            cx="0"
            cy="0"
            r="60"
            fill={`url(#emblemGlow-${flavor.id})`}
            stroke={darkInk}
            strokeWidth="3"
          />

          {/* Flavor Specific Doodle Inside Circle */}
          {isOriginal && (
            <g>
              {/* Sea Salt crystal stars & crunchy puff */}
              <circle cx="0" cy="0" r="32" fill="#FDE047" stroke={darkInk} strokeWidth="2.5" />
              <text x="0" y="8" textAnchor="middle" fontSize="30">🍿</text>
              <path d="M -35 -25 L -30 -35 L -25 -25 L -15 -20 L -25 -15 L -30 -5 L -35 -15 L -45 -20 Z" fill="#ffffff" stroke={darkInk} strokeWidth="1.5" />
              <path d="M 30 -20 L 34 -28 L 38 -20 L 46 -16 L 38 -12 L 34 -4 L 30 -12 L 22 -16 Z" fill="#ffffff" stroke={darkInk} strokeWidth="1.5" />
              <circle cx="28" cy="22" r="3" fill="#ffffff" stroke={darkInk} strokeWidth="1" />
              <circle cx="-25" cy="25" r="4" fill="#ffffff" stroke={darkInk} strokeWidth="1" />
            </g>
          )}

          {isSweet && (
            <g>
              {/* Sweet cinnamon swirl & puff */}
              <circle cx="0" cy="0" r="32" fill="#FED7AA" stroke={darkInk} strokeWidth="2.5" />
              <text x="0" y="8" textAnchor="middle" fontSize="30">🍯</text>
              <path d="M -30 -20 Q -20 -35 -5 -25 Q 10 -15 -10 -5" stroke="#7C2D12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 25 15 Q 35 25 25 35" stroke="#7C2D12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <text x="24" y="-18" fontSize="16">✨</text>
            </g>
          )}

          {isSavory && (
            <g>
              {/* Garlic & herb sprig */}
              <circle cx="0" cy="0" r="32" fill="#99F6E4" stroke={darkInk} strokeWidth="2.5" />
              <text x="0" y="8" textAnchor="middle" fontSize="30">🧄</text>
              <path d="M -35 15 Q -25 5 -15 25" stroke="#0D9488" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 20 -20 Q 30 -30 35 -15" stroke="#0D9488" strokeWidth="3" fill="none" strokeLinecap="round" />
              <text x="-35" y="-15" fontSize="16">🌿</text>
            </g>
          )}

          {/* Flavor Name Banner Overlay */}
          <g transform="translate(0, 52)">
            <rect
              x="-85"
              y="-12"
              width="170"
              height="26"
              rx="13"
              fill={darkInk}
            />
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="Fredoka, cursive"
              fontWeight="700"
              fontSize="13"
              letterSpacing="0.8"
            >
              {flavor.name.toUpperCase()}
            </text>
          </g>
        </g>

        {/* --- NUTRITION PILL STAMP --- */}
        <g transform="translate(170, 335)">
          <rect
            x="-110"
            y="-12"
            width="220"
            height="25"
            rx="12"
            fill="#ffffff"
            stroke={darkInk}
            strokeWidth="2"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill={darkInk}
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="10.5"
            letterSpacing="1"
          >
            AIR-POPPED • AVOCADO OIL • 110 CALS
          </text>
        </g>

        {/* --- NET WEIGHT & CLAIMS --- */}
        <g transform="translate(170, 372)">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill={darkInk}
            fontFamily="Outfit, sans-serif"
            fontWeight="700"
            fontSize="11"
            letterSpacing="1.5"
            opacity="0.85"
          >
            NET WT 4.5 OZ (128g)
          </text>
        </g>

        {/* --- GLOSS / LIGHT SPECULAR REFLECTION OVERLAY --- */}
        <path
          d="M 40 30 Q 35 150 28 395 Q 170 420 312 395 Q 305 150 300 30 Z"
          fill="url(#glossGrad)"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
};
