import React from 'react';
import { BookOpen, FlaskConical, Target, Zap } from 'lucide-react';

export function QuadrantNav({
  activeQuadrant,
  onSelectQuadrant,
  practiceCount = 0,
  solvedCount = 0
}) {
  const quadrants = [
    {
      id: 'story',
      label: '1. Story & Intuition',
      shortLabel: 'Story',
      icon: BookOpen,
      accent: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'lab',
      label: '2. Interactive Lab',
      shortLabel: 'Lab Simulator',
      icon: FlaskConical,
      accent: 'from-cyan-500 to-teal-400',
      badge: 'Live Sandbox'
    },
    {
      id: 'practice',
      label: '3. Practice Arena',
      shortLabel: 'Practice',
      icon: Target,
      accent: 'from-amber-500 to-orange-400',
      badge: `${solvedCount}/${practiceCount}`
    },
    {
      id: 'vault',
      label: '4. High-Yield Vault',
      shortLabel: 'Cheat Sheet',
      icon: Zap,
      accent: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="w-full bg-space-950/70 border-b border-space-800/80 px-4 sm:px-6 lg:px-8 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-start sm:space-x-4">
        {quadrants.map((quad) => {
          const Icon = quad.icon;
          const isActive = activeQuadrant === quad.id;
          return (
            <button
              key={quad.id}
              onClick={() => onSelectQuadrant(quad.id)}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
                isActive
                  ? 'bg-space-850 text-white border border-space-700 shadow-md shadow-black/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-space-900/60'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 shadow-sm shadow-cyan-400' : 'bg-transparent'}`} />
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="hidden md:inline">{quad.label}</span>
              <span className="md:hidden">{quad.shortLabel}</span>

              {quad.badge && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' 
                    : 'bg-space-800 text-slate-400'
                }`}>
                  {quad.badge}
                </span>
              )}

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
