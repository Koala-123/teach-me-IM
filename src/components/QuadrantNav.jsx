import React from 'react';
import { BookOpen, FlaskConical, Target, Zap } from 'lucide-react';

export function QuadrantNav({
  activeQuadrant,
  onSelectQuadrant
}) {
  const quadrants = [
    {
      id: 'story',
      label: 'Story & Intuition',
      shortLabel: 'Story & Intuition',
      icon: BookOpen,
      accent: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'lab',
      label: 'Interactive Lab',
      shortLabel: 'Interactive Lab',
      icon: FlaskConical,
      accent: 'from-cyan-500 to-teal-400'
    },
    {
      id: 'practice',
      label: 'Practice Arena',
      shortLabel: 'Practice Arena',
      icon: Target,
      accent: 'from-amber-500 to-orange-400'
    },
    {
      id: 'vault',
      label: 'High-Yield Vault',
      shortLabel: 'High-Yield Vault',
      icon: Zap,
      accent: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="w-full bg-space-950/70 border-b border-space-800/80 px-4 sm:px-6 lg:px-8 py-2 sticky top-16 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-start space-x-2 sm:space-x-4 overflow-x-auto scrollbar-none">
        {quadrants.map((quad) => {
          const Icon = quad.icon;
          const isActive = activeQuadrant === quad.id;
          return (
            <button
              key={quad.id}
              onClick={() => onSelectQuadrant(quad.id)}
              className={`flex items-center space-x-2 py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all relative shrink-0 ${
                isActive
                  ? 'bg-space-850 text-white border border-space-700 shadow-md shadow-black/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-space-900/60'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 shadow-sm shadow-cyan-400' : 'bg-transparent'}`} />
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{quad.label}</span>

              {isActive && (
                <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
