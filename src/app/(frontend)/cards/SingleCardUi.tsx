import { RangerCard } from '@/payload-types';
import { Dice5Icon, PlusIcon, ShieldIcon, SwordsIcon } from 'lucide-react';
import React from 'react';

interface PowerCardProps {
  card: RangerCard;
}

export function SingleCardUi({ card }: PowerCardProps) {
  return (
    <div className="aspect-[2.5/3.5] ">
      <div className="relative w-full h-full bg-yellow-900/30 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
            <span className="text-sm font-mono text-yellow-400">{card.energyCost}</span>
          </div>

          <h3 className="text-lg font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors text-right leading-5">{card.name}</h3>
        </div>

        <div className="text-sm text-yellow-400 text-center">{card.type}</div>

        {(!!card.attackDice || !!card.attackHit) && (
          <div className='flex gap-2 justify-center items-center text-yellow-400'>
            {!!card.attackDice && (
              <div className="text-center text-sm font-mono flex justify-center">
                {Array(Number(card.attackDice)).fill(null).map((_, i) => (
                  <Dice5Icon key={i} className="w-5 h-5" />
                ))}
              </div>
            )}
            {!!card.attackDice && !!card.attackHit && <PlusIcon className="w-3 h-3" />}
            {!!card.attackHit && (
              <div className="text-center text-sm font-mono flex justify-center items-center">
                <div className='mr-1'>
                  {card.attackHit}
                </div>
                <SwordsIcon className="w-4 h-4" />
              </div>
            )}
          </div>
        )}

        {card.description && (
          <p className="text-center text-sm text-yellow-100">{card.description}</p>
        )}

        <div className="flex-1"></div>

        {card.iconAbility?.icon && (
          <div className="text-xs text-center my-2">
            <span className=' text-yellow-400 mr-1'>
              {card.iconAbility.icon}:
            </span>

            {card.iconAbility.description}
          </div>
        )}

        <div className="bottom-4 left-4 flex justify-end items-center space-x-1 w-full">
          {Array(Number(card.shields)).fill(null).map((_, i) => (
            <ShieldIcon key={i} className="w-5 h-5" />
          ))}
        </div>

      </div>
    </div>
  );
}
