import React, { useState } from 'react';
import { TRAINING_MODULES, TrainingModule, LessonStep } from '../data/training';
import { SAFETY_CHECKLIST_DATA, SafetyCategory, ChecklistItem } from '../data/safetyChecklist';
import { useLanguage } from '../context/LanguageContext';
import { CustomVideoPlayer } from '../components/training/CustomVideoPlayer';
import {
  GraduationCap,
  Play,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Stethoscope,
  ShieldCheck,
  Flame,
  Activity,
  Sparkles,
  ClipboardCheck,
  RotateCcw,
  AlertTriangle,
  Film
} from 'lucide-react';

interface TrainingViewProps {
  onStartExamWithCode?: (code: string) => void;
  onNavigateToAnatomyOrgan?: (organId: string) => void;
}

export const TrainingView: React.FC<TrainingViewProps> = ({
  onStartExamWithCode,
  onNavigateToAnatomyOrgan
}) => {
  const { t, lang } = useLanguage();
  const [activeMainTab, setActiveMainTab] = useState<'procedures' | 'safety'>('procedures');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(TRAINING_MODULES[0].id);

  // Store completed steps in localStorage
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('care_training_steps');
      return saved ? JSON.parse(saved) : { 'vital_signs_1': true };
    } catch {
      return {};
    }
  });

  // Store safety checklist checked items
  const [safetyChecked, setSafetyChecked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('care_safety_checklist');
      return saved ? JSON.parse(saved) : { 'hh_1': true, 'hh_2': true };
    } catch {
      return { 'hh_1': true, 'hh_2': true };
    }
  });

  const toggleStep = (moduleId: string, stepNum: number) => {
    const key = `${moduleId}_${stepNum}`;
    setCompletedSteps((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('care_training_steps', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleSafetyItem = (id: string) => {
    setSafetyChecked((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('care_safety_checklist', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetSafetyChecklist = () => {
    setSafetyChecked({});
    try {
      localStorage.removeItem('care_safety_checklist');
    } catch {}
  };

  const selectedModule =
    TRAINING_MODULES.find((m) => m.id === selectedModuleId) || TRAINING_MODULES[0];

  const getModuleProgress = (m: TrainingModule) => {
    const doneCount = m.steps.filter((s) => !!completedSteps[`${m.id}_${s.stepNumber}`]).length;
    return Math.round((doneCount / m.steps.length) * 100);
  };

  // Safety checklist totals
  const allSafetyItems = SAFETY_CHECKLIST_DATA.flatMap((cat) => cat.items);
  const totalSafetyCount = allSafetyItems.length;
  const verifiedSafetyCount = allSafetyItems.filter((item) => !!safetyChecked[item.id]).length;
  const safetyPercent =
    totalSafetyCount > 0 ? Math.round((verifiedSafetyCount / totalSafetyCount) * 100) : 0;

  return (
    <div className="w-full h-full flex flex-col p-3 sm:p-5 overflow-y-auto space-y-4">
      {/* Top Banner & Tab Toggle */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/90 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-black text-white">{t('training_title')}</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">{t('training_subtitle')}</p>
        </div>

        {/* View Switcher: Clinical Procedures & Videos vs Safety Checklist */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveMainTab('procedures')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeMainTab === 'procedures'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>{lang === 'ku' ? 'راهێنان و ڤیدیۆ' : 'Procedures & Full Videos'}</span>
          </button>
          <button
            onClick={() => setActiveMainTab('safety')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeMainTab === 'safety'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'ku' ? 'لیستەیا ئێمناهیێ' : 'Clinical Safety Checklist'}</span>
          </button>
        </div>
      </div>

      {/* 1. CLINICAL PROCEDURES & VIDEOS */}
      {activeMainTab === 'procedures' && (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Modules List */}
          <section className="w-full lg:w-[35%] flex flex-col bg-slate-900/75 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
            <div className="p-3.5 border-b border-slate-800/80">
              <span className="text-xs font-bold text-slate-300 block">
                {lang === 'ku' ? 'یەکەیێن کلینیکی:' : 'Clinical Procedure Modules:'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {TRAINING_MODULES.map((mod) => {
                const isSelected = selectedModule.id === mod.id;
                const progress = getModuleProgress(mod);

                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModuleId(mod.id)}
                    className={`w-full p-3.5 rounded-2xl text-start transition border ${
                      isSelected
                        ? 'bg-gradient-to-br from-teal-950/50 via-slate-900 to-slate-950 border-teal-500/60 shadow-lg shadow-teal-500/10'
                        : 'bg-slate-950/40 border-slate-800/70 hover:border-slate-700/80 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-sm shadow-teal-400/50" />
                        <span className="text-xs font-bold text-white">
                          {lang === 'ku' ? mod.titleKu : mod.titleEn}
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 font-mono">
                        {mod.videoDuration}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                      {lang === 'ku' ? mod.overviewKu : mod.overviewEn}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{t('progress_label')}</span>
                        <span className="font-mono font-semibold text-teal-400">{progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-amber-500 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Active Module Video & Practical Steps */}
          <section className="w-full lg:w-[65%] flex flex-col bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-y-auto shadow-2xl p-4 sm:p-5 space-y-5">
            {/* Module Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/90 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-semibold uppercase">
                    {lang === 'ku' ? selectedModule.categoryKu : selectedModule.categoryEn}
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold font-mono">
                    {selectedModule.badge}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white">
                  {lang === 'ku' ? selectedModule.titleKu : selectedModule.titleEn}
                </h3>
              </div>

              {onStartExamWithCode && (
                <button
                  onClick={() => onStartExamWithCode('NURSE2026')}
                  className="py-2 px-3.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 shadow-lg transition flex-shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>{t('start_exam')}</span>
                </button>
              )}
            </div>

            {/* FULL LENGTH UNINTERRUPTED VIDEO SIMULATION PLAYER */}
            <CustomVideoPlayer
              moduleId={selectedModule.id}
              videoTitle={selectedModule.videoTitle}
              videoDuration={selectedModule.videoDuration}
            />

            {/* Practical Nurse Steps */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <span>{t('practical_steps')}</span>
                </h4>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedModule.steps.length} {lang === 'ku' ? 'گاڤ' : 'Steps'}
                </span>
              </div>

              <div className="space-y-3">
                {selectedModule.steps.map((step) => {
                  const stepKey = `${selectedModule.id}_${step.stepNumber}`;
                  const isDone = !!completedSteps[stepKey];

                  return (
                    <div
                      key={step.stepNumber}
                      onClick={() => toggleStep(selectedModule.id, step.stepNumber)}
                      className={`p-4 rounded-xl border transition cursor-pointer ${
                        isDone
                          ? 'bg-teal-950/20 border-teal-500/40'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => {}}
                          className="mt-1 rounded accent-teal-500 cursor-pointer w-4 h-4"
                        />

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                              <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-[10px] font-mono text-teal-300">
                                {step.stepNumber}
                              </span>
                              <span>{lang === 'ku' ? step.titleKu : step.titleEn}</span>
                            </div>
                            {isDone && (
                              <span className="text-[10px] text-teal-400 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{t('module_completed')}</span>
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            {lang === 'ku' ? step.descKu : step.descEn}
                          </p>

                          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-amber-300">
                                {lang === 'ku' ? 'تێبینییا زێڕین:' : 'Clinical Pearl:'}{' '}
                              </strong>
                              {lang === 'ku' ? step.clinicalTipKu : step.clinicalTipEn}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 2. CLINICAL SAFETY CHECKLIST */}
      {activeMainTab === 'safety' && (
        <div className="space-y-4 max-w-5xl mx-auto w-full">
          {/* Header Card with Progress Meter and Reset */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                <span>{t('safety_title')}</span>
              </h3>
              <p className="text-xs text-slate-400">{t('safety_subtitle')}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-end">
                <span className="text-[10px] text-slate-400 block">{t('checklist_progress')}</span>
                <span className="text-xs font-mono font-bold text-teal-400">
                  {verifiedSafetyCount} / {totalSafetyCount} ({safetyPercent}%)
                </span>
              </div>

              <button
                onClick={resetSafetyChecklist}
                className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
                title={t('reset_checklist')}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Safety Categories List */}
          <div className="space-y-4">
            {SAFETY_CHECKLIST_DATA.map((cat) => (
              <div
                key={cat.id}
                className="bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-3.5 shadow-xl"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono font-semibold">
                      {lang === 'ku' ? cat.badgeKu : cat.badgeEn}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">
                      {lang === 'ku' ? cat.titleKu : cat.titleEn}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lang === 'ku' ? cat.descriptionKu : cat.descriptionEn}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2.5">
                  {cat.items.map((item) => {
                    const isChecked = !!safetyChecked[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleSafetyItem(item.id)}
                        className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-teal-950/20 border-teal-500/40 text-slate-100'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-1 rounded accent-teal-500 cursor-pointer w-4 h-4 flex-shrink-0"
                        />

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">
                              {lang === 'ku' ? item.titleKu : item.titleEn}
                            </span>
                            {item.isMandatory && (
                              <span className="text-[9px] px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-mono">
                                {t('mandatory_protocol')}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-200 leading-relaxed font-sans">
                            {lang === 'ku' ? item.actionKu : item.actionEn}
                          </p>

                          <p className="text-[11px] text-slate-400 pt-0.5 font-mono">
                            {lang === 'ku' ? item.clinicalStandardKu : item.clinicalStandardEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
