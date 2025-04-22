import React from 'react';
import { useTheme } from 'next-themes';

export function BackgroundEffects() {
  const { theme } = useTheme();

  return (
    <div className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden ${theme === 'dark' ? 'bg-black' : ''}`}>
      {/* Base gradient */}
      <div className={`absolute inset-0 ${theme === 'dark'
        ? 'bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20'
        : 'bg-gradient-to-br from-purple-100/50 via-white to-blue-100/50'
        }`} />

      {/* Animated gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark'
        ? 'from-purple-900/10 via-transparent to-blue-900/10'
        : 'from-purple-200/20 via-transparent to-blue-200/20'
        } animate-gradient`} />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-float ${theme === 'dark' ? 'bg-white' : 'bg-gray-600'
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + (Math.random() * 0.2),
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className={`absolute inset-0 opacity-5 ${theme === 'dark' ? 'opacity-5' : 'opacity-10'
          }`}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            } 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Animated glow effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl animate-pulse-slow ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-200/30'
          }`} />
        <div
          className={`absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl animate-pulse-slow ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/30'
            }`}
          style={{ animationDelay: '2s' }}
        />
      </div>
    </div>
  );
}
