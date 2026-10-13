import React, { useState } from 'react';
import {
  VITAL_SIGNS_REFERENCE,
  CLINICAL_MCQS,
  VitalSignAgeGroup,
  PracticeQuizQuestion
} from '../data/clinicalTools';
import { SAFETY_CHECKLIST_DATA, SafetyCategory, ChecklistItem } from '../data/safetyChecklist';
import { useLanguage } from '../context/LanguageContext';
import {
  Calculator,
  Activity,
  Award,
  Droplets,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { ClinicalDoseIVCalculator } from '../components/clinical/ClinicalDoseIVCalculator';

export const ClinicalToolsView: React.FC = () => {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'vitals' | 'safety' | 'drip' | 'quiz'>('vitals');
  const [selectedSafetyCat, setSelectedSafetyCat] = useState<string>(SAFETY_CHECKLIST_DATA[0].id);
  const [safetyChecked, setSafetyChecked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('care_clinical_tools_safety');
      return saved ? JSON.parse(saved) : { 'hh_1': true, 'hh_2': true, 'right_1_patient': true };
    } catch {
      return { 'hh_1': true, 'hh_2': true, 'right_1_patient': true };
    }
  });

  const toggleSafety = (id: string) => {
    setSafetyChecked((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('care_clinical_tools_safety', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const activeCategory =
    SAFETY_CHECKLIST_DATA.find((c) => c.id === selectedSafetyCat) || SAFETY_CHECKLIST_DATA[0];

  // --- MCQ Practice Quiz State ---
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const activeQuestion = CLINICAL_MCQS[currentQuizIndex];

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    setAnsweredCount((prev) => prev + 1);
    if (index === activeQuestion.correctIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < CLINICAL_MCQS.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore(0);
    setAnsweredCount(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="w-full h-full flex flex-col p-3 sm:p-5 overflow-y-auto space-y-4">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/90 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-black text-white">{t('tools_title')}</h2>
          </div>
          <p className="text-xs text-slate-400">{t('tools_subtitle')}</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
          {[
            { id: 'vitals', label: t('vitals_table_tab'), icon: <Activity className="w-3.5 h-3.5" /> },
            { id: 'safety', label: lang === 'ku' ? 'پرۆتۆکۆلێ ئێمناهیێ' : 'Safety Checklist', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> },
            { id: 'drip', label: lang === 'ku' ? 'هەژمارکەرێ دۆز و دڵۆپێن دەماری (Dose & IV)' : 'Dose & IV Drip Calculator', icon: <Droplets className="w-3.5 h-3.5 text-cyan-400" /> },
            { id: 'quiz', label: t('mcq_quiz_tab'), icon: <Award className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. NORMAL VITAL SIGNS MATRIX */}
      {activeTab === 'vitals' && (
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>{t('vitals_table_tab')}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ku'
                  ? 'پێوانەیێن نورمال یێن نیشانێن ژیانی بۆ هەمی تەمەنان (پەستان، لێدانا دلی، هەناسە و پلەیا گەرمێ)'
                  : 'Target clinical ranges across the human lifespan with critical alarm limits'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80">
                  <th className="p-3 text-start">{t('age_group')}</th>
                  <th className="p-3 text-start">{t('hr_range')}</th>
                  <th className="p-3 text-start">{t('rr_range')}</th>
                  <th className="p-3 text-start">{t('bp_range')}</th>
                  <th className="p-3 text-start">{t('temp_range')}</th>
                  <th className="p-3 text-start">SpO2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {VITAL_SIGNS_REFERENCE.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-3 font-semibold text-white">
                      <div>{lang === 'ku' ? row.ageGroupKu : row.ageGroupEn}</div>
                      <span className="text-[10px] text-slate-500 font-mono">{row.ageSpan}</span>
                    </td>
                    <td className="p-3 font-mono text-cyan-400 font-bold">
                      {row.heartRateBpm.min} - {row.heartRateBpm.max} bpm
                      <div className="text-[10px] text-slate-400 font-sans">
                        {lang === 'ku' ? row.heartRateBpm.noteKu : row.heartRateBpm.noteEn}
                      </div>
                    </td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">
                      {row.respiratoryRateBpm.min} - {row.respiratoryRateBpm.max} bpm
                    </td>
                    <td className="p-3 font-mono text-amber-400 font-bold">
                      {row.bloodPressureSystolic.target} / {row.bloodPressureDiastolic.target}
                    </td>
                    <td className="p-3 font-mono text-slate-200">
                      {row.temperatureC.min}° - {row.temperatureC.max}°C
                    </td>
                    <td className="p-3 font-mono text-teal-400 font-bold">
                      ≥ {row.spO2Percent.min}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. CLINICAL SAFETY CHECKLIST PROTOCOL */}
      {activeTab === 'safety' && (
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ku' ? 'پرۆتۆکۆلێ ئێمناهیێ و سەلامەتیا کلینیکی' : 'Clinical Safety Checklist & Protocols'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'ku'
                  ? 'رێکارێن بنەڕەتی بۆ پاراستنا نەخۆشی ژ هەوکرن، شاشیێن دەرمانان و گوهاستنا ڤایرۆسان (WHO, CDC)'
                  : 'Core pre-procedure protocols: Hand hygiene, PPE sequences, and 10 Rights of medication administration'}
              </p>
            </div>
          </div>

          {/* Safety Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {SAFETY_CHECKLIST_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedSafetyCat(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                  selectedSafetyCat === cat.id
                    ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-md'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {lang === 'ku' ? cat.badgeKu : cat.badgeEn}
              </button>
            ))}
          </div>

          {/* Active Category Header Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-black text-white">
                {lang === 'ku' ? activeCategory.titleKu : activeCategory.titleEn}
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                {activeCategory.items.filter((i) => safetyChecked[i.id]).length} / {activeCategory.items.length} Checked
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'ku' ? activeCategory.descriptionKu : activeCategory.descriptionEn}
            </p>
          </div>

          {/* Checklist Items Interactive List */}
          <div className="space-y-3">
            {activeCategory.items.map((item) => {
              const isChecked = !!safetyChecked[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleSafety(item.id)}
                  className={`p-4 rounded-xl border transition cursor-pointer select-none ${
                    isChecked
                      ? 'bg-slate-950/90 border-emerald-500/40 text-slate-100 shadow-sm'
                      : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition border ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'border-slate-700 bg-slate-900 text-transparent hover:border-slate-500'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-black ${isChecked ? 'text-emerald-300' : 'text-white'}`}>
                          {lang === 'ku' ? item.titleKu : item.titleEn}
                        </span>
                        {item.isMandatory && (
                          <span className="text-[9px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold uppercase">
                            {lang === 'ku' ? 'فەرز / Mandatory' : 'Mandatory'}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {lang === 'ku' ? item.actionKu : item.actionEn}
                      </p>

                      <div className="text-[11px] text-teal-400/90 bg-teal-500/5 px-2.5 py-1 rounded-lg border border-teal-500/10 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-teal-400 flex-shrink-0" />
                        <span>{lang === 'ku' ? item.clinicalStandardKu : item.clinicalStandardEn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. CLINICAL DOSE & IV DRIP CALCULATOR SUITE */}
      {activeTab === 'drip' && <ClinicalDoseIVCalculator />}

      {/* 3. QUICK PRACTICE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto w-full bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 sm:p-6 space-y-5 shadow-xl">
          {!isQuizCompleted ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold">
                    {lang === 'ku' ? activeQuestion.categoryKu : activeQuestion.categoryEn}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {currentQuizIndex + 1} / {CLINICAL_MCQS.length}
                  </span>
                </div>

                <div className="font-mono text-xs text-emerald-400 font-bold">
                  {t('quiz_score')} {quizScore} / {answeredCount}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {lang === 'ku' ? activeQuestion.questionKu : activeQuestion.questionEn}
                </h3>

                <div className="space-y-2.5">
                  {(lang === 'ku' ? activeQuestion.optionsKu : activeQuestion.optionsEn).map(
                    (opt, idx) => {
                      const isChosen = selectedAnswer === idx;
                      const isCorrect = idx === activeQuestion.correctIndex;

                      let btnStyle =
                        'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200';
                      if (showExplanation) {
                        if (isCorrect) {
                          btnStyle =
                            'bg-emerald-950/40 border-emerald-500/70 text-emerald-200 font-bold';
                        } else if (isChosen) {
                          btnStyle = 'bg-rose-950/40 border-rose-500/70 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={showExplanation}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full p-3.5 rounded-xl text-start text-xs border transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showExplanation && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          )}
                          {showExplanation && isChosen && !isCorrect && (
                            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Explanation Callout */}
                {showExplanation && (
                  <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-200 space-y-1">
                    <strong className="text-teal-300 block">{t('clinical_rationale')}</strong>
                    <p className="leading-relaxed">
                      {lang === 'ku' ? activeQuestion.rationaleKu : activeQuestion.rationaleEn}
                    </p>
                  </div>
                )}
              </div>

              {showExplanation && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuiz}
                    className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition"
                  >
                    <span>{t('next_question')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <Award className="w-16 h-16 text-amber-400 mx-auto" />
              <h3 className="text-xl font-black text-white">
                {lang === 'ku' ? 'ئەزموون ب سەرکەفتیانە ب داوی هات!' : 'Quiz Completed!'}
              </h3>
              <p className="text-sm font-mono text-teal-300">
                {t('quiz_score')} {quizScore} / {CLINICAL_MCQS.length} (
                {Math.round((quizScore / CLINICAL_MCQS.length) * 100)}%)
              </p>
              <button
                onClick={handleRestartQuiz}
                className="py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('restart_quiz')}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
