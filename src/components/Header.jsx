import React from 'react';
import { COURSE_INFO } from '../data/courseData';
import { Cpu, FlaskConical, Search, Award, Menu } from 'lucide-react';

export function Header({
  activeModule,
  onOpenSearch,
  onOpenLabs,
  solvedCount,
  totalQuestions,
  onToggleSidebar
}) {
  const percentComplete = totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 bg-space-900/90 backdrop-blur-md border-b border-space-800 shadow-lg">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile Sidebar Toggle + Branding & Course Title */}
        <div className="flex items-center space-x-3">
          {/* Mobile hamburger */}
          <button
            onClick={onToggleSidebar}
            aria-label="Open Course Units Sidebar"
            className="md:hidden w-9 h-9 rounded-lg bg-space-850 hover:bg-space-800 border border-space-700 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 text-white shrink-0">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                {COURSE_INFO.topicPill}
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
              {COURSE_INFO.title}
              <span className="hidden lg:inline text-xs text-slate-400 font-normal">
                • {COURSE_INFO.tagline}
              </span>
            </h1>
          </div>
        </div>

        {/* Center/Right: Progress & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Progress Pill */}
          <div className="hidden sm:flex items-center space-x-2 bg-space-850 px-3 py-1.5 rounded-lg border border-space-700/60 text-xs">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-300 font-medium">Mastery:</span>
            <span className="font-mono font-bold text-cyan-400">{solvedCount}/{totalQuestions}</span>
            <div className="w-14 sm:w-16 h-2 bg-space-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <span className="text-slate-400 font-mono text-[10px]">{percentComplete}%</span>
          </div>

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search course curriculum, formulas, and questions"
            className="flex items-center space-x-1.5 sm:space-x-2 bg-space-800 hover:bg-space-700 text-slate-300 hover:text-white px-2.5 sm:px-3 py-1.5 rounded-lg border border-space-700 transition text-xs font-medium focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* Labs Companion Modal Trigger */}
          <button
            onClick={onOpenLabs}
            aria-label="View Hands-on Lab Activities Guide"
            className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-500 text-white px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lab Companion</span>
            <span className="sm:hidden">Labs</span>
          </button>
        </div>
      </div>
    </header>
  );
}
