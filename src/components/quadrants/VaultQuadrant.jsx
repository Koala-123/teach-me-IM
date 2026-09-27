import React from 'react';
import { MathView } from '../../utils/mathView';
import { Zap, AlertOctagon, Bookmark, CheckSquare } from 'lucide-react';

export function VaultQuadrant({ module }) {
  if (!module || !module.vault) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-4">
      {/* Vault Header */}
      <div className="bg-gradient-to-r from-purple-950/40 via-space-900 to-space-850 border border-purple-800/40 rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Zap className="w-4 h-4 text-purple-400" />
          <span>Quadrant 4: High-Yield Exam Vault</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">
          {module.title} — Quick Reference & Formula Bank
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          Distilled formulas, critical identities, and common student pitfalls compiled for rapid exam revision ({module.examMilestone}).
        </p>
      </div>

      {/* 1. Formulas & Identities */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-base">
          <Bookmark className="w-5 h-5 text-cyan-400" />
          <span>Core Mathematical Formulas & Canonical Identities</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {module.vault.formulas.map((f, idx) => (
            <div 
              key={idx}
              className="bg-space-900 border border-space-800 rounded-xl p-4 shadow-md flex flex-col justify-between hover:border-cyan-500/40 transition"
            >
              <span className="text-xs font-bold text-slate-300 mb-2">{f.name}</span>
              <div className="bg-space-950 p-3 rounded-lg border border-space-850 text-center overflow-x-auto text-sm text-cyan-200">
                <MathView text={`$$${f.tex}$$`} block={true} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Pitfalls and Counterexamples Vault */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-2 text-rose-400 font-bold text-base">
          <AlertOctagon className="w-5 h-5 text-rose-400" />
          <span>Exam Pitfall & Counterexample Vault</span>
        </div>

        <div className="space-y-3">
          {module.vault.pitfalls.map((p, idx) => (
            <div 
              key={idx}
              className="bg-space-900 border border-rose-900/40 rounded-xl p-5 shadow-md flex items-start space-x-4"
            >
              <div className="w-7 h-7 rounded-lg bg-rose-950 text-rose-400 font-bold text-xs flex items-center justify-center shrink-0 border border-rose-800/80 mt-0.5">
                !{idx + 1}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-100">
                  {p.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  <MathView text={p.desc} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
