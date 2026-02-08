import React from 'react';

export const HeartBackground: React.FC = () => {
  // Generate a few random positions for hearts to make the background lively but static-ish (CSS animation)
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${10 + Math.random() * 10}s`,
    opacity: 0.1 + Math.random() * 0.3,
    scale: 0.5 + Math.random() * 1,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-red-50 opacity-80"></div>
      
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-valentine-300 animate-float"
          style={{
            left: heart.left,
            top: heart.top,
            opacity: heart.opacity,
            transform: `scale(${heart.scale})`,
            animation: `float ${heart.animationDuration} ease-in-out infinite`,
            animationDelay: heart.animationDelay,
          }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};