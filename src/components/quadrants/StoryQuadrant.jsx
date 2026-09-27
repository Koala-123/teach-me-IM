import React from 'react';
import { MathView } from '../../utils/mathView';
import { ShieldCheck, AlertTriangle, ArrowRight, Lightbulb, Clock, Calendar } from 'lucide-react';

export function StoryQuadrant({ module, onProceedToLab }) {
  if (!module) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-4">
      {/* Module Overview Banner */}
      <div className="bg-gradient-to-r from-space-900 via-space-850 to-space-900 border border-space-750 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800">
            Unit {module.unitNumber}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-space-800 text-slate-300 border border-space-700 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            {module.examMilestone}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-space-800 text-slate-300 border border-space-700 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            ~{module.estHours} Study Hours
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-800/60">
            {module.badge}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {module.title}
        </h1>
        
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          {module.story.summary}
        </p>

        {/* Core Invariants Callout Box */}
        <div className="mt-6 bg-cyan-950/30 border border-cyan-700/40 rounded-xl p-4 sm:p-5">
          <div className="flex items-center space-x-2 text-cyan-300 font-bold text-sm mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span>Theoretical Invariants (Always True)</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
            {module.coreInvariants.map((inv, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-cyan-400 font-mono mt-0.5">•</span>
                <MathView text={inv} className="leading-snug" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scaffolded Narrative Sections */}
      <div className="space-y-6">
        {module.story.sections.map((sec, idx) => (
          <article 
            key={idx}
            className="bg-space-900 border border-space-800 rounded-xl p-6 sm:p-7 shadow-md hover:border-space-700 transition"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center border border-cyan-800">
                §{idx + 1}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                {sec.heading}
              </h2>
            </div>
            
            <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 font-normal">
              {sec.text.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>
                  <MathView text={paragraph} />
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Common Pitfalls Card */}
      <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-6">
        <div className="flex items-center space-x-2 text-rose-300 font-bold text-base mb-3">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <span>High-Risk Conceptual Traps to Avoid</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {module.commonPitfalls.map((pitfall, pIdx) => (
            <div key={pIdx} className="bg-space-900/80 p-3.5 rounded-lg border border-rose-900/30 text-xs sm:text-sm text-slate-300">
              <span className="text-rose-400 font-bold mr-1.5">⚠️ Pitfall {pIdx + 1}:</span>
              <MathView text={pitfall} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button to Lab */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onProceedToLab}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-black font-bold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
        >
          <span>Launch Interactive Lab Simulator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
