import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MathView } from '../../utils/mathView';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  ArrowRight,
  Filter,
  Check,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export function PracticeArenaQuadrant({
  module,
  onProceedToVault,
  onQuestionSolved,
  solvedQuestionIds = new Set()
}) {
  const [filterType, setFilterType] = useState('ALL');
  // State per question: { [qId]: { attemptsMade: number, selectedOptions: Set/array, status: 'untouched'|'in_progress'|'solved'|'exhausted', natInput: string, isEvaluated: boolean } }
  const [questionStates, setQuestionStates] = useState({});

  const questions = module.practiceQuestions;

  const filteredQuestions = filterType === 'ALL'
    ? questions
    : questions.filter(q => q.type === filterType.toLowerCase());

  const getQState = (qId) => {
    return questionStates[qId] || {
      attemptsMade: 0,
      disabledOptionIndices: [],
      selectedOptions: [], // For MSQ
      status: 'untouched', // 'untouched' | 'in_progress' | 'solved' | 'exhausted'
      natInput: '',
      isEvaluated: false
    };
  };

  const updateQState = (qId, updates) => {
    setQuestionStates(prev => ({
      ...prev,
      [qId]: {
        ...getQState(qId),
        ...updates
      }
    }));
  };

  // 1. MCQ Option Click with n-1 Attempts System
  const handleMcqSelect = (question, optionIdx) => {
    const state = getQState(question.id);
    if (state.status === 'solved' || state.status === 'exhausted') return;
    if (state.disabledOptionIndices.includes(optionIdx)) return;

    const n = question.options.length;
    const allowedAttempts = Math.max(1, n - 1);
    const isCorrect = optionIdx === question.correctIndex;

    if (isCorrect) {
      // Correct!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      updateQState(question.id, {
        status: 'solved',
        selectedOptionIdx: optionIdx,
        isEvaluated: true
      });
      onQuestionSolved(question.id);
    } else {
      // Incorrect attempt
      const newAttempts = state.attemptsMade + 1;
      const newDisabled = [...state.disabledOptionIndices, optionIdx];

      if (newAttempts >= allowedAttempts) {
        // Exhausted attempts! Reveal answer
        updateQState(question.id, {
          status: 'exhausted',
          attemptsMade: newAttempts,
          disabledOptionIndices: newDisabled,
          selectedOptionIdx: optionIdx,
          isEvaluated: true
        });
      } else {
        // Still has attempts remaining! Keep retryable
        updateQState(question.id, {
          status: 'in_progress',
          attemptsMade: newAttempts,
          disabledOptionIndices: newDisabled,
          selectedOptionIdx: optionIdx
        });
      }
    }
  };

  // 2. MSQ Toggle Selection
  const handleMsqToggle = (questionId, optionIdx) => {
    const state = getQState(questionId);
    if (state.status === 'solved' || state.isEvaluated) return;

    const currentSelected = state.selectedOptions || [];
    const exists = currentSelected.includes(optionIdx);
    const nextSelected = exists
      ? currentSelected.filter(i => i !== optionIdx)
      : [...currentSelected, optionIdx];

    updateQState(questionId, { selectedOptions: nextSelected });
  };

  // 2b. MSQ Submit
  const handleMsqSubmit = (question) => {
    const state = getQState(question.id);
    const selected = (state.selectedOptions || []).sort();
    const correct = [...question.correctIndices].sort();

    const isAllCorrect = selected.length === correct.length &&
      selected.every((val, idx) => val === correct[idx]);

    if (isAllCorrect) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      updateQState(question.id, {
        status: 'solved',
        isEvaluated: true
      });
      onQuestionSolved(question.id);
    } else {
      updateQState(question.id, {
        status: 'exhausted',
        isEvaluated: true
      });
    }
  };

  // 3. NAT Check
  const handleNatSubmit = (question) => {
    const state = getQState(question.id);
    const val = parseFloat(state.natInput);
    if (isNaN(val)) return;

    const [min, max] = question.toleranceRange;
    const isCorrect = val >= min && val <= max;

    if (isCorrect) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      updateQState(question.id, {
        status: 'solved',
        isEvaluated: true
      });
      onQuestionSolved(question.id);
    } else {
      updateQState(question.id, {
        status: 'exhausted',
        isEvaluated: true
      });
    }
  };

  // Reset/Retry Question
  const handleRetryQuestion = (questionId) => {
    updateQState(questionId, {
      attemptsMade: 0,
      disabledOptionIndices: [],
      selectedOptions: [],
      selectedOptionIdx: null,
      status: 'untouched',
      natInput: '',
      isEvaluated: false
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-4">
      {/* Practice Header & Filter Tabs */}
      <div className="bg-space-900 border border-space-800 rounded-2xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Unit {module.unitNumber} Practice Arena
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Calibrated retrieval practice with the authentic <strong>(n - 1) attempt system</strong> and instant KaTeX derivations.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-space-950 p-1 rounded-xl border border-space-800 text-xs">
          {['ALL', 'MCQ', 'MSQ', 'NAT'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filterType === t 
                  ? 'bg-amber-500 text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {filteredQuestions.map((question, qIdx) => {
          const state = getQState(question.id);
          const isSolved = state.status === 'solved';
          const isExhausted = state.status === 'exhausted';
          const isEvaluated = state.isEvaluated;

          const n = question.options ? question.options.length : 0;
          const allowedAttempts = Math.max(1, n - 1);
          const remainingAttempts = Math.max(0, allowedAttempts - state.attemptsMade);

          return (
            <div
              key={question.id}
              className={`bg-space-900 border rounded-2xl p-6 sm:p-7 shadow-lg transition-all ${
                isSolved 
                  ? 'border-emerald-600/60 bg-emerald-950/10'
                  : isExhausted 
                  ? 'border-rose-700/60 bg-rose-950/10'
                  : 'border-space-800 hover:border-space-700'
              }`}
            >
              {/* Question Header & Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-md bg-space-800 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center border border-space-700">
                    Q{qIdx + 1}
                  </span>
                  <span className="text-xs font-mono uppercase font-bold px-2 py-0.5 rounded bg-space-800 text-slate-300 border border-space-700">
                    {question.type.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-amber-400/90 font-medium">
                    📌 {question.source}
                  </span>
                </div>

                {/* Status Badges */}
                <div className="flex items-center space-x-2">
                  {isSolved && (
                    <span className="flex items-center space-x-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Solved</span>
                    </span>
                  )}
                  {isExhausted && (
                    <span className="flex items-center space-x-1 text-xs font-bold text-rose-400 bg-rose-950/80 border border-rose-800 px-2 py-0.5 rounded-full">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Attempts Exhausted</span>
                    </span>
                  )}
                  {state.status === 'in_progress' && (
                    <span className="text-xs font-mono font-semibold text-amber-300 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded-full">
                      {remainingAttempts} retry {remainingAttempts === 1 ? 'attempt' : 'attempts'} left
                    </span>
                  )}

                  {isEvaluated && (
                    <button
                      onClick={() => handleRetryQuestion(question.id)}
                      className="text-xs flex items-center space-x-1 px-2.5 py-1 rounded bg-space-800 text-slate-300 hover:text-white hover:bg-space-700 border border-space-700 transition"
                      title="Reset and retry question"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Retry</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Title & Prompt */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {question.title}
              </h3>
              <div className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6 font-normal">
                <MathView text={question.prompt} />
              </div>

              {/* ---------------- 1. MCQ OPTIONS ---------------- */}
              {question.type === 'mcq' && (
                <div 
                  role="radiogroup" 
                  aria-label={question.title} 
                  className="space-y-3"
                >
                  {question.options.map((opt, optIdx) => {
                    const isDisabled = state.disabledOptionIndices.includes(optIdx);
                    const isCorrect = optIdx === question.correctIndex;
                    const showAsCorrect = (isSolved || isExhausted) && isCorrect;
                    const showAsWrong = isDisabled;

                    let btnStyle = "bg-space-850 border-space-750 text-slate-200 hover:border-cyan-500/60 hover:bg-space-800";
                    if (showAsCorrect) {
                      btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20";
                    } else if (showAsWrong) {
                      btnStyle = "bg-rose-950/40 border-rose-800/80 text-rose-300 opacity-60 cursor-not-allowed";
                    }

                    return (
                      <button
                        key={optIdx}
                        role="radio"
                        aria-checked={showAsCorrect}
                        disabled={isEvaluated || isDisabled}
                        onClick={() => handleMcqSelect(question, optIdx)}
                        className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${btnStyle}`}
                      >
                        <div className="w-5 h-5 rounded-full border border-space-600 flex items-center justify-center shrink-0 mt-0.5">
                          {showAsCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : showAsWrong ? (
                            <XCircle className="w-4 h-4 text-rose-400" />
                          ) : (
                            <span className="font-mono text-[10px] text-slate-400">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                          )}
                        </div>
                        <div className="leading-relaxed">
                          <MathView text={opt} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ---------------- 2. MSQ OPTIONS ---------------- */}
              {question.type === 'msq' && (
                <div className="space-y-3">
                  <div role="group" aria-label={question.title} className="space-y-2.5">
                    {question.options.map((opt, optIdx) => {
                      const isSelected = (state.selectedOptions || []).includes(optIdx);
                      const isActuallyCorrect = question.correctIndices.includes(optIdx);

                      let optionBoxStyle = "bg-space-850 border-space-750 text-slate-200 hover:border-space-600";
                      if (isEvaluated) {
                        if (isSelected && isActuallyCorrect) {
                          optionBoxStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200";
                        } else if (isSelected && !isActuallyCorrect) {
                          optionBoxStyle = "bg-rose-950/70 border-rose-500 text-rose-200";
                        } else if (!isSelected && isActuallyCorrect) {
                          optionBoxStyle = "border-dashed border-emerald-500/80 bg-emerald-950/30 text-emerald-300";
                        }
                      } else if (isSelected) {
                        optionBoxStyle = "bg-cyan-950/60 border-cyan-500 text-cyan-200";
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleMsqToggle(question.id, optIdx)}
                          className={`cursor-pointer p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start space-x-3 ${optionBoxStyle}`}
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-space-600 bg-space-800'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div className="flex-1 leading-relaxed">
                            <MathView text={opt} />
                          </div>
                          {isEvaluated && (
                            <span className="text-[11px] font-mono font-bold uppercase shrink-0">
                              {isSelected && isActuallyCorrect && <span className="text-emerald-400">✓ Correct</span>}
                              {isSelected && !isActuallyCorrect && <span className="text-rose-400">✗ Incorrect</span>}
                              {!isSelected && isActuallyCorrect && <span className="text-emerald-400">Missed</span>}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!isEvaluated && (
                    <div className="pt-2">
                      <button
                        onClick={() => handleMsqSubmit(question)}
                        disabled={(state.selectedOptions || []).length === 0}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-400 hover:to-orange-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-xs shadow-md transition"
                      >
                        Submit Evaluation ({ (state.selectedOptions || []).length } selected)
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ---------------- 3. NAT NUMERICAL INPUT ---------------- */}
              {question.type === 'nat' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      step="any"
                      disabled={isEvaluated}
                      placeholder="Enter numeric answer"
                      value={state.natInput}
                      onChange={(e) => updateQState(question.id, { natInput: e.target.value })}
                      className="bg-space-950 border border-space-700 rounded-xl px-4 py-2.5 text-sm font-mono text-cyan-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-48"
                    />
                    <span className="font-mono text-xs text-slate-300 font-bold bg-space-800 px-3 py-2.5 rounded-xl border border-space-700">
                      {question.unit}
                    </span>
                    {!isEvaluated && (
                      <button
                        onClick={() => handleNatSubmit(question)}
                        disabled={!state.natInput}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-400 hover:to-orange-300 disabled:opacity-50 text-black font-bold text-xs shadow-md transition"
                      >
                        Check Answer
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Status Announcement Banner */}
              {state.status === 'in_progress' && (
                <div role="status" aria-live="polite" className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-300 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    ❌ Incorrect choice. You have <strong>{remainingAttempts}</strong> attempt{remainingAttempts === 1 ? '' : 's'} remaining to rethink and retry!
                  </span>
                </div>
              )}

              {isExhausted && (
                <div role="status" aria-live="assertive" className="mt-4 p-3 rounded-xl bg-rose-950/50 border border-rose-800/80 text-xs text-rose-200 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    ⚠️ All allowed attempts used. Correct answer and detailed derivation revealed below.
                  </span>
                </div>
              )}

              {/* Step-by-Step KaTeX Explanation Reveal */}
              {isEvaluated && (
                <div className="mt-6 pt-5 border-t border-space-800 space-y-3 bg-space-950/60 p-4 rounded-xl border border-space-800/80 animate-fade-in">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Step-by-Step Mathematical Derivation</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    <MathView text={question.explanation} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Proceed to Vault CTA */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onProceedToVault}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/20 transition transform hover:-translate-y-0.5"
        >
          <span>Review High-Yield Vault & Formula Bank</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
