import React, { useState, useMemo } from 'react';
import {
  NURSING_CARE_PLANS,
  NursingCarePlan,
  NandaDomain,
  NANDA_DOMAINS
} from '../data/carePlans';
import { useLanguage } from '../context/LanguageContext';
import {
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  Target,
  Stethoscope,
  Activity,
  Heart,
  ChevronRight,
  Printer,
  Sparkles,
  BookOpen,
  ClipboardList,
  ShieldCheck,
  UserCheck,
  Copy,
  Check,
  Wind,
  Layers,
  Zap,
  Info
} from 'lucide-react';

export const CarePlansView: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(NURSING_CARE_PLANS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<NandaDomain | 'all'>('all');
  const [activeStepTab, setActiveStepTab] = useState<'assessment' | 'diagnosis' | 'goals' | 'interventions' | 'evaluation'>('diagnosis');
  const [copied, setCopied] = useState<boolean>(false);
  const [checkedInterventions, setCheckedInterventions] = useState<Record<string, boolean>>({});

  const toggleIntervention = (key: string) => {
    setCheckedInterventions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Domain counts
  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = { all: NURSING_CARE_PLANS.length };
    NANDA_DOMAINS.forEach((dom) => {
      counts[dom.id] = NURSING_CARE_PLANS.filter((p) => p.domain === dom.id).length;
    });
    return counts;
  }, []);

  const filteredPlans = useMemo(() => {
    return NURSING_CARE_PLANS.filter((plan) => {
      const matchesDomain = selectedDomain === 'all' || plan.domain === selectedDomain;
      if (!matchesDomain) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        plan.conditionEn.toLowerCase().includes(q) ||
        plan.conditionKu.toLowerCase().includes(q) ||
        plan.nandaDiagnosisEn.toLowerCase().includes(q) ||
        plan.nandaDiagnosisKu.toLowerCase().includes(q) ||
        plan.categoryEn.toLowerCase().includes(q)
      );
    });
  }, [selectedDomain, searchQuery]);

  const selectedPlan =
    NURSING_CARE_PLANS.find((p) => p.id === selectedPlanId) || filteredPlans[0] || NURSING_CARE_PLANS[0];

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `CARE ACADEMY 3D - NURSING CARE PLAN\nCondition: ${selectedPlan.conditionEn} (${selectedPlan.conditionKu})\nDomain: ${selectedPlan.categoryEn}\nNANDA-I Diagnosis: ${selectedPlan.nandaDiagnosisEn}\nShort-term Goal: ${selectedPlan.goals.shortTermEn}\nLong-term Goal: ${selectedPlan.goals.longTermEn}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col p-3 sm:p-5 overflow-y-auto space-y-4">
      {/* Module Header */}
      <div className="bg-slate-900/90 rounded-2xl border border-teal-500/30 p-5 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                Module 2 • ADPIE Care Plans
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                NANDA-I Standardized Nursing Diagnosis
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-teal-400" />
              <span>{lang === 'ku' ? 'سیستەمێ پلانێن چاڤدێریا پەرستاریێ (ADPIE Care Plans Engine)' : 'ADPIE Clinical Nursing Care Plans Engine'}</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'ku'
                ? 'پلانێن نموونەیی یێن پەرستاریێ ل سەر دەستنیشانکرنێن NANDA-I د ٧ پۆلێن کلینیکی دا: هەلسەنگاندن (A)، دەستنیشانکرن (D)، پلان و ئارمانجێن SMART (P)، کریارێن پەرستاری و بەلگە (I)، و هەلسەنگاندنا داویێ (E).'
                : 'Comprehensive evidence-based clinical care plans categorized by NANDA-I domains. Complete 5-step ADPIE structure with rationales, baseline parameters, and SMART goals.'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleCopySummary}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
              title="Copy Summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-teal-400" />}
              <span>{copied ? (lang === 'ku' ? 'هاتە لەبەرگرتن' : 'Copied!') : (lang === 'ku' ? 'کۆپیکرن' : 'Copy')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-teal-500/20 transition"
              title="Print Care Plan"
            >
              <Printer className="w-4 h-4" />
              <span>{t('print_careplan')}</span>
            </button>
          </div>
        </div>

        {/* NANDA-I Domains Filter Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              {lang === 'ku' ? 'پۆلێن NANDA-I یێن کلینیکی:' : 'NANDA-I Clinical Domains:'}
            </span>
            <span className="font-mono text-[11px] text-teal-300">
              {filteredPlans.length} {lang === 'ku' ? 'پلانێن چاڤدێریێ' : 'Care Plans'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedDomain('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                selectedDomain === 'all'
                  ? 'bg-teal-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{lang === 'ku' ? 'هەمی پۆل (All Domains)' : 'All Domains'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 font-mono">
                {domainCounts.all}
              </span>
            </button>

            {NANDA_DOMAINS.map((dom) => {
              const isSelected = selectedDomain === dom.id;
              return (
                <button
                  key={dom.id}
                  onClick={() => setSelectedDomain(dom.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-black border-cyan-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{lang === 'ku' ? dom.nameKu : dom.nameEn}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/70 font-mono">
                    {domainCounts[dom.id] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* LEFT COLUMN: Care Plans Directory */}
        <section className="w-full lg:w-1/3 flex flex-col bg-slate-900/80 rounded-2xl border border-slate-800/80 p-4 space-y-3 shadow-xl">
          {/* Search Box */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ku' ? 'لێگەڕیان ب نەخۆشی یان دەستنیشانکرنێ...' : 'Search condition, diagnosis, symptoms...'}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition"
            />
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between px-1">
            <span>{filteredPlans.length} {lang === 'ku' ? 'پلان هاتنە دیتن' : 'templates available'}</span>
            <span className="text-teal-400 font-mono">ADPIE 2026</span>
          </div>

          {/* List of Plans */}
          <div className="space-y-2 overflow-y-auto max-h-[620px] pr-1">
            {filteredPlans.map((plan) => {
              const isSelected = selectedPlan.id === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`w-full p-3.5 rounded-xl text-start transition border flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-teal-950/70 to-slate-900 border-teal-500/80 shadow-md text-white'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-white line-clamp-1">
                      {lang === 'ku' ? plan.conditionKu : plan.conditionEn}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-teal-300 font-mono flex-shrink-0 uppercase">
                      {plan.domain.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    {lang === 'ku' ? plan.nandaDiagnosisKu : plan.nandaDiagnosisEn}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* RIGHT COLUMN: Full ADPIE Interactive Template */}
        <section className="w-full lg:w-2/3 flex flex-col bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
          {/* Header of selected plan */}
          <div className="border-b border-slate-800 pb-4 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40">
                {lang === 'ku' ? selectedPlan.categoryKu : selectedPlan.categoryEn}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                Domain: {selectedPlan.domain.toUpperCase()}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">
                {lang === 'ku' ? selectedPlan.conditionKu : selectedPlan.conditionEn}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-1 font-sans">
                {lang === 'ku' ? selectedPlan.definitionKu : selectedPlan.definitionEn}
              </p>
            </div>
          </div>

          {/* ADPIE Step Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto text-xs">
            {[
              { id: 'diagnosis', label: lang === 'ku' ? '[D] دەستنیشانکرن (Diagnosis)' : '[D] NANDA Diagnosis', icon: <Stethoscope className="w-3.5 h-3.5" /> },
              { id: 'assessment', label: lang === 'ku' ? '[A] هەلسەنگاندن (Assessment)' : '[A] Clinical Assessment', icon: <UserCheck className="w-3.5 h-3.5" /> },
              { id: 'goals', label: lang === 'ku' ? '[P] ئارمانجێن SMART (Planning)' : '[P] SMART Goals / Planning', icon: <Target className="w-3.5 h-3.5" /> },
              { id: 'interventions', label: lang === 'ku' ? '[I] کریار و بەلگە (Interventions)' : '[I] Evidence-Based Interventions', icon: <Activity className="w-3.5 h-3.5" /> },
              { id: 'evaluation', label: lang === 'ku' ? '[E] هەلسەنگاندنا داویێ (Evaluation)' : '[E] Outcome Evaluation', icon: <CheckCircle2 className="w-3.5 h-3.5" /> }
            ].map((step) => {
              const isActive = activeStepTab === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepTab(step.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {step.icon}
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>

          {/* STEP CONTENT PANELS */}

          {/* Step 2: DIAGNOSIS (Default) */}
          {activeStepTab === 'diagnosis' && (
            <div className="space-y-4">
              {/* Main NANDA Statement */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-teal-950/40 via-slate-950 to-slate-950 border border-teal-500/40 space-y-2">
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Stethoscope className="w-4 h-4 text-teal-400" />
                  {lang === 'ku' ? 'دەستنیشانکرنا فەرمی یا NANDA-I (Standardized NANDA Statement):' : 'Official NANDA-I Nursing Diagnostic Statement:'}
                </span>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {lang === 'ku' ? selectedPlan.nandaDiagnosisKu : selectedPlan.nandaDiagnosisEn}
                </p>
              </div>

              {/* PES Breakdown Cards (Problem, Etiology, Signs/Symptoms) */}
              {selectedPlan.nandaBreakdown && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Problem */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase font-mono block">
                      [P] Problem (کێشە)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      {lang === 'ku' ? selectedPlan.nandaBreakdown.problemKu : selectedPlan.nandaBreakdown.problemEn}
                    </p>
                  </div>

                  {/* Etiology (r/t) */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase font-mono block">
                      [E] Etiology / Related To (ئەگەر)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'ku' ? selectedPlan.nandaBreakdown.etiologyKu : selectedPlan.nandaBreakdown.etiologyEn}
                    </p>
                  </div>

                  {/* Signs & Symptoms (aeb) */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-rose-400 uppercase font-mono block">
                      [S] Signs & Symptoms / AEB (بەلگە)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'ku' ? selectedPlan.nandaBreakdown.signsSymptomsKu : selectedPlan.nandaBreakdown.signsSymptomsEn}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 1: ASSESSMENT */}
          {activeStepTab === 'assessment' && (
            <div className="space-y-4">
              {/* Baseline Vitals Banner */}
              {selectedPlan.assessment.vitalSignsBaseline && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase font-mono flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    {lang === 'ku' ? 'نیشانێن سەرەکی یێن نەخۆشی (Baseline Vitals):' : 'Baseline Admission Vital Signs:'}
                  </span>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                    {selectedPlan.assessment.vitalSignsBaseline.bp && (
                      <span className="text-slate-300">
                        BP: <strong className="text-amber-400">{selectedPlan.assessment.vitalSignsBaseline.bp}</strong>
                      </span>
                    )}
                    {selectedPlan.assessment.vitalSignsBaseline.hr && (
                      <span className="text-slate-300">
                        HR: <strong className="text-rose-400">{selectedPlan.assessment.vitalSignsBaseline.hr}</strong>
                      </span>
                    )}
                    {selectedPlan.assessment.vitalSignsBaseline.rr && (
                      <span className="text-slate-300">
                        RR: <strong className="text-cyan-400">{selectedPlan.assessment.vitalSignsBaseline.rr}</strong>
                      </span>
                    )}
                    {selectedPlan.assessment.vitalSignsBaseline.spO2 && (
                      <span className="text-slate-300">
                        SpO2: <strong className="text-emerald-400">{selectedPlan.assessment.vitalSignsBaseline.spO2}</strong>
                      </span>
                    )}
                    {selectedPlan.assessment.vitalSignsBaseline.temp && (
                      <span className="text-slate-300">
                        Temp: <strong className="text-orange-400">{selectedPlan.assessment.vitalSignsBaseline.temp}</strong>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Subjective vs Objective Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <h4 className="text-xs font-bold text-teal-400 flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    <span>{t('subjective_data')}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {(lang === 'ku' ? selectedPlan.assessment.subjectiveKu : selectedPlan.assessment.subjectiveEn).map((sub, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-teal-400 font-bold">•</span>
                        <span>"{sub}"</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>{t('objective_data')}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {(lang === 'ku' ? selectedPlan.assessment.objectiveKu : selectedPlan.assessment.objectiveEn).map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: GOALS / PLANNING */}
          {activeStepTab === 'goals' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
                <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider flex items-center gap-1.5 font-mono">
                  <Target className="w-4 h-4 text-cyan-400" />
                  {lang === 'ku' ? 'ئارمانجا دەم کورت (Short-Term SMART Goal - ٢٤ بۆ ٤٨ سەعەت):' : 'Short-Term SMART Goal (Within 24 - 48 Hours):'}
                </span>
                <p className="text-xs text-white leading-relaxed font-semibold">
                  {lang === 'ku' ? selectedPlan.goals.shortTermKu : selectedPlan.goals.shortTermEn}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5 font-mono">
                  <Target className="w-4 h-4 text-emerald-400" />
                  {lang === 'ku' ? 'ئارمانجا دەم درێژ (Long-Term SMART Goal - دەرکەفتن ژ خەستەخانێ):' : 'Long-Term SMART Goal (Discharge / Maintenance):'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'ku' ? selectedPlan.goals.longTermKu : selectedPlan.goals.longTermEn}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>SMART Goal Standard: Specific • Measurable • Achievable • Relevant • Time-Bound</span>
                <span className="text-cyan-400 font-mono">2026 Nursing Practice</span>
              </div>
            </div>
          )}

          {/* Step 4: INTERVENTIONS & RATIONALES */}
          {activeStepTab === 'interventions' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs px-1 text-slate-400">
                <span>{selectedPlan.interventions.length} {lang === 'ku' ? 'کریارێن پەرستاریێ دگەل بەلگەیان' : 'evidence-based interventions'}</span>
                <span className="text-teal-400 font-mono text-[11px]">Click checkbox to track completion</span>
              </div>

              {selectedPlan.interventions.map((iv, idx) => {
                const key = `${selectedPlan.id}_iv_${idx}`;
                const isChecked = !!checkedInterventions[key];
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition space-y-2.5 ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleIntervention(key)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'border-slate-700 hover:border-teal-400 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-xs font-bold ${isChecked ? 'text-emerald-300 line-through' : 'text-white'}`}>
                            {lang === 'ku' ? iv.actionKu : iv.actionEn}
                          </span>
                          <span className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                            iv.type === 'independent'
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}>
                            {iv.type}
                          </span>
                        </div>

                        {/* Evidence-Based Clinical Rationale */}
                        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-cyan-200 flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-cyan-300 font-semibold mr-1">
                              {lang === 'ku' ? 'بەلگە و سەدەما زانستی (Rationale):' : 'Clinical Rationale:'}
                            </strong>
                            <span>{lang === 'ku' ? iv.rationaleKu : iv.rationaleEn}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Step 5: EVALUATION */}
          {activeStepTab === 'evaluation' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] text-teal-400 uppercase font-bold tracking-wider flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  {lang === 'ku' ? 'پیڤەرێن هەلسەنگاندنا ئارمانجێ (Expected Outcome Criteria):' : 'Expected Outcome Criteria & Metrics:'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'ku' ? selectedPlan.evaluation.outcomeCriteriaKu : selectedPlan.evaluation.outcomeCriteriaEn}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5 font-mono">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  {lang === 'ku' ? 'بەرسڤا دروست یا نەخۆشی (Actual Target Patient Response):' : 'Actual Clinical Response Documentation:'}
                </span>
                <p className="text-xs text-emerald-100 leading-relaxed font-semibold">
                  {lang === 'ku' ? selectedPlan.evaluation.targetResponseKu : selectedPlan.evaluation.targetResponseEn}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
