import React from 'react';

interface FloatingBadgeProps {
  icon?: string;
  title: string;
  subtitle?: string;
  className?: string;
  positionClass?: string;
  delay?: string;
}

export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  icon,
  title,
  subtitle,
  className = '',
  positionClass = '',
  delay = '0s'
}) => {
  return (
    <div
      className={`absolute z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border-2 border-snack-dark shadow-playful animate-float-slow transition-transform hover:scale-105 pointer-events-auto ${positionClass} ${className}`}
      style={{ animationDelay: delay }}
    >
      {icon && <span className="text-xl sm:text-2xl filter drop-shadow-sm">{icon}</span>}
      <div className="flex flex-col text-left">
        <span className="font-display font-bold text-xs sm:text-sm text-snack-dark leading-tight">
          {title}
        </span>
        {subtitle && (
          <span className="font-sans font-medium text-[10px] text-gray-500 leading-tight">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
