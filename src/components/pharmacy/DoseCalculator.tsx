import React, { useState, useMemo } from 'react';
import { DrugData } from '../../data/pharmacy';
import { useLanguage } from '../../context/LanguageContext';
import { Calculator, AlertTriangle, CheckCircle2, Scale, Clock } from 'lucide-react';

interface DoseCalculatorProps {
  drug: DrugData;
}

export const DoseCalculator: React.FC<DoseCalculatorProps> = ({ drug }) => {
  const { t, lang } = useLanguage();
  const [weightKg, setWeightKg] = useState<number>(20); // Default pediatric/adult starting value
  const [ageYears, setAgeYears] = useState<number>(6);

  const calculation = useMemo(() => {
    if (!weightKg || weightKg <= 0) return null;

    const rawSingleDose = Math.round(weightKg * drug.calculator.mgPerKg);
    const cappedSingleDose = Math.min(rawSingleDose, drug.calculator.maxSingleDoseMg);
    const dosesPerDay = Math.floor(24 / (drug.calculator.frequencyHours || 8));
    const dailyTotal = cappedSingleDose * dosesPerDay;
    const isExceedingMax = rawSingleDose > drug.calculator.maxSingleDoseMg || dailyTotal > drug.calculator.maxDailyDoseMg;

    return {
      rawSingleDose,
      singleDose: cappedSingleDose,
      dosesPerDay,
      dailyTotal,
      frequencyHours: drug.calculator.frequencyHours,
      isExceedingMax,
      formula: `${weightKg} kg × ${drug.calculator.mgPerKg} mg/kg = ${rawSingleDose} mg`
    };
  }, [weightKg, ageYears, drug]);

  return (
    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-teal-500/30 space-y-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300">
          <Calculator className="w-4 h-4 text-teal-400" />
          <span>{t('dose_calculator')}</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {drug.calculator.mgPerKg} mg/kg
        </span>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="block text-[10px] text-slate-400 mb-1 flex items-center gap-1">
            <Scale className="w-3 h-3 text-slate-400" />
            <span>{t('weight_kg')}</span>
          </label>
          <input
            type="number"
            min="1"
            max="180"
            value={weightKg}
            onChange={(e) => setWeightKg(Math.max(1, parseFloat(e.target.value) || 0))}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
          />
        </div>
        <div>
          <label className="block text-[10px] text-slate-400 mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{t('age_years')}</span>
          </label>
          <input
            type="number"
            min="0"
            max="120"
            value={ageYears}
            onChange={(e) => setAgeYears(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
          />
        </div>
      </div>

      {/* Calculated Dose Result Card */}
      {calculation && (
        <div className="p-2.5 rounded-lg bg-slate-950 border border-teal-500/20 space-y-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] text-slate-400">{t('calculated_dose')}:</span>
            <span className="text-sm font-bold text-teal-300 font-mono">
              {calculation.singleDose} mg
              <span className="text-xs text-slate-400 font-normal ms-1">
                (Q{calculation.frequencyHours}H)
              </span>
            </span>
          </div>

          <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-800/80 pt-1">
            <span>{t('formula_used')}:</span>
            <span className="text-slate-300">{calculation.formula}</span>
          </div>

          {calculation.isExceedingMax && (
            <div className="p-1.5 rounded bg-rose-500/10 border border-rose-500/30 text-[10px] text-rose-300 flex items-start gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{t('max_dose_warning')} (Capped at {drug.calculator.maxSingleDoseMg} mg)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
