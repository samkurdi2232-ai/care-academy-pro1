import React, { useState } from 'react';
import { ORGANS, OrganData } from '../../data/organs';
import { DRUGS } from '../../data/pharmacy';
import { useLanguage } from '../../context/LanguageContext';
import { OrganMedicalIllustration } from './OrganMedicalIllustration';
import {
  Heart,
  Brain,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Pill,
  HelpCircle,
  Stethoscope,
  Info,
  Layers,
  ArrowRight,
  ExternalLink,
  Flame,
  Droplet,
  Wind,
  Shield,
  Bone
} from 'lucide-react';

interface AnatomyRightPanelProps {
  selectedOrganId: string | null;
  onSelectOrgan: (id: string | null) => void;
  onNavigateToPharmacyWithDrug?: (drugId: string) => void;
  onStartQuizForOrgan?: (organId: string) => void;
}

type TabKey = 'overview' | 'function' | 'diseases' | 'nursingCare' | 'drugs';

export const AnatomyRightPanel: React.FC<AnatomyRightPanelProps> = ({
  selectedOrganId,
  onSelectOrgan,
  onNavigateToPharmacyWithDrug,
  onStartQuizForOrgan
}) => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [completedNursingItems, setCompletedNursingItems] = useState<Record<string, boolean>>({});

  const organ: OrganData | undefined = ORGANS.find((o) => o.id === selectedOrganId);

  const toggleNursingItem = (id: string) => {
    setCompletedNursingItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get related drugs data
  const relatedDrugs = organ
    ? DRUGS.filter((d) => organ.drugs.includes(d.id) || d.relatedOrganIds?.includes(organ.id))
    : [];

  const getSystemBadgeClass = (sys: string) => {
    switch (sys) {
      case 'circulatory':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'nervous':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'respiratory':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'digestive':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'urinary':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'immune':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-teal-500/10 text-teal-400 border-teal-500/30';
    }
  };

  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          dot: 'bg-rose-500',
          label: t('priority_high')
        };
      case 'medium':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          dot: 'bg-amber-500',
          label: t('priority_medium')
        };
      case 'low':
      default:
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          dot: 'bg-emerald-500',
          label: t('priority_low')
        };
    }
  };

  // No selection empty state
  if (!organ) {
    return (
      <aside className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 text-teal-400 shadow-lg">
          <Stethoscope className="w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-base font-bold text-slate-200 mb-1">{t('click_organ')}</h3>
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
          {t('select_organ_hint')}
        </p>

        {/* Quick Organ Recommendations */}
        <div className="mt-6 w-full pt-4 border-t border-slate-800/60">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            {lang === 'ku' ? 'ئەندامێن سەرەکی یێن کلینیکی' : 'Key Clinical Organs'}
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {['heart', 'brain', 'lungs', 'kidneys'].map((id) => {
              const o = ORGANS.find((x) => x.id === id);
              if (!o) return null;
              return (
                <button
                  key={id}
                  onClick={() => onSelectOrgan(id)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 transition"
                >
                  {lang === 'ku' ? o.nameKu : o.nameEn}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full h-full flex flex-col bg-slate-900/75 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
      {/* HEADER */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/40 relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Visual Icon Badge */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border border-white/10"
              style={{ backgroundColor: `${organ.color}25` }}
            >
              <div
                className="w-4 h-4 rounded-full shadow-inner animate-pulse"
                style={{ backgroundColor: organ.color }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {lang === 'ku' ? organ.nameKu : organ.nameEn}
                </h2>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getSystemBadgeClass(
                    organ.system
                  )}`}
                >
                  {organ.system}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                <span className="italic">{organ.latin}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300 font-sans">
                  {lang === 'ku' ? organ.nameEn : organ.nameKu}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectOrgan(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/70 transition text-sm"
            title={t('close')}
          >
            ✕
          </button>
        </div>

        {/* TABS SEGMENTED CONTROL */}
        <div className="flex items-center gap-1 p-1 mt-3.5 bg-slate-900/90 rounded-xl border border-slate-800/80 overflow-x-auto">
          {(
            [
              { key: 'overview', label: t('overview') },
              { key: 'function', label: t('function') },
              { key: 'diseases', label: t('diseases') },
              { key: 'nursingCare', label: t('nursingCare') },
              { key: 'drugs', label: t('drugs') }
            ] as { key: TabKey; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT (SCROLLABLE) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Medical Illustration HD Visual */}
            <OrganMedicalIllustration organ={organ} />

            {/* Description */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-400 mb-2">
                <Info className="w-3.5 h-3.5" />
                <span>{t('overview')}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'ku' ? organ.descriptionKu : organ.descriptionEn}
              </p>
            </div>

            {/* Vitals Box */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-teal-500/30 shadow-lg">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300">
                  <Activity className="w-4 h-4 text-teal-400" />
                  <span>{t('vital_monitoring')}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  {t('normal_range')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {organ.vitals.hr && (
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">{t('hr_label')}</div>
                    <div className="font-mono font-semibold text-slate-100">{organ.vitals.hr}</div>
                  </div>
                )}
                {organ.vitals.bp && (
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">{t('bp_label')}</div>
                    <div className="font-mono font-semibold text-slate-100">{organ.vitals.bp}</div>
                  </div>
                )}
                {organ.vitals.rr && (
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">{t('rr_label')}</div>
                    <div className="font-mono font-semibold text-slate-100">{organ.vitals.rr}</div>
                  </div>
                )}
                {organ.vitals.temp && (
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">{t('temp_label')}</div>
                    <div className="font-mono font-semibold text-slate-100">{organ.vitals.temp}</div>
                  </div>
                )}
              </div>

              {/* Target Clinical Alert Note */}
              <div className="mt-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{lang === 'ku' ? organ.vitals.targetNoteKu : organ.vitals.targetNoteEn}</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= FUNCTION TAB ================= */}
        {activeTab === 'function' && (
          <div className="space-y-2 animate-fadeIn">
            {(lang === 'ku' ? organ.functionsKu : organ.functionsEn).map((func, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/70"
              >
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-mono">
                  {i + 1}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{func}</p>
              </div>
            ))}
          </div>
        )}

        {/* ================= DISEASES TAB ================= */}
        {activeTab === 'diseases' && (
          <div className="space-y-3 animate-fadeIn">
            {organ.diseases.map((dis, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-100">
                    {lang === 'ku' ? dis.nameKu : dis.nameEn}
                  </h4>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                      dis.severity === 'critical'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {dis.severity}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">
                    {lang === 'ku' ? 'نیشانەکان:' : 'Symptoms:'}
                  </strong>{' '}
                  {lang === 'ku' ? dis.symptomsKu : dis.symptomsEn}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= NURSING CARE TAB ================= */}
        {activeTab === 'nursingCare' && (
          <div className="space-y-2.5 animate-fadeIn">
            <div className="text-[11px] text-slate-400 flex items-center justify-between pb-1">
              <span>{lang === 'ku' ? 'گاڤێن پەرستاری و چاڤدێری' : 'Clinical Nurse Checklist'}</span>
              <span className="font-mono text-teal-400">
                {Object.values(completedNursingItems).filter(Boolean).length} /{' '}
                {organ.nursingCare.length}
              </span>
            </div>

            {organ.nursingCare.map((nc) => {
              const isChecked = !!completedNursingItems[nc.id];
              const pBadge = getPriorityBadge(nc.priority);

              return (
                <div
                  key={nc.id}
                  onClick={() => toggleNursingItem(nc.id)}
                  className={`p-3 rounded-xl border transition cursor-pointer select-none ${
                    isChecked
                      ? 'bg-teal-950/30 border-teal-500/40 text-slate-300'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded accent-teal-500 cursor-pointer w-4 h-4"
                    />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border inline-flex items-center gap-1 ${pBadge.bg}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${pBadge.dot}`} />
                          {pBadge.label}
                        </span>
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          isChecked ? 'line-through text-slate-500' : 'text-slate-200'
                        }`}
                      >
                        {lang === 'ku' ? nc.actionKu : nc.actionEn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= DRUGS TAB ================= */}
        {activeTab === 'drugs' && (
          <div className="space-y-2.5 animate-fadeIn">
            {relatedDrugs.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                {lang === 'ku'
                  ? 'چ دەرمانێن تایبەت بۆ ڤی ئەندامی نەهاتینە دیارکرن'
                  : 'No specific drugs linked directly to this organ.'}
              </div>
            ) : (
              relatedDrugs.map((drug) => (
                <div
                  key={drug.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-teal-500/50 transition group"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <Pill className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-bold text-slate-100">{drug.name}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-mono">
                      {drug.strength}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mb-2">
                    {lang === 'ku' ? drug.useKu : drug.useEn}
                  </p>
                  {onNavigateToPharmacyWithDrug && (
                    <button
                      onClick={() => onNavigateToPharmacyWithDrug(drug.id)}
                      className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition"
                    >
                      <span>{t('view_in_pharmacy')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/60 flex flex-col gap-2">
        {onStartQuizForOrgan && (
          <button
            onClick={() => onStartQuizForOrgan(organ.id)}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{t('start_quiz_organ')}</span>
          </button>
        )}

        {onNavigateToPharmacyWithDrug && relatedDrugs[0] && (
          <button
            onClick={() => onNavigateToPharmacyWithDrug(relatedDrugs[0].id)}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-teal-300 border border-teal-500/30 flex items-center justify-center gap-1.5 transition"
          >
            <Pill className="w-3.5 h-3.5 text-teal-400" />
            <span>{t('view_in_pharmacy')}</span>
          </button>
        )}
      </div>
    </aside>
  );
};
