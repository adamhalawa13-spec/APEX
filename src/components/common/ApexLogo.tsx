import React from 'react';

interface ApexLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  variant?: 'vertical' | 'horizontal' | 'star-only' | 'clothing-badge';
  color?: 'light' | 'dark' | 'silver';
}

export const ApexLogo: React.FC<ApexLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'vertical',
  color = 'light',
}) => {
  const getStarDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-6 h-6';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-12 h-12';
      case 'hero':
        return 'w-16 h-16 sm:w-20 sm:h-20';
      default:
        return 'w-6 h-6';
    }
  };

  const getTextClass = () => {
    switch (size) {
      case 'sm':
        return 'text-[9px] tracking-[0.3em] font-bold';
      case 'md':
        return 'text-xs tracking-[0.35em] font-bold';
      case 'lg':
        return 'text-sm tracking-[0.4em] font-extrabold';
      case 'xl':
        return 'text-lg tracking-[0.45em] font-extrabold';
      case 'hero':
        return 'text-xl sm:text-2xl tracking-[0.5em] font-black';
      default:
        return 'text-xs tracking-[0.35em] font-bold';
    }
  };

  const getColors = () => {
    switch (color) {
      case 'dark':
        return {
          star: 'fill-black stroke-black',
          text: 'text-black',
          accent: 'fill-zinc-800',
        };
      case 'silver':
        return {
          star: 'fill-zinc-300 stroke-zinc-100',
          text: 'text-zinc-200',
          accent: 'fill-zinc-400',
        };
      case 'light':
      default:
        return {
          star: 'fill-white stroke-white',
          text: 'text-white',
          accent: 'fill-zinc-300',
        };
    }
  };

  const { star, text, accent } = getColors();

  // Geometric luxury four-pointed star with sharp faceted facet lines
  const StarIcon = (
    <svg
      viewBox="0 0 100 100"
      className={`${getStarDimensions()} transition-transform duration-300 group-hover:scale-105`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer 4-point primary star */}
      <polygon
        points="50,2 62,38 98,50 62,62 50,98 38,62 2,50 38,38"
        className={star}
      />
      {/* Subtle faceted inner shading for high-end metallic/architectural depth */}
      <polygon
        points="50,2 50,50 62,38"
        className={accent}
        opacity="0.35"
      />
      <polygon
        points="98,50 50,50 62,62"
        className={accent}
        opacity="0.35"
      />
      <polygon
        points="50,98 50,50 38,62"
        className={accent}
        opacity="0.35"
      />
      <polygon
        points="2,50 50,50 38,38"
        className={accent}
        opacity="0.35"
      />
      {/* Secondary micro 4-point diamond star in the core */}
      <polygon
        points="50,30 54,46 70,50 54,54 50,70 46,54 30,50 46,46"
        className={star}
        opacity="0.9"
      />
    </svg>
  );

  if (variant === 'star-only') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{StarIcon}</div>;
  }

  if (variant === 'clothing-badge') {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center p-2.5 rounded-sm border border-white/20 bg-black/60 backdrop-blur-md shadow-2xl ${className}`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-5 h-5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="50,2 62,38 98,50 62,62 50,98 38,62 2,50 38,38"
            className="fill-white"
          />
          <polygon
            points="50,2 50,50 62,38"
            className="fill-zinc-400"
            opacity="0.4"
          />
          <polygon
            points="98,50 50,50 62,62"
            className="fill-zinc-400"
            opacity="0.4"
          />
          <polygon
            points="50,98 50,50 38,62"
            className="fill-zinc-400"
            opacity="0.4"
          />
          <polygon
            points="2,50 50,50 38,38"
            className="fill-zinc-400"
            opacity="0.4"
          />
        </svg>
        <span className="mt-1 font-brand text-[8px] font-black tracking-[0.35em] text-white">
          APEX
        </span>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`group inline-flex items-center gap-2.5 select-none ${className}`}>
        {StarIcon}
        <span className={`font-brand ${getTextClass()} ${text} leading-none`}>
          APEX
        </span>
      </div>
    );
  }

  // Official primary brand mark: Star symbol with APEX directly underneath
  return (
    <div className={`group inline-flex flex-col items-center justify-center select-none text-center ${className}`}>
      {StarIcon}
      <span className={`font-brand ${getTextClass()} ${text} leading-none mt-1.5`}>
        APEX
      </span>
    </div>
  );
};
