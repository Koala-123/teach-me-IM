import React, { useState } from 'react';
import { COURSE_MODULES } from '../data/courseData';
import { 
  Cpu, 
  CircuitBoard, 
  Radar, 
  Activity, 
  Cog, 
  Scale, 
  Camera, 
  MapPin, 
  ChevronRight,
  Filter,
  CheckCircle2,
  X
} from 'lucide-react';

const ICON_MAP = {
  Cpu,
  CircuitBoard,
  Radar,
  Activity,
  Cog,
  Scale,
  Camera,
  MapPin
};

export function Navigation({
  activeModuleId,
  onSelectModule,
  solvedByModule = {},
  isOpen = false,
  onClose = () => {}
}) {
  const [selectedMilestone, setSelectedMilestone] = useState("ALL");

  const milestones = ["ALL", "Test 1", "Midterm", "Test 2", "Final Exam"];

  const filteredModules = selectedMilestone === "ALL"
    ? COURSE_MODULES
    : COURSE_MODULES.filter(m => m.examMilestone.includes(selectedMilestone) || (selectedMilestone === "Final Exam" && m.examMilestone.includes("Final")));

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Sidebar Header & Milestone Filter */}
      <div className="p-4 border-b border-space-800 bg-space-900/60">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Exam Milestones
            </span>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="md:hidden w-7 h-7 rounded-lg bg-space-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Milestone Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {milestones.map((ms) => {
            const isActive = selectedMilestone === ms;
            return (
              <button
                key={ms}
                onClick={() => setSelectedMilestone(ms)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-black font-bold shadow-sm shadow-cyan-500/20'
                    : 'bg-space-850 text-slate-400 hover:text-slate-200 hover:bg-space-800 border border-space-800'
                }`}
              >
                {ms}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vertical Units List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Course Units ({filteredModules.length})
        </div>

        {filteredModules.map((mod) => {
          const Icon = ICON_MAP[mod.icon] || Cpu;
          const isSelected = mod.id === activeModuleId;
          const solved = solvedByModule[mod.id] || 0;
          const total = mod.practiceQuestions.length;
          const isCompleted = total > 0 && solved >= total;

          return (
            <button
              key={mod.id}
              onClick={() => {
                onSelectModule(mod.id);
                onClose();
              }}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3 group relative ${
                isSelected
                  ? 'bg-space-850 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                  : 'bg-space-900/60 border-space-800/80 text-slate-300 hover:bg-space-850 hover:border-space-700'
              }`}
            >
              {/* Active Bar indicator */}
              {isSelected && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-cyan-400 to-teal-400 rounded-r" />
              )}

              {/* Icon Container */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                isSelected 
                  ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' 
                  : 'bg-space-800 text-slate-400 group-hover:text-cyan-400 group-hover:bg-space-750'
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              {/* Unit Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[11px] font-mono font-bold uppercase ${
                    isSelected ? 'text-cyan-400' : 'text-slate-400'
                  }`}>
                    Unit {mod.unitNumber}
                  </span>
                  
                  {/* Solved badge */}
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full border ${
                    isCompleted 
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800' 
                      : 'bg-space-800 text-slate-400 border-space-750'
                  }`}>
                    {solved}/{total}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-200 transition-colors line-clamp-2 leading-tight">
                  {mod.title}
                </h4>

                <div className="flex items-center space-x-2 mt-1.5">
                  <span className="text-[10px] text-slate-400 bg-space-800 px-1.5 py-0.5 rounded border border-space-750">
                    {mod.examMilestone}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ~{mod.estHours}h
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Vertical Sidebar */}
      <aside 
        aria-label="Course Units Sidebar"
        className="hidden md:flex flex-col w-72 lg:w-80 shrink-0 bg-space-900 border-r border-space-800 sticky top-16 h-[calc(100vh-4rem)] overflow-hidden"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
        >
          <aside 
            className="w-4/5 max-w-xs h-full bg-space-900 border-r border-space-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
