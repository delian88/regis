import React from 'react';
import Link from 'next/link';

interface RegisLogoProps {
  variant?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  href?: string;
  className?: string;
}

export function RegisLogo({
  variant = 'auto',
  size = 'md',
  showSubtitle = true,
  href = '/',
  className = '',
}: RegisLogoProps) {
  const isLightText = variant === 'light';

  const titleSizeClass =
    size === 'sm'
      ? 'text-xs sm:text-sm'
      : size === 'lg'
      ? 'text-base sm:text-xl lg:text-2xl'
      : 'text-sm sm:text-base lg:text-lg';

  const subtitleSizeClass =
    size === 'sm'
      ? 'text-[8px] sm:text-[9px]'
      : size === 'lg'
      ? 'text-[10px] sm:text-xs'
      : 'text-[9px] sm:text-[10px]';

  const iconSizeClass =
    size === 'sm'
      ? 'size-8 rounded-lg'
      : size === 'lg'
      ? 'size-12 sm:size-14 rounded-2xl'
      : 'size-9 sm:size-10 rounded-xl';

  const content = (
    <div className={`flex items-center gap-2.5 sm:gap-3 group shrink-0 ${className}`}>
      {/* Regis Architectural Emblem */}
      <div
        className={`${iconSizeClass} bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0 border border-amber-300/40`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950"
        >
          {/* Stylized Modern Tower & Geometric Framing */}
          <path d="M4 21h16" />
          <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
          <path d="M9 9h1" />
          <path d="M14 9h1" />
          <path d="M9 13h1" />
          <path d="M14 13h1" />
          <path d="M9 17h1" />
          <path d="M14 17h1" />
        </svg>
      </div>

      {/* Full Company Name as the Logo */}
      <div className="flex flex-col min-w-0">
        <div
          className={`font-black tracking-tight leading-none uppercase ${titleSizeClass} ${
            isLightText
              ? 'text-white'
              : variant === 'dark'
              ? 'text-slate-950'
              : 'text-[var(--foreground-strong)]'
          }`}
        >
          <span className="text-amber-500 font-black">REGIS </span>
          <span>INTEGRATED SERVICES LIMITED</span>
        </div>

        {showSubtitle && (
          <div
            className={`font-bold tracking-widest uppercase mt-0.5 sm:mt-1 truncate ${subtitleSizeClass} ${
              isLightText
                ? 'text-amber-400/90'
                : 'text-amber-600 dark:text-amber-400'
            }`}
          >
            Real Estate Development & Turnkey Construction
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
