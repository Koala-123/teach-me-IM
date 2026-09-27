import React, { useState, useEffect, useMemo } from 'react';
import { COURSE_INFO, COURSE_MODULES } from './data/courseData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { QuadrantNav } from './components/QuadrantNav';
import { StoryQuadrant } from './components/quadrants/StoryQuadrant';
import { InteractiveLabQuadrant } from './components/quadrants/InteractiveLabQuadrant';
import { PracticeArenaQuadrant } from './components/quadrants/PracticeArenaQuadrant';
import { VaultQuadrant } from './components/quadrants/VaultQuadrant';
import { LabCompanionModal } from './components/LabCompanionModal';
import { SearchModal } from './components/SearchModal';

export function App() {
  const [activeModuleId, setActiveModuleId] = useState('unit-1-circuits');
  const [activeQuadrant, setActiveQuadrant] = useState('story'); // 'story' | 'lab' | 'practice' | 'vault'
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);

  // Local storage for solved questions
  const [solvedQuestionIds, setSolvedQuestionIds] = useState(() => {
    try {
      const saved = localStorage.getItem('teach_me_im_solved_v1');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const activeModule = useMemo(() => {
    return COURSE_MODULES.find(m => m.id === activeModuleId) || COURSE_MODULES[0];
  }, [activeModuleId]);

  // Total questions count and solved by module
  const { totalQuestions, solvedCount, solvedByModule } = useMemo(() => {
    let total = 0;
    const byMod = {};

    COURSE_MODULES.forEach(mod => {
      let modSolved = 0;
      mod.practiceQuestions.forEach(q => {
        total++;
        if (solvedQuestionIds.has(q.id)) {
          modSolved++;
        }
      });
      byMod[mod.id] = modSolved;
    });

    return {
      totalQuestions: total,
      solvedCount: solvedQuestionIds.size,
      solvedByModule: byMod
    };
  }, [solvedQuestionIds]);

  const handleQuestionSolved = (qId) => {
    setSolvedQuestionIds(prev => {
      const next = new Set(prev);
      next.add(qId);
      try {
        localStorage.setItem('teach_me_im_solved_v1', JSON.stringify([...next]));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const handleNavigate = (moduleId, quadrant, isLabModal) => {
    if (isLabModal) {
      setIsLabModalOpen(true);
      return;
    }
    setActiveModuleId(moduleId);
    if (quadrant) {
      setActiveQuadrant(quadrant);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-space-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* 1. Global Course Header */}
      <Header
        activeModule={activeModule}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLabs={() => setIsLabModalOpen(true)}
        solvedCount={solvedCount}
        totalQuestions={totalQuestions}
      />

      {/* 2. Module Selector Bar with Milestones */}
      <Navigation
        activeModuleId={activeModuleId}
        onSelectModule={(id) => {
          setActiveModuleId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        solvedByModule={solvedByModule}
      />

      {/* 3. The 4-Quadrant Switcher */}
      <QuadrantNav
        activeQuadrant={activeQuadrant}
        onSelectQuadrant={(q) => {
          setActiveQuadrant(q);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        practiceCount={activeModule.practiceQuestions.length}
        solvedCount={solvedByModule[activeModule.id] || 0}
      />

      {/* 4. Main Quadrant Workspace */}
      <main id="main-content" tabIndex="-1" className="flex-1 px-4 sm:px-6 lg:px-8 py-6 focus:outline-none">
        {activeQuadrant === 'story' && (
          <StoryQuadrant
            module={activeModule}
            onProceedToLab={() => {
              setActiveQuadrant('lab');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeQuadrant === 'lab' && (
          <InteractiveLabQuadrant
            module={activeModule}
            onProceedToPractice={() => {
              setActiveQuadrant('practice');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeQuadrant === 'practice' && (
          <PracticeArenaQuadrant
            module={activeModule}
            onProceedToVault={() => {
              setActiveQuadrant('vault');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuestionSolved={handleQuestionSolved}
            solvedQuestionIds={solvedQuestionIds}
          />
        )}

        {activeQuadrant === 'vault' && (
          <VaultQuadrant
            module={activeModule}
          />
        )}
      </main>

      {/* 5. Accessible Engineering Footer */}
      <footer className="bg-space-900 border-t border-space-800 py-6 px-4 text-center text-xs text-slate-400 space-y-2">
        <p>
          <strong className="text-slate-200">{COURSE_INFO.code}: {COURSE_INFO.title}</strong> • {COURSE_INFO.institution} • {COURSE_INFO.semester}
        </p>
        <p className="text-[11px] text-slate-500">
          Built following the <em>Active Computational Learning Blueprint</em>. Questions sourced directly from Lecture Quizzes, Tutorials 1-6, Labs 1-7, and Gittaly notes.
        </p>
      </footer>

      {/* Modals */}
      <LabCompanionModal
        isOpen={isLabModalOpen}
        onClose={() => setIsLabModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
export default App;
