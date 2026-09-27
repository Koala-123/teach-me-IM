import React, { useEffect } from 'react';
import { LAB_ACTIVITIES } from '../data/courseData';
import { X, FlaskConical, Wrench, CheckCircle2, AlertCircle } from 'lucide-react';

export function LabCompanionModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="lab-companion-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div 
        className="bg-space-900 border border-space-750 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-space-800 flex items-center justify-between bg-space-850">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center shadow-md">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 id="lab-companion-title" className="text-lg font-bold text-white">
                Course Hands-On Lab Companion (Labs 1 – 7)
              </h2>
              <p className="text-xs text-slate-400">
                Faithfully compiled from official course laboratory manuals and practical experiments.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Lab Companion Modal"
            className="w-8 h-8 rounded-lg bg-space-800 hover:bg-space-700 text-slate-300 hover:text-white flex items-center justify-center border border-space-700 transition focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body / Lab Activities List */}
        <div className="p-6 overflow-y-auto space-y-6">
          {LAB_ACTIVITIES.map((lab) => (
            <div 
              key={lab.labNumber}
              className="bg-space-950 border border-space-800 rounded-xl p-5 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-space-850 pb-2.5">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-xs font-bold">
                    Lab {lab.labNumber}
                  </span>
                  <h3 className="text-sm font-bold text-slate-100">
                    {lab.title}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {lab.source}
                </span>
              </div>

              {/* Objectives */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-400 block">Core Experimental Objectives:</span>
                <ul className="space-y-1 text-xs text-slate-200">
                  {lab.objectives.map((obj, oIdx) => (
                    <li key={oIdx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipment */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mr-1">
                  <Wrench className="w-3 h-3 text-cyan-400" /> Apparatus:
                </span>
                {lab.equipment.map((eq, eIdx) => (
                  <span key={eIdx} className="text-[10px] bg-space-850 text-slate-300 px-2 py-0.5 rounded border border-space-750">
                    {eq}
                  </span>
                ))}
              </div>

              {/* Key Takeaway */}
              <div className="bg-space-900/80 p-3 rounded-lg border border-space-800 text-xs text-cyan-300 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Key Engineering Takeaway:</strong> {lab.keyTakeway}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
