import React, { useState, useEffect, useMemo } from 'react';
import {
  EXAMS,
  NursingExam,
  ExamQuestion,
  NclexCategory,
  QuestionFormat,
  NCLEX_CATEGORIES,
  ALL_NCLEX_QUESTIONS
} from '../data/exams';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Zap,
  Layers,
  Filter,
  CheckSquare,
  Square,
  Stethoscope,
  Activity
} from 'lucide-react';

interface ExamsViewProps {
  initialExamCode?: string;
}

export const ExamsView: React.FC<ExamsViewProps> = ({ initialExamCode }) => {
  const { lang, t } = useLanguage();
  const [activeMode, setActiveMode] = useState<'practice' | 'exam_sim'>('practice');

  // --- PRACTICE MODE STATE ---
  const [practiceCategory, setPracticeCategory] = useState<NclexCategory | 'all'>('all');
  const [practiceFormat, setPracticeFormat] = useState<QuestionFormat | 'all'>('all');
  const [practiceIndex, setPracticeIndex] = useState<number>(0);
  const [practiceSelectedMcq, setPracticeSelectedMcq] = useState<number | null>(null);
  const [practiceSelectedSata, setPracticeSelectedSata] = useState<number[]>([]);
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);
  const [practiceStats, setPracticeStats] = useState<{ answered: number; correct: number }>({
    answered: 0,
    correct: 0
  });

  // Filtered practice questions
  const practiceQuestions = useMemo(() => {
    return ALL_NCLEX_QUESTIONS.filter((q) => {
      const matchCat = practiceCategory === 'all' || q.category === practiceCategory;
      const matchFormat = practiceFormat === 'all' || q.type === practiceFormat;
      return matchCat && matchFormat;
    });
  }, [practiceCategory, practiceFormat]);

  const activePracticeQ = practiceQuestions[practiceIndex] || practiceQuestions[0];

  const handleSelectPracticeMcq = (optIdx: number) => {
    if (practiceSubmitted) return;
    setPracticeSelectedMcq(optIdx);
    setPracticeSubmitted(true);
    const isCorrect = optIdx === activePracticeQ.correctIndex;
    setPracticeStats((prev) => ({
      answered: prev.answered + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));
  };

  const handleTogglePracticeSata = (optIdx: number) => {
    if (practiceSubmitted) return;
    setPracticeSelectedSata((prev) =>
      prev.includes(optIdx) ? prev.filter((i) => i !== optIdx) : [...prev, optIdx]
    );
  };

  const handleSubmitPracticeSata = () => {
    if (practiceSubmitted) return;
    setPracticeSubmitted(true);
    const correctSet = new Set(activePracticeQ.correctIndices || []);
    const selectedSet = new Set(practiceSelectedSata);
    const isExactMatch =
      correctSet.size === selectedSet.size &&
      [...selectedSet].every((val) => correctSet.has(val));

    setPracticeStats((prev) => ({
      answered: prev.answered + 1,
      correct: prev.correct + (isExactMatch ? 1 : 0)
    }));
  };

  const handleNextPracticeQ = () => {
    if (practiceIndex < practiceQuestions.length - 1) {
      setPracticeIndex((prev) => prev + 1);
    } else {
      setPracticeIndex(0);
    }
    setPracticeSelectedMcq(null);
    setPracticeSelectedSata([]);
    setPracticeSubmitted(false);
  };

  const handlePrevPracticeQ = () => {
    if (practiceIndex > 0) {
      setPracticeIndex((prev) => prev - 1);
    }
    setPracticeSelectedMcq(null);
    setPracticeSelectedSata([]);
    setPracticeSubmitted(false);
  };

  // --- EXAM SIMULATION MODE STATE ---
  const [selectedExam, setSelectedExam] = useState<NursingExam>(EXAMS[0]);
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [currentExamQIndex, setCurrentExamQIndex] = useState(0);
  const [examAnswersMcq, setExamAnswersMcq] = useState<Record<number, number>>({});
  const [examAnswersSata, setExamAnswersSata] = useState<Record<number, number[]>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(15 * 60);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!isExamRunning || isExamFinished) return;
    if (timeRemainingSeconds <= 0) {
      handleFinishExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamRunning, isExamFinished, timeRemainingSeconds]);

  const handleStartExam = () => {
    setIsExamRunning(true);
    setCurrentExamQIndex(0);
    setExamAnswersMcq({});
    setExamAnswersSata({});
    setTimeRemainingSeconds(selectedExam.timeLimitMinutes * 60);
    setIsExamFinished(false);
    setIsReviewMode(false);
  };

  const handleFinishExam = () => {
    setIsExamRunning(false);
    setIsExamFinished(true);

    let totalScore = 0;
    selectedExam.questions.forEach((q, idx) => {
      if (q.type === 'sata') {
        const correctSet = new Set(q.correctIndices || []);
        const chosen = new Set(examAnswersSata[idx] || []);
        if (
          correctSet.size === chosen.size &&
          [...chosen].every((val) => correctSet.has(val))
        ) {
          totalScore++;
        }
      } else {
        if (examAnswersMcq[idx] === q.correctIndex) {
          totalScore++;
        }
      }
    });

    const percent = Math.round((totalScore / selectedExam.questions.length) * 100);
    if (percent >= selectedExam.passingScore) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const calculateFinalScore = () => {
    let correct = 0;
    selectedExam.questions.forEach((q, idx) => {
      if (q.type === 'sata') {
        const correctSet = new Set(q.correctIndices || []);
        const chosen = new Set(examAnswersSata[idx] || []);
        if (
          correctSet.size === chosen.size &&
          [...chosen].every((val) => correctSet.has(val))
        ) {
          correct++;
        }
      } else {
        if (examAnswersMcq[idx] === q.correctIndex) {
          correct++;
        }
      }
    });
    return {
      correct,
      total: selectedExam.questions.length,
      percentage: Math.round((correct / selectedExam.questions.length) * 100)
    };
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full flex flex-col p-3 sm:p-5 overflow-y-auto space-y-4">
      {/* Module Header */}
      <div className="bg-slate-900/90 rounded-2xl border border-cyan-500/30 p-5 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                Module 3 • NCLEX & Nursing Exam Module
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                MCQ • SATA • Clinical Scenarios
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-cyan-400" />
              <span>{lang === 'ku' ? 'ئەزموونێن نیشتمانی و تاقیکرنێن NCLEX یێن پەرستاریێ' : 'NCLEX & Nursing Board Examination Center'}</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'ku'
                ? 'تاقیکرنێن هویر یێن پەرستاریێ ب شێوازێ پرسیارێن فرە-هەلبژارتن (MCQ)، پرسیارێن چەند بەرسڤی (SATA) و حالەتێن کلینیکی (Scenarios) دگەل روونکردن و بەلگەیێن زانستی.'
                : 'Comprehensive examination engine with Practice Mode (Instant Rationales & Clinical Pearls) and Timed Exam Mode (15-min board simulation, score summaries, and in-depth review).'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 flex-shrink-0">
            <button
              onClick={() => {
                setActiveMode('practice');
                setIsExamRunning(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition ${
                activeMode === 'practice'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'ku' ? 'مۆدێ راهێنانێ (Practice Mode)' : 'Practice Mode (Instant)'}</span>
            </button>

            <button
              onClick={() => setActiveMode('exam_sim')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition ${
                activeMode === 'exam_sim'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{lang === 'ku' ? 'ئەزموونا فەرمی ب دەمژمێر (Timed Exam)' : 'Timed Exam Simulation'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. PRACTICE MODE (Instant Feedback & Rationales)          */}
      {/* ========================================================= */}
      {activeMode === 'practice' && (
        <div className="space-y-4">
          {/* Practice Controls Bar: Categories & Formats Filter */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg space-y-3">
            {/* Category Filter */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase font-mono">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                {lang === 'ku' ? 'پۆلێن تاقیکرنێ (NCLEX Categories):' : 'NCLEX Subject Categories:'}
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => {
                    setPracticeCategory('all');
                    setPracticeIndex(0);
                    setPracticeSubmitted(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition border ${
                    practiceCategory === 'all'
                      ? 'bg-cyan-500 text-slate-950 font-black border-cyan-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                  }`}
                >
                  {lang === 'ku' ? 'هەمی پۆل (All Subjects)' : 'All Subjects'}
                </button>
                {NCLEX_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setPracticeCategory(cat.id);
                      setPracticeIndex(0);
                      setPracticeSubmitted(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition border ${
                      practiceCategory === cat.id
                        ? 'bg-teal-500 text-slate-950 font-black border-teal-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {lang === 'ku' ? cat.nameKu : cat.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Filter & Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs overflow-x-auto">
                <span className="text-slate-500 font-mono text-[10px] mr-1">FORMAT:</span>
                {[
                  { id: 'all', label: 'All Formats' },
                  { id: 'mcq', label: 'Single Choice (MCQ)' },
                  { id: 'sata', label: 'Select All That Apply (SATA)' },
                  { id: 'scenario', label: 'Clinical Scenarios' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setPracticeFormat(f.id as any);
                      setPracticeIndex(0);
                      setPracticeSubmitted(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition border ${
                      practiceFormat === f.id
                        ? 'bg-slate-800 text-cyan-300 border-cyan-500/40 font-bold'
                        : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Accuracy Stats */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-400">
                  Question: <strong className="text-white">{practiceIndex + 1}</strong> / {practiceQuestions.length}
                </span>
                <span className="text-emerald-400 font-bold">
                  Score: {practiceStats.correct} / {practiceStats.answered}{' '}
                  {practiceStats.answered > 0 &&
                    `(${Math.round((practiceStats.correct / practiceStats.answered) * 100)}%)`}
                </span>
              </div>
            </div>
          </div>

          {/* Active Practice Question Card */}
          {activePracticeQ ? (
            <div className="max-w-4xl mx-auto w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-5 shadow-2xl">
              {/* Question Header & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono font-bold uppercase">
                    {activePracticeQ.category.toUpperCase()}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase ${
                    activePracticeQ.type === 'sata'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : activePracticeQ.type === 'scenario'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {activePracticeQ.type === 'sata'
                      ? 'Select All That Apply'
                      : activePracticeQ.type === 'scenario'
                      ? 'Case Scenario'
                      : 'Multiple Choice'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPracticeQ}
                    disabled={practiceIndex === 0}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
                    title="Previous Question"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextPracticeQ}
                    className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 hover:text-white hover:border-cyan-500/40 flex items-center gap-1 transition"
                  >
                    <span>{lang === 'ku' ? 'پرسیارا دی' : 'Next'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scenario Vignette (if applicable) */}
              {activePracticeQ.scenarioEn && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-slate-950 to-slate-950 border border-indigo-500/30 space-y-1.5 text-xs">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase font-mono flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-indigo-400" />
                    {lang === 'ku' ? 'حالەتێ کلینیکی یێ نەخۆشی (Clinical Case Scenario):' : 'Patient Clinical Vignette:'}
                  </span>
                  <p className="text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
                    {lang === 'ku' ? (activePracticeQ.scenarioKu || activePracticeQ.scenarioEn) : activePracticeQ.scenarioEn}
                  </p>
                </div>
              )}

              {/* The Question Prompt */}
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-white leading-relaxed">
                  {lang === 'ku' ? activePracticeQ.questionKu : activePracticeQ.questionEn}
                </h3>
                {activePracticeQ.type === 'sata' && (
                  <p className="text-xs text-amber-400 font-mono">
                    {lang === 'ku' ? '* چەند بەرسڤەک دروستن. هەمی بەرسڤێن راست هەلبژێرە و دووڤ دا دگمێ رادەستکرنێ بگرە.' : '* Select all options that apply. Then click "Submit Answer" below.'}
                  </p>
                )}
              </div>

              {/* Options List */}
              <div className="space-y-2.5">
                {(lang === 'ku' ? activePracticeQ.optionsKu : activePracticeQ.optionsEn).map((opt, optIdx) => {
                  if (activePracticeQ.type === 'sata') {
                    // SATA Checkbox handling
                    const isSelected = practiceSelectedSata.includes(optIdx);
                    const isCorrectOption = (activePracticeQ.correctIndices || []).includes(optIdx);

                    let itemStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (practiceSubmitted) {
                      if (isCorrectOption) {
                        itemStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (isSelected && !isCorrectOption) {
                        itemStyle = 'bg-rose-950/40 border-rose-500 text-rose-200 line-through';
                      }
                    } else if (isSelected) {
                      itemStyle = 'bg-cyan-950/40 border-cyan-400 text-cyan-200';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleTogglePracticeSata(optIdx)}
                        className={`w-full p-3.5 rounded-xl border text-start transition flex items-start gap-3 ${itemStyle}`}
                      >
                        <div className="pt-0.5 flex-shrink-0">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm leading-relaxed">{opt}</span>
                      </button>
                    );
                  } else {
                    // Single choice MCQ handling
                    const isSelected = practiceSelectedMcq === optIdx;
                    const isCorrect = optIdx === activePracticeQ.correctIndex;

                    let itemStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700';
                    if (practiceSubmitted) {
                      if (isCorrect) {
                        itemStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        itemStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectPracticeMcq(optIdx)}
                        disabled={practiceSubmitted}
                        className={`w-full p-3.5 rounded-xl border text-start transition flex items-start gap-3 ${itemStyle}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed">{opt}</span>
                      </button>
                    );
                  }
                })}
              </div>

              {/* SATA Submit Button */}
              {activePracticeQ.type === 'sata' && !practiceSubmitted && (
                <button
                  onClick={handleSubmitPracticeSata}
                  disabled={practiceSelectedSata.length === 0}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider disabled:opacity-40 transition shadow-lg shadow-amber-500/20"
                >
                  {lang === 'ku' ? 'رادەستکرنا بەرسڤێ (Submit SATA Answer)' : 'Submit Answer'}
                </button>
              )}

              {/* Instant Rationales & Clinical Pearl Display */}
              {practiceSubmitted && (
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      <span>{lang === 'ku' ? 'شلوڤەکرنا هویر یا بەرسڤێ (Clinical Rationale):' : 'Evidence-Based Rationale:'}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {lang === 'ku' ? activePracticeQ.explanationKu : activePracticeQ.explanationEn}
                    </p>
                  </div>

                  {/* Clinical Pearl Box */}
                  {(activePracticeQ.clinicalPearlEn || activePracticeQ.clinicalPearlKu) && (
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-950 border border-cyan-500/30 text-xs flex items-start gap-2">
                      <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-cyan-300 block font-mono text-[10px] uppercase">
                          {lang === 'ku' ? 'خالا زێڕین یا پەرستاریێ (NCLEX Clinical Pearl):' : 'NCLEX Clinical Pearl:'}
                        </strong>
                        <span className="text-slate-300 text-[11px] font-sans">
                          {lang === 'ku' ? (activePracticeQ.clinicalPearlKu || activePracticeQ.clinicalPearlEn) : activePracticeQ.clinicalPearlEn}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextPracticeQ}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
                    >
                      <span>{lang === 'ku' ? 'پرسیارا دی (Next Question)' : 'Next Question'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 text-xs">
              No questions found for the selected filter combination.
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. TIMED EXAM SIMULATION MODE                             */}
      {/* ========================================================= */}
      {activeMode === 'exam_sim' && (
        <div className="space-y-4">
          {!isExamRunning && !isExamFinished && (
            <div className="max-w-3xl mx-auto w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-2xl">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">
                  {lang === 'ku' ? selectedExam.titleKu : selectedExam.titleEn}
                </h3>
                <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                  {lang === 'ku' ? selectedExam.descriptionKu : selectedExam.descriptionEn}
                </p>
              </div>

              {/* Exam specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Total Questions</span>
                  <span className="text-lg font-mono font-bold text-white">{selectedExam.questions.length}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Time Limit</span>
                  <span className="text-lg font-mono font-bold text-amber-400">{selectedExam.timeLimitMinutes} mins</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Passing Score</span>
                  <span className="text-lg font-mono font-bold text-emerald-400">{selectedExam.passingScore}%</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Format</span>
                  <span className="text-lg font-mono font-bold text-cyan-400">NCLEX CAT</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1.5 leading-relaxed font-sans">
                <strong className="text-white block">Board Exam Instructions:</strong>
                <p>• Once you begin, the 15-minute countdown clock cannot be paused.</p>
                <p>• Immediate rationales are hidden during the exam to simulate real licensure conditions.</p>
                <p>• You may jump between questions using the bottom navigation strip.</p>
              </div>

              <button
                onClick={handleStartExam}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                <span>{lang === 'ku' ? 'دەستپێکرنا تاقیکرنێ (Start Board Exam)' : 'Begin Timed Licensure Examination'}</span>
              </button>
            </div>
          )}

          {/* Running Exam Screen */}
          {isExamRunning && !isExamFinished && (
            <div className="max-w-4xl mx-auto w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-5 shadow-2xl">
              {/* Header with countdown timer & progress */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white">
                    Question {currentExamQIndex + 1} of {selectedExam.questions.length}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-mono">
                    {selectedExam.questions[currentExamQIndex].category.toUpperCase()}
                  </span>
                </div>

                {/* Animated Clock */}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-sm font-black border ${
                  timeRemainingSeconds < 180
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                    : 'bg-slate-950 border-slate-800 text-amber-400'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{formatTimer(timeRemainingSeconds)}</span>
                </div>
              </div>

              {/* Question Body */}
              {(() => {
                const q = selectedExam.questions[currentExamQIndex];
                return (
                  <div className="space-y-4">
                    {q.scenarioEn && (
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <span className="text-[10px] text-indigo-400 font-bold uppercase font-mono block">Clinical Scenario:</span>
                        <p>{lang === 'ku' ? (q.scenarioKu || q.scenarioEn) : q.scenarioEn}</p>
                      </div>
                    )}

                    <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                      {lang === 'ku' ? q.questionKu : q.questionEn}
                    </h3>

                    {/* Options */}
                    <div className="space-y-2.5">
                      {(lang === 'ku' ? q.optionsKu : q.optionsEn).map((opt, optIdx) => {
                        if (q.type === 'sata') {
                          const chosen = (examAnswersSata[currentExamQIndex] || []).includes(optIdx);
                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setExamAnswersSata((prev) => {
                                  const current = prev[currentExamQIndex] || [];
                                  const updated = current.includes(optIdx)
                                    ? current.filter((i) => i !== optIdx)
                                    : [...current, optIdx];
                                  return { ...prev, [currentExamQIndex]: updated };
                                });
                              }}
                              className={`w-full p-3.5 rounded-xl border text-start transition flex items-start gap-3 ${
                                chosen
                                  ? 'bg-amber-950/30 border-amber-500 text-amber-200'
                                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              <div className="pt-0.5 flex-shrink-0">
                                {chosen ? (
                                  <CheckSquare className="w-4 h-4 text-amber-400" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-600" />
                                )}
                              </div>
                              <span className="text-xs sm:text-sm">{opt}</span>
                            </button>
                          );
                        } else {
                          const isChosen = examAnswersMcq[currentExamQIndex] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setExamAnswersMcq((prev) => ({ ...prev, [currentExamQIndex]: optIdx }));
                              }}
                              className={`w-full p-3.5 rounded-xl border text-start transition flex items-start gap-3 ${
                                isChosen
                                  ? 'bg-cyan-950/40 border-cyan-400 text-cyan-200 font-semibold'
                                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="text-xs sm:text-sm">{opt}</span>
                            </button>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentExamQIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentExamQIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  Previous
                </button>

                {/* Question jump indicators */}
                <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto max-w-sm">
                  {selectedExam.questions.map((q, idx) => {
                    const isAnswered =
                      q.type === 'sata'
                        ? (examAnswersSata[idx] || []).length > 0
                        : examAnswersMcq[idx] !== undefined;
                    const isCurrent = currentExamQIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentExamQIndex(idx)}
                        className={`w-7 h-7 rounded-lg text-[11px] font-mono font-bold transition ${
                          isCurrent
                            ? 'bg-cyan-500 text-slate-950 font-black'
                            : isAnswered
                            ? 'bg-slate-800 text-teal-300 border border-teal-500/30'
                            : 'bg-slate-950 text-slate-500 border border-slate-800'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {currentExamQIndex < selectedExam.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentExamQIndex((prev) => prev + 1)}
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleFinishExam}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition"
                  >
                    Submit Exam
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Exam Results Summary Screen */}
          {isExamFinished && (
            <div className="max-w-4xl mx-auto w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-2xl">
              {(() => {
                const { correct, total, percentage } = calculateFinalScore();
                const passed = percentage >= selectedExam.passingScore;

                return (
                  <div className="space-y-6">
                    {/* Header Score Display */}
                    <div className="text-center space-y-3">
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto border ${
                        passed
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                          : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                      }`}>
                        {passed ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                      </div>

                      <div className="space-y-1">
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                          passed ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {passed ? 'LICENSURE CERTIFICATION PASSED' : 'DID NOT MEET PASSING THRESHOLD'}
                        </span>
                        <h3 className="text-3xl font-black text-white font-mono">
                          {percentage}%
                        </h3>
                        <p className="text-xs text-slate-400">
                          Scored {correct} out of {total} questions correctly (Passing threshold: {selectedExam.passingScore}%)
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={handleStartExam}
                        className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition font-mono"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Retake Exam</span>
                      </button>

                      <button
                        onClick={() => setIsReviewMode(!isReviewMode)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-cyan-500/20"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>{isReviewMode ? 'Hide Review' : 'Review All Questions & Rationales'}</span>
                      </button>
                    </div>

                    {/* Detailed Review Section */}
                    {isReviewMode && (
                      <div className="space-y-4 pt-4 border-t border-slate-800">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          <span>Detailed Question-by-Question Clinical Review</span>
                        </h4>

                        {selectedExam.questions.map((q, qIdx) => {
                          const isSata = q.type === 'sata';
                          const isCorrect = isSata
                            ? (() => {
                                const corr = new Set(q.correctIndices || []);
                                const chos = new Set(examAnswersSata[qIdx] || []);
                                return corr.size === chos.size && [...chos].every((v) => corr.has(v));
                              })()
                            : examAnswersMcq[qIdx] === q.correctIndex;

                          return (
                            <div
                              key={q.id}
                              className={`p-4 rounded-xl border space-y-3 ${
                                isCorrect
                                  ? 'bg-slate-950/80 border-emerald-500/30'
                                  : 'bg-slate-950/80 border-rose-500/30'
                              }`}
                            >
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="font-bold text-white">Question {qIdx + 1}</span>
                                <span className={`px-2 py-0.5 rounded font-bold ${
                                  isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                                }`}>
                                  {isCorrect ? 'Correct' : 'Incorrect'}
                                </span>
                              </div>

                              <p className="text-xs font-semibold text-white">
                                {lang === 'ku' ? q.questionKu : q.questionEn}
                              </p>

                              {/* Explanation */}
                              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                                <strong className="text-cyan-300 block font-mono">Clinical Rationale:</strong>
                                <p>{lang === 'ku' ? q.explanationKu : q.explanationEn}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
