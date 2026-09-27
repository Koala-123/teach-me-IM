import React, { useState, useEffect, useMemo } from 'react';
import { COURSE_MODULES, LAB_ACTIVITIES } from '../data/courseData';
import { Search, X, BookOpen, Target, Zap, FlaskConical, ChevronRight } from 'lucide-react';

export function SearchModal({
  isOpen,
  onClose,
  onNavigate
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle search
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const searchIndex = useMemo(() => {
    const items = [];

    COURSE_MODULES.forEach(mod => {
      // 1. Module entry
      items.push({
        type: 'module',
        moduleId: mod.id,
        quadrant: 'story',
        title: `Unit ${mod.unitNumber}: ${mod.title}`,
        snippet: mod.story.summary,
        badge: mod.examMilestone
      });

      // 2. Questions
      mod.practiceQuestions.forEach(q => {
        items.push({
          type: 'question',
          moduleId: mod.id,
          quadrant: 'practice',
          title: q.title,
          snippet: `${q.prompt} (Source: ${q.source})`,
          badge: q.type.toUpperCase()
        });
      });

      // 3. Formulas
      mod.vault.formulas.forEach(f => {
        items.push({
          type: 'formula',
          moduleId: mod.id,
          quadrant: 'vault',
          title: f.name,
          snippet: f.tex,
          badge: `Unit ${mod.unitNumber} Formula`
        });
      });
    });

    // 4. Labs
    LAB_ACTIVITIES.forEach(lab => {
      items.push({
        type: 'lab',
        moduleId: 'unit-1-circuits',
        isLabModal: true,
        title: `Lab ${lab.labNumber}: ${lab.title}`,
        snippet: lab.keyTakeway,
        badge: 'Lab Activity'
      });
    });

    return items;
  }, []);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return searchIndex.slice(0, 8);

    return searchIndex.filter(item => {
      return item.title.toLowerCase().includes(trimmed) ||
        item.snippet.toLowerCase().includes(trimmed) ||
        item.badge.toLowerCase().includes(trimmed);
    }).slice(0, 15);
  }, [query, searchIndex]);

  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Search Course Content"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-space-900 border border-space-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-space-800 flex items-center space-x-3 bg-space-850">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search concepts, questions, formulas (e.g. Thevenin, HC-SR04, Op-Amp, GP25, A*)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-1.5 flex-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No matching content found for "{query}". Try searching for <span className="text-cyan-400">voltage</span>, <span className="text-cyan-400">pico</span>, <span className="text-cyan-400">motor</span>, or <span className="text-cyan-400">quiz</span>.
            </div>
          ) : (
            results.map((res, idx) => {
              let Icon = BookOpen;
              let iconColor = "text-blue-400";
              if (res.type === 'question') {
                Icon = Target;
                iconColor = "text-amber-400";
              } else if (res.type === 'formula') {
                Icon = Zap;
                iconColor = "text-purple-400";
              } else if (res.type === 'lab') {
                Icon = FlaskConical;
                iconColor = "text-emerald-400";
              }

              return (
                <div
                  key={idx}
                  onClick={() => {
                    onNavigate(res.moduleId, res.quadrant, res.isLabModal);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-space-800 border border-transparent hover:border-space-700 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-start space-x-3 overflow-hidden">
                    <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`} />
                    <div className="space-y-0.5 truncate">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 truncate">
                          {res.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-space-950 text-slate-400 border border-space-800 shrink-0">
                          {res.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate max-w-lg">
                        {res.snippet}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-space-800 bg-space-950 text-[11px] text-slate-400 flex justify-between items-center px-4">
          <span>{results.length} result{results.length === 1 ? '' : 's'} displayed</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-space-800 border border-space-700 font-mono text-[10px] text-slate-300">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
