import React, { useState } from 'react';
import { DRUGS, DrugData } from '../../data/pharmacy';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRightLeft } from 'lucide-react';

export const PharmacyInteractionChecker: React.FC = () => {
  const { t, lang } = useLanguage();
  const [drug1Id, setDrug1Id] = useState<string>('aspirin');
  const [drug2Id, setDrug2Id] = useState<string>('ibuprofen');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(true);

  const drug1 = DRUGS.find((d) => d.id === drug1Id);
  const drug2 = DRUGS.find((d) => d.id === drug2Id);

  // Check known interactions
  const interaction = React.useMemo(() => {
    if (!drug1 || !drug2) return null;
    if (drug1.id === drug2.id) {
      return {
        severity: 'caution' as const,
        noteKu: 'هەمان دەرمان هاتیە هەلبژارتن. پێدڤیە ئاگەهداری دووبارەبوونا دۆزێ بی.',
        noteEn: 'Identical drug selected. Duplication therapy warning.'
      };
    }

    // Check drug1 against drug2
    const foundIn1 = drug1.interactions?.find(
      (i) => i.withDrugId.toLowerCase() === drug2.id.toLowerCase() || i.withDrugName.toLowerCase().includes(drug2.id.toLowerCase())
    );
    if (foundIn1) return foundIn1;

    // Check drug2 against drug1
    const foundIn2 = drug2.interactions?.find(
      (i) => i.withDrugId.toLowerCase() === drug1.id.toLowerCase() || i.withDrugName.toLowerCase().includes(drug1.id.toLowerCase())
    );
    if (foundIn2) return foundIn2;

    return {
      severity: 'safe' as const,
      noteKu: 'لێکدانەکا مەترسیدار یا تومارکری د ناڤبەرا ڤان هەردوو دەرماناندا نینە. دشێن پێگڤە ب ئاگەهداری بهێنە دان.',
      noteEn: 'No clinically significant acute interaction documented between these agents.'
    };
  }, [drug1, drug2]);

  return (
    <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 space-y-3.5 shadow-xl">
      <div className="flex items-center gap-2 text-xs font-bold text-white">
        <ArrowRightLeft className="w-4 h-4 text-amber-400" />
        <span>{t('interaction_checker')}</span>
      </div>

      <div className="space-y-2 text-xs">
        <div>
          <label className="block text-[10px] text-slate-400 mb-1">{t('select_drug_1')}</label>
          <select
            value={drug1Id}
            onChange={(e) => {
              setDrug1Id(e.target.value);
              setHasEvaluated(true);
            }}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
          >
            {DRUGS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({lang === 'ku' ? d.nameKu : d.strength})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-slate-400 mb-1">{t('select_drug_2')}</label>
          <select
            value={drug2Id}
            onChange={(e) => {
              setDrug2Id(e.target.value);
              setHasEvaluated(true);
            }}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
          >
            {DRUGS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({lang === 'ku' ? d.nameKu : d.strength})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interaction Result Box */}
      {interaction && hasEvaluated && (
        <div
          className={`p-3 rounded-xl border space-y-1.5 animate-fadeIn ${
            interaction.severity === 'dangerous'
              ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              : interaction.severity === 'caution'
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
              : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold">
            {interaction.severity === 'dangerous' ? (
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            ) : interaction.severity === 'caution' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>
              {interaction.severity === 'dangerous'
                ? t('dangerous_combination')
                : interaction.severity === 'caution'
                ? t('caution_combination')
                : t('safe_combination')}
            </span>
          </div>

          <p className="text-[11px] leading-relaxed opacity-90">
            {lang === 'ku' ? interaction.noteKu : interaction.noteEn}
          </p>
        </div>
      )}
    </div>
  );
};
