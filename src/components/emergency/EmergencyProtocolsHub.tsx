import React, { useState } from 'react';
import {
  EMERGENCY_PROTOCOLS,
  EMERGENCY_DRUGS,
  EmergencyProtocol,
  EmergencyDrug
} from '../../data/emergencyProtocols';
import { useLanguage } from '../../context/LanguageContext';
import {
  Activity,
  Heart,
  Zap,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Droplets,
  Wind,
  CheckCircle2,
  ChevronRight,
  Flame,
  Search,
  Sparkles,
  Stethoscope,
  Info
} from 'lucide-react';

export interface AlgorithmCategoryGroup {
  id: string;
  nameEn: string;
  nameKu: string;
  icon: React.ReactNode;
  protocolIds: string[];
}

export const EmergencyProtocolsHub: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedProtocolId, setSelectedProtocolId] = useState<string>(EMERGENCY_PROTOCOLS[0].id);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleStep = (key: string) => {
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const algorithmCategories: AlgorithmCategoryGroup[] = [
    {
      id: 'cardiac_cpr',
      nameEn: '1. Resuscitation & Cardiac (ACLS/CPR)',
      nameKu: '١. بووژاندنەوە و نەخۆشیێن دلی (CPR / ACLS)',
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      protocolIds: ['cpr_bls', 'cpr_acls', 'cardiac_arrest']
    },
    {
      id: 'acs_stroke',
      nameEn: '2. Acute Coronary (ACS) & Stroke',
      nameKu: '٢. جەڵتەیا دلی (ACS) و جەڵتەیا مێشکی (Stroke)',
      icon: <Activity className="w-4 h-4 text-amber-400" />,
      protocolIds: ['acs_stemi', 'stroke_nihss']
    },
    {
      id: 'anaphylaxis_shock',
      nameEn: '3. Anaphylaxis & Allergic Shock',
      nameKu: '٣. هەستیارییا مەترسیدار و شۆک (Anaphylaxis)',
      icon: <Zap className="w-4 h-4 text-yellow-400" />,
      protocolIds: ['anaphylaxis']
    },
    {
      id: 'respiratory',
      nameEn: '4. Respiratory Emergencies (Airway/RSI)',
      nameKu: '٤. تەنگاڤیێن هەناسێ و سۆندا قڕکێ (Airway / RSI)',
      icon: <Wind className="w-4 h-4 text-cyan-400" />,
      protocolIds: ['respiratory_failure', 'tension_pneumothorax']
    },
    {
      id: 'shock_bleed',
      nameEn: '5. Shock & Hemorrhage Control (MTP)',
      nameKu: '٥. شۆک و کۆنترۆلا خوێنبەربوونێ (Hemorrhage / MTP)',
      icon: <Droplets className="w-4 h-4 text-red-500" />,
      protocolIds: ['severe_bleeding', 'septic_shock']
    },
    {
      id: 'poisoning',
      nameEn: '6. Poisoning, Toxidromes & Antidotes',
      nameKu: '٦. ژەهراویبوون و دژەژەهر (Toxidromes / Antidotes)',
      icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />,
      protocolIds: ['opioid_overdose', 'hypoglycemia']
    }
  ];

  const filteredProtocols = EMERGENCY_PROTOCOLS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      p.titleEn.toLowerCase().includes(q) ||
      p.titleKu.toLowerCase().includes(q) ||
      p.subtitleEn.toLowerCase().includes(q) ||
      p.triggerConditionEn.toLowerCase().includes(q)
    );
  });

  const selectedProtocol =
    EMERGENCY_PROTOCOLS.find((p) => p.id === selectedProtocolId) || filteredProtocols[0] || EMERGENCY_PROTOCOLS[0];

  const matchedDrugs = EMERGENCY_DRUGS.filter((d) =>
    (selectedProtocol.primaryMeds || []).includes(d.id)
  );

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-slate-900/90 rounded-2xl border border-rose-500/30 p-5 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                Module 4 • Ultimate Emergency & ICU Protocols
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                AHA 2025/2026 Resuscitation Guidelines
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-rose-400" />
              <span>{lang === 'ku' ? 'پرۆتۆکۆلێن فریاکەوتنا لەزگین و چاڤدێریا چڕ (Emergency & ICU Protocols)' : 'Emergency & ICU Critical Care Algorithms'}</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'ku'
                ? 'رێبەرێ پێنگاڤ-ب-پێنگاڤ یێ هەمی نەخۆشی و بارودۆخێن کوشندە: بووژاندنەوەیا دلی (CPR / ACLS)، جەڵتەیا دلی و مێشکی (ACS / Stroke)، شۆکا هەستیاریێ (Anaphylaxis)، تەنگاڤیێن هەناسێ و شۆک، دگەل دۆزێن دەرمانێن فریاکەوتنێ.'
                : 'Rapid-reference interactive clinical algorithms across 6 core domains: CPR/ACLS, ACS/Stroke, Anaphylaxis, Respiratory Failure/RSI, Shock/Hemorrhage Control, and Toxidromes/Antidotes.'}
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ku' ? 'لێگەڕیان د پرۆتۆکۆلان دا...' : 'Search emergency algorithms...'}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Main 2-Column Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: Protocol Directory */}
        <div className="lg:col-span-4 bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 border-b border-slate-800 pb-2">
            <span className="font-bold text-white flex items-center gap-1.5 uppercase font-mono text-[10px]">
              <Activity className="w-3.5 h-3.5 text-rose-400" />
              {lang === 'ku' ? 'لیستا پرۆتۆکۆلێن لەزگین:' : 'Rapid Reference Algorithms:'}
            </span>
            <span className="text-rose-400 font-mono text-[11px]">
              {filteredProtocols.length} {lang === 'ku' ? 'پرۆتۆکۆل' : 'protocols'}
            </span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[640px] pr-1">
            {filteredProtocols.map((p) => {
              const isSelected = selectedProtocol.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProtocolId(p.id)}
                  className={`w-full p-3.5 rounded-xl border text-start transition flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-rose-950/60 to-slate-900 border-rose-500/80 text-white shadow-md'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-white leading-tight">
                      {lang === 'ku' ? p.titleKu : p.titleEn}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono flex-shrink-0">
                      {p.steps.length} Steps
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1">
                    {lang === 'ku' ? p.subtitleKu : p.subtitleEn}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Algorithm Workflow */}
        <div className="lg:col-span-8 bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-5 shadow-xl">
          {/* Algorithm Banner */}
          <div className="border-b border-slate-800 pb-4 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono font-bold uppercase">
                EMERGENCY RESUSCITATION PROTOCOL
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {selectedProtocol.steps.length} Sequenced Actions
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">
                {lang === 'ku' ? selectedProtocol.titleKu : selectedProtocol.titleEn}
              </h3>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                {lang === 'ku' ? selectedProtocol.subtitleKu : selectedProtocol.subtitleEn}
              </p>
            </div>

            {/* Trigger condition & Golden window callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase font-mono flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  {lang === 'ku' ? 'نیشانێن دەستپێکرنا پرۆتۆکۆلی (Trigger):' : 'Trigger Condition:'}
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {lang === 'ku' ? selectedProtocol.triggerConditionKu : selectedProtocol.triggerConditionEn}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs space-y-1">
                <span className="text-[10px] text-rose-300 font-bold uppercase font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose-400" />
                  {lang === 'ku' ? 'دەمێ زێڕین یێ فریاکەوتنێ (Golden Window):' : 'Golden Timeframe Alert:'}
                </span>
                <p className="text-rose-100 text-[11px] leading-relaxed font-semibold">
                  {lang === 'ku' ? selectedProtocol.timeframeAlertKu : selectedProtocol.timeframeAlertEn}
                </p>
              </div>
            </div>
          </div>

          {/* Primary Medications Quick Reference */}
          {matchedDrugs.length > 0 && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
              <span className="text-[10px] text-cyan-400 font-bold uppercase font-mono flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                {lang === 'ku' ? 'دەرمانێن سەرەکی یێن فریاکەوتنێ (Primary Emergency Resuscitation Drugs):' : 'Essential Resuscitation Medications & Critical Doses:'}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {matchedDrugs.map((d) => (
                  <div key={d.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-xs">{d.genericNameEn}</strong>
                      <span className="text-[9px] text-amber-300 font-mono">{d.brandNames}</span>
                    </div>
                    {d.emergencyDoses[0] && (
                      <p className="text-[11px] text-cyan-300 font-mono">
                        Dose: {d.emergencyDoses[0].doseRouteEn} ({d.emergencyDoses[0].frequencyEn})
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Interactive Workflow */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs px-1 text-slate-400 font-mono">
              <span>STEP-BY-STEP EMERGENCY ALGORITHM</span>
              <span className="text-rose-400">Execute in strict sequence</span>
            </div>

            {selectedProtocol.steps.map((step) => {
              const stepKey = `${selectedProtocol.id}_step_${step.stepNumber}`;
              const isDone = !!completedSteps[stepKey];

              return (
                <div
                  key={step.stepNumber}
                  className={`p-4 rounded-xl border transition space-y-2.5 ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleStep(stepKey)}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-mono font-bold transition ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-rose-400 hover:text-white'
                      }`}
                    >
                      {step.stepNumber}
                    </button>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`text-xs sm:text-sm font-bold ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                          {lang === 'ku' ? step.titleKu : step.titleEn}
                        </span>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                          step.priority === 'critical'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : step.priority === 'urgent'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {step.priority}
                        </span>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed font-sans">
                        {lang === 'ku' ? step.actionKu : step.actionEn}
                      </p>

                      {/* Clinical Pearl Box */}
                      <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-cyan-200 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-cyan-300 font-semibold mr-1">
                            {lang === 'ku' ? 'خالا زێڕین یا کلینیکی (Clinical Pearl):' : 'Emergency Clinical Pearl:'}
                          </strong>
                          <span>{lang === 'ku' ? step.clinicalPearlKu : step.clinicalPearlEn}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
