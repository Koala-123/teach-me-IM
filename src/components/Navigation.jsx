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
  Filter
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
  solvedByModule = {}
}) {
  const [selectedMilestone, setSelectedMilestone] = useState("ALL");

  const milestones = ["ALL", "Test 1", "Midterm", "Test 2", "Final Exam"];

  const filteredModules = selectedMilestone === "ALL"
    ? COURSE_MODULES
    : COURSE_MODULES.filter(m => m.examMilestone.includes(selectedMilestone) || (selectedMilestone === "Final Exam" && m.examMilestone.includes("Final")));

  return (
    <nav aria-label="Course Modules" className="w-full bg-space-900 border-b border-space-800 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Milestone Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 pr-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Milestone:
          </span>
          {milestones.map((ms) => {
            const isActive = selectedMilestone === ms;
            return (
              <button
                key={ms}
                onClick={() => setSelectedMilestone(ms)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-black font-bold shadow-sm shadow-cyan-500/30'
                    : 'bg-space-850 text-slate-400 hover:text-slate-200 hover:bg-space-800'
                }`}
              >
                {ms}
              </button>
            );
          })}
        </div>

        {/* Modules Horizontal Carousel / Badges */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          {filteredModules.map((mod) => {
            const Icon = ICON_MAP[mod.icon] || Cpu;
            const isSelected = mod.id === activeModuleId;
            const solved = solvedByModule[mod.id] || 0;
            const total = mod.practiceQuestions.length;
            const isCompleted = total > 0 && solved >= total;

            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`group flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-space-850 border-space-700/80 text-slate-300 hover:bg-space-800 hover:border-space-600'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                <span className="font-semibold text-slate-200">U{mod.unitNumber}:</span>
                <span className="max-w-[130px] truncate">{mod.title.split(':')[0]}</span>

                {/* Question progress dot */}
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isCompleted 
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                    : 'bg-space-750 text-slate-400'
                }`}>
                  {solved}/{total}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
