import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { rangerColors } from '@/lib/constants';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Ranger } from '@/payload-types';


export function RangerCard({ ranger }: { ranger: Ranger }) {
  const { theme } = useTheme();

  const { name, color, title, team, abilityName, ability, deck } = ranger
  const cards = !deck ? [] : deck
  const getShieldCount = (count: string) => {
    const shields = cards.filter(card => typeof card.card !== 'number' ? card.card.shields === count : false)
    return shields.reduce((prev, card) => card.count + prev, 0)
  }
  const stats = {
    1: getShieldCount('1'),
    2: getShieldCount('2'),
    3: getShieldCount('3'),
  }

  return (
    <div className="group relative transform transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse-slow" />

      <div className={clsx(
        "relative p-4 sm:p-6 rounded-lg border transition-all duration-300",
        theme === 'dark'
          ? "bg-gray-900/90 border-red-500/20 group-hover:border-transparent"
          : "bg-white/90 border-red-500/20 group-hover:border-transparent"
      )}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={clsx(
              "text-lg sm:text-xl font-bold mb-1 transform transition-transform group-hover:translate-x-1",
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            )}>{name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-red-400 text-sm">{title}</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-red-500/10 rounded-full border border-red-500/20 group-hover:rotate-180 transition-all duration-500">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="my-4 border-t border-red-500/20 group-hover:border-red-500/40 transition-colors" />

        <div className="grid grid-cols-3 gap-2 mb-4">
          {Object.entries(stats).map(([key, value], index) => (
            <div
              key={key}
              className={clsx(
                "p-2 rounded text-center transform transition-transform duration-300",
                theme === 'dark' ? 'bg-red-500/5' : 'bg-red-500/10'
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="text-xs text-red-400 flex justify-center">
                {new Array(Number(key)).fill(null).map((v, i) => <Shield key={`${v}-${i}`} className="w-4 h-4 text-red-500 animate-pulse" />
                )}
              </div>
              <div className={clsx(
                "text-base sm:text-lg font-bold group-hover:scale-110 transition-transform",
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              )}>{value}</div>
            </div>
          ))}
        </div>

        <div className={clsx(
          "p-3 sm:p-4 rounded-lg border mb-4 transform transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-lg group-hover:shadow-red-500/10",
          theme === 'dark'
            ? "bg-red-500/5 border-red-500/20"
            : "bg-red-500/5 border-red-500/20"
        )}>
          <h4 className="text-sm font-semibold text-red-400 mb-2">{abilityName}</h4>
          <div className={clsx(
            "text-xs sm:text-sm",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          )}>
            {ability.split('\n').map((line, index) => (
              <p key={`line-${abilityName}-${index}`}>
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-red-400 font-semibold tracking-wider">
            {typeof team === 'number' ? team : team.name}
          </span>
          <div className="flex space-x-1">
            {rangerColors.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className={`w-4 sm:w-6 h-1 rounded-full ${color.class} transform transition-all duration-300 group-hover:h-3`}
                style={{ transitionDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
