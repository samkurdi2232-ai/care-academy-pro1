import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Calculator,
  Droplet,
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle2,
  Clock,
  Activity,
  Heart,
  RotateCcw,
  Sparkles,
  Zap,
  Scale,
  Syringe,
  Layers,
  ChevronRight
} from 'lucide-react';

export interface HighAlertPreset {
  id: string;
  nameEn: string;
  nameKu: string;
  category: 'high_alert' | 'critical_infusion' | 'electrolyte';
  defaultDose: number;
  doseUnit: 'units/kg/hr' | 'units/kg' | 'mcg/kg/min' | 'mg/kg' | 'mEq/hr';
  concentration: string;
  concentrationMgPerMl?: number;
  concentrationUnitsPerMl?: number;
  maxSafeDose: string;
  maxSafeDoseNumeric?: number;
  warningEn: string;
  warningKu: string;
  antidoteOrReversalEn?: string;
  antidoteOrReversalKu?: string;
  requiresDoubleCheck: boolean;
}

export const HIGH_ALERT_PRESETS: HighAlertPreset[] = [
  {
    id: 'insulin_regular',
    nameEn: 'Regular Insulin IV Infusion (DKA / Hyperglycemia)',
    nameKu: 'ئینسیۆلینا ئاسایی ب رێکا دەماری (Insulin IV)',
    category: 'high_alert',
    defaultDose: 0.1,
    doseUnit: 'units/kg/hr',
    concentration: '100 Units in 100 mL Normal Saline (1 Unit/mL)',
    concentrationUnitsPerMl: 1,
    maxSafeDose: '0.2 Units/kg/hr (titrated based on hourly capillary blood glucose)',
    maxSafeDoseNumeric: 0.2,
    warningEn: 'CRITICAL HIGH ALERT: Must have two RN independent checks. Check blood glucose hourly. Check serum potassium prior to starting; if K+ < 3.3 mEq/L, withhold and correct potassium first to avert fatal arrhythmias.',
    warningKu: 'ئاگەهدارییا گەلەک مەترسیدار: پێدڤیە دوو پەرستار پێکڤە پێداچوونێ ل سەر بکەن. هەر دەمژمێر پێڤانا شەکرێ بکە. پێدڤیە پۆتاسیۆم > ٣.٣ بیت بەری دەستپێکرنێ، هەروەکی دێ بیتە ئەگەرێ راوەستانا دلی!',
    antidoteOrReversalEn: 'Dextrose 50% (D50W) 25-50 mL IV Push for severe hypoglycemia',
    antidoteOrReversalKu: 'شەکر ٥٠٪ (D50W) ٢٥-٥٠ مل راستەوخۆ د دەمار دا بۆ نزمبوونا لەزگین یا شەکرێ',
    requiresDoubleCheck: true
  },
  {
    id: 'heparin_iv',
    nameEn: 'Heparin Sodium IV (Thromboembolism / ACS)',
    nameKu: 'هیپارین ب دەمار (Heparin Sodium IV)',
    category: 'high_alert',
    defaultDose: 18,
    doseUnit: 'units/kg/hr',
    concentration: '25,000 Units in 250 mL D5W or 0.9% NS (100 Units/mL)',
    concentrationUnitsPerMl: 100,
    maxSafeDose: 'Initial bolus 80 Units/kg (max 10,000 U), maintenance 18 Units/kg/hr (max 2,000 U/hr)',
    maxSafeDoseNumeric: 25,
    warningEn: 'CRITICAL HIGH ALERT: Dedicated IV infusion pump strictly. Check baseline aPTT/PT/INR and CBC (platelets). Monitor aPTT every 6 hours until therapeutic (target 1.5 - 2.5x control, typically 60 - 80 seconds). Watch for Heparin-Induced Thrombocytopenia (HIT).',
    warningKu: 'ئاگەهدارییا گەلەک مەترسیدار: تەنێ ب ئامیرێ ئەلیکترۆنی یێ پەمپێ (Infusion Pump) بهێتە دان. پشکنینا خەستییا خوێنێ (aPTT) هەر ٦ دەمژمێران پێدڤیە. چاڤدێریا خوێنبەربوونێ و کێمبوونا سه‌فحیاتان (HIT) بکە.',
    antidoteOrReversalEn: 'Protamine Sulfate (1 mg neutralizes ~100 Units of heparin given in previous 2 hours; max 50 mg slow IV)',
    antidoteOrReversalKu: 'پڕۆتامین سەلفەیت (Protamine Sulfate): ١ مگم بۆ ١٠٠ یەکەیێن هیپارینێ',
    requiresDoubleCheck: true
  },
  {
    id: 'potassium_chloride',
    nameEn: 'Potassium Chloride (KCl) IV Piggyback',
    nameKu: 'پۆتاسیۆم کلۆراید (Potassium Chloride IV)',
    category: 'electrolyte',
    defaultDose: 10,
    doseUnit: 'mEq/hr',
    concentration: '10 mEq in 100 mL 0.9% NS (Peripheral) or 20 mEq in 100 mL (Central Line)',
    maxSafeDose: 'Max peripheral rate: 10 mEq/hr; Max central line rate: 20 mEq/hr with continuous ECG telemetry',
    maxSafeDoseNumeric: 20,
    warningEn: 'DEADLY WARNING: NEVER ADMINISTER AS DIRECT IV PUSH OR BOLUS — WILL CAUSE INSTANT CARDIAC ARREST AND ASYSTOLE. Always verify urine output is > 30 mL/hr before infusion. Invert IV bag several times to mix thoroughly.',
    warningKu: 'مەترسیدارترین ئاگەهداری: ب چ رەنگان راستەوخۆ (IV Push) نەدە! دەستبەجێ دل ڕادوەستیت و نەخۆش دگریتە دەستێ مرنێ! هەمیشە د ناڤ موغەزیێ دا ب هێواشی بهێتە دان و پێدڤیە میزکرنا نەخۆشی پتر ژ ٣٠ مل/دەمژمێر بیت.',
    requiresDoubleCheck: true
  },
  {
    id: 'norepinephrine',
    nameEn: 'Norepinephrine (Levophed) Infusion (Septic Shock)',
    nameKu: 'نۆرئەپینێفرین (نۆرئەدرینالین / Levophed)',
    category: 'critical_infusion',
    defaultDose: 0.1,
    doseUnit: 'mcg/kg/min',
    concentration: '4 mg in 250 mL D5W (16 mcg/mL)',
    concentrationMgPerMl: 0.016,
    maxSafeDose: 'Usual titratable range: 0.01 - 3.0 mcg/kg/min to maintain Mean Arterial Pressure (MAP) ≥ 65 mmHg',
    maxSafeDoseNumeric: 3.0,
    warningEn: 'Potent peripheral vasoconstrictor. Central venous line administration strongly recommended to avoid extravasation necrosis. If peripheral extravasation occurs, immediately infiltrate area with Phentolamine 5-10 mg diluted in saline to prevent gangrene.',
    warningKu: 'لولپێچێن خوینێ ب توندی تەسک دکەت. باشترە ب دەمارێ سەرەکی (Central Line) بهێتە دان. ئەگەر ژ دەماری دەرکەفتە ناڤ گۆشتی، دەستبەجێ فێنتۆلامین (Phentolamine) لێ بدە دا کۆ گۆشت نەمریت (Necrosis).',
    antidoteOrReversalEn: 'Phentolamine (Regitine) 5 - 10 mg SC/local infiltration for extravasation',
    antidoteOrReversalKu: 'فێنتۆلامین ٥ - ١٠ مگم راستەوخۆ د ناڤ جهێ تەقیێ دا',
    requiresDoubleCheck: true
  },
  {
    id: 'dopamine',
    nameEn: 'Dopamine HCl IV Infusion (Cardiogenic / Septic Shock)',
    nameKu: 'دۆپامین ب دەمار (Dopamine IV Infusion)',
    category: 'critical_infusion',
    defaultDose: 5,
    doseUnit: 'mcg/kg/min',
    concentration: '400 mg in 250 mL D5W or NS (1,600 mcg/mL)',
    concentrationMgPerMl: 1.6,
    maxSafeDose: 'Range: 2 - 20 mcg/kg/min. Dosages > 20 mcg/kg/min cause severe vasoconstriction and tachyarrhythmias.',
    maxSafeDoseNumeric: 20,
    warningEn: 'Dose-dependent receptors: 2-5 mcg/kg/min (dopaminergic / renal vasodilation), 5-10 mcg/kg/min (Beta-1 inotropic), >10 mcg/kg/min (Alpha-1 vasoconstriction). Monitor continuous blood pressure and heart rate every 5-15 mins.',
    warningKu: 'ب گۆرەی هێزا دۆزێ کار دکەت: ٢-٥ (گولیچک)، ٥-١٠ (هێزدارکرنا لێدانا دلی)، پتر ژ ١٠ (تەسککرنا خوینبەرا). پێدڤیە پەستان و لێدانا دلی بەردەوام بهێنە چاڤدێریکرن.',
    antidoteOrReversalEn: 'Phentolamine 5 - 10 mg for local extravasation',
    antidoteOrReversalKu: 'فێنتۆلامین بۆ جهێ دەمار شکەستنێ',
    requiresDoubleCheck: true
  }
];

export const ClinicalDoseIVCalculator: React.FC = () => {
  const { lang } = useLanguage();
  const [calcMode, setCalcMode] = useState<'weight_dose' | 'iv_drip' | 'bsa' | 'high_alert'>('weight_dose');

  // --- Weight-Based State ---
  const [patientWeightKg, setPatientWeightKg] = useState<string>('70');
  const [dosePerKg, setDosePerKg] = useState<string>('15');
  const [doseUnit, setDoseUnit] = useState<'mg/kg' | 'mcg/kg' | 'units/kg'>('mg/kg');
  const [frequencyHours, setFrequencyHours] = useState<number>(8); // q8h
  const [drugAvailableMg, setDrugAvailableMg] = useState<string>('250');
  const [liquidVolumeMl, setLiquidVolumeMl] = useState<string>('5');
  const [maxAdultDailyMg, setMaxAdultDailyMg] = useState<string>('4000');

  // --- IV Drip Rate State ---
  const [ivVolumeMl, setIvVolumeMl] = useState<string>('1000');
  const [ivTimeHours, setIvTimeHours] = useState<string>('8');
  const [ivTimeMinutes, setIvTimeMinutes] = useState<string>('0');
  const [dropFactor, setDropFactor] = useState<number>(20); // 10, 15, 20, 60
  const [isReverseCalc, setIsReverseCalc] = useState<boolean>(false);
  const [directMlPerHour, setDirectMlPerHour] = useState<string>('125');

  // --- BSA State (Mosteller Formula) ---
  const [bsaHeightCm, setBsaHeightCm] = useState<string>('170');
  const [bsaWeightKg, setBsaWeightKg] = useState<string>('70');
  const [bsaDosePerM2, setBsaDosePerM2] = useState<string>('50');

  // --- High-Alert State ---
  const [selectedPresetId, setSelectedPresetId] = useState<string>('insulin_regular');
  const [haPatientWeightKg, setHaPatientWeightKg] = useState<string>('75');
  const [haCustomDose, setHaCustomDose] = useState<string>('0.1');

  // Weight-based calculation output
  const weightCalcResult = useMemo(() => {
    const weight = parseFloat(patientWeightKg);
    const dose = parseFloat(dosePerKg);
    const availMg = parseFloat(drugAvailableMg);
    const volMl = parseFloat(liquidVolumeMl);
    const maxDaily = parseFloat(maxAdultDailyMg);

    if (isNaN(weight) || weight <= 0 || isNaN(dose) || dose <= 0) {
      return null;
    }

    const singleDose = weight * dose;
    const dosesPerDay = frequencyHours > 0 ? 24 / frequencyHours : 1;
    const totalDailyDose = singleDose * dosesPerDay;

    let volumePerDoseMl: number | null = null;
    if (!isNaN(availMg) && availMg > 0 && !isNaN(volMl) && volMl > 0) {
      volumePerDoseMl = (singleDose * volMl) / availMg;
    }

    const isExceedingDailyMax = !isNaN(maxDaily) && maxDaily > 0 && totalDailyDose > maxDaily;

    return {
      singleDose: Math.round(singleDose * 100) / 100,
      totalDailyDose: Math.round(totalDailyDose * 100) / 100,
      dosesPerDay,
      volumePerDoseMl: volumePerDoseMl !== null ? Math.round(volumePerDoseMl * 100) / 100 : null,
      isExceedingDailyMax,
      maxDaily
    };
  }, [patientWeightKg, dosePerKg, frequencyHours, drugAvailableMg, liquidVolumeMl, maxAdultDailyMg]);

  // IV Drip calculation output
  const ivCalcResult = useMemo(() => {
    if (isReverseCalc) {
      const mlHr = parseFloat(directMlPerHour);
      if (isNaN(mlHr) || mlHr <= 0) return null;
      const gttMin = Math.round((mlHr * dropFactor) / 60);
      const secondsPerDrop = gttMin > 0 ? Math.round((60 / gttMin) * 10) / 10 : 0;
      return {
        mlHr: Math.round(mlHr),
        gttMin,
        secondsPerDrop,
        totalHours: null,
        totalMinutes: null
      };
    }

    const vol = parseFloat(ivVolumeMl);
    const hrs = parseFloat(ivTimeHours) || 0;
    const mins = parseFloat(ivTimeMinutes) || 0;
    const totalMinutes = hrs * 60 + mins;

    if (isNaN(vol) || vol <= 0 || totalMinutes <= 0) return null;

    const mlHr = Math.round((vol / (totalMinutes / 60)) * 10) / 10;
    const gttMin = Math.round((vol * dropFactor) / totalMinutes);
    const secondsPerDrop = gttMin > 0 ? Math.round((60 / gttMin) * 10) / 10 : 0;

    return {
      mlHr,
      gttMin,
      secondsPerDrop,
      totalMinutes,
      totalHours: Math.round((totalMinutes / 60) * 10) / 10
    };
  }, [ivVolumeMl, ivTimeHours, ivTimeMinutes, dropFactor, isReverseCalc, directMlPerHour]);

  // BSA Calculation output
  const bsaCalcResult = useMemo(() => {
    const height = parseFloat(bsaHeightCm);
    const weight = parseFloat(bsaWeightKg);
    const doseM2 = parseFloat(bsaDosePerM2);

    if (isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
      return null;
    }

    // Mosteller formula: sqrt((height * weight) / 3600)
    const bsa = Math.sqrt((height * weight) / 3600);
    const roundedBsa = Math.round(bsa * 100) / 100;
    const totalDose = !isNaN(doseM2) && doseM2 > 0 ? Math.round(roundedBsa * doseM2 * 10) / 10 : null;

    return {
      bsa: roundedBsa,
      totalDose
    };
  }, [bsaHeightCm, bsaWeightKg, bsaDosePerM2]);

  // High alert preset active
  const activePreset = HIGH_ALERT_PRESETS.find((p) => p.id === selectedPresetId) || HIGH_ALERT_PRESETS[0];

  const highAlertResult = useMemo(() => {
    const weight = parseFloat(haPatientWeightKg);
    const dose = parseFloat(haCustomDose);

    if (isNaN(weight) || weight <= 0 || isNaN(dose) || dose <= 0) {
      return null;
    }

    let calculatedRateMlHr: number | null = null;
    let totalDoseUnitsOrMgPerHour: number | null = null;

    if (activePreset.id === 'insulin_regular') {
      // dose is units/kg/hr. total = weight * dose. conc is 1 unit/mL
      totalDoseUnitsOrMgPerHour = weight * dose;
      calculatedRateMlHr = totalDoseUnitsOrMgPerHour / 1;
    } else if (activePreset.id === 'heparin_iv') {
      // dose is units/kg/hr. total = weight * dose. conc is 100 units/mL
      totalDoseUnitsOrMgPerHour = weight * dose;
      calculatedRateMlHr = totalDoseUnitsOrMgPerHour / 100;
    } else if (activePreset.id === 'norepinephrine') {
      // dose is mcg/kg/min. total mcg/min = weight * dose. total mcg/hr = weight * dose * 60
      // conc is 16 mcg/mL (4 mg in 250 mL)
      const mcgPerHr = weight * dose * 60;
      calculatedRateMlHr = mcgPerHr / 16;
      totalDoseUnitsOrMgPerHour = weight * dose;
    } else if (activePreset.id === 'dopamine') {
      // dose is mcg/kg/min. conc is 1,600 mcg/mL (400 mg in 250 mL)
      const mcgPerHr = weight * dose * 60;
      calculatedRateMlHr = mcgPerHr / 1600;
      totalDoseUnitsOrMgPerHour = weight * dose;
    } else if (activePreset.id === 'potassium_chloride') {
      // dose is mEq/hr. conc is 10 mEq in 100 mL -> 1 mEq = 10 mL
      calculatedRateMlHr = dose * 10;
      totalDoseUnitsOrMgPerHour = dose;
    }

    const isExceedingMax =
      activePreset.maxSafeDoseNumeric !== undefined && dose > activePreset.maxSafeDoseNumeric;

    return {
      rateMlHr: calculatedRateMlHr !== null ? Math.round(calculatedRateMlHr * 10) / 10 : null,
      totalDosePerHour: totalDoseUnitsOrMgPerHour !== null ? Math.round(totalDoseUnitsOrMgPerHour * 100) / 100 : null,
      isExceedingMax
    };
  }, [activePreset, haPatientWeightKg, haCustomDose]);

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-slate-900/90 rounded-2xl border border-cyan-500/30 p-5 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                Module 1 • Clinical Calculator
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                2026 ICU / Nursing Precision Engine
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <Calculator className="w-6 h-6 text-cyan-400" />
              <span>{lang === 'ku' ? 'هەژمارکەرێ هویرێ دۆزێن دەرمانان و دڵۆپێن دەماری (IV Drip)' : 'Clinical Dose & IV Drip Rate Calculator'}</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'ku'
                ? 'ئامیرێ کلینیکی یێ هویر بۆ هەژمارتنا دۆزێ ب کێشا لەشی (mg/kg)، روبەرێ لەشی (BSA)، تێکڕایا دڵۆپێن دەماری (gtt/min)، و ئاگەهداریێن دەرمانێن مەترسیدار ب پیڤەرێن ساخلەمیێ.'
                : 'Interactive clinical computation engine for patient weight-based dosing, BSA-derived protocols, micro/macrodrip IV infusion rates, and high-alert medication safeguards.'}
            </p>
          </div>

          {/* Calculator Mode Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            {[
              { id: 'weight_dose', labelEn: 'Weight Dose (mg/kg)', labelKu: 'دۆز ب کێشێ (mg/kg)', icon: <Scale className="w-3.5 h-3.5" /> },
              { id: 'iv_drip', labelEn: 'IV Drip (gtt/min)', labelKu: 'دڵۆپێن دەماری (gtt/min)', icon: <Droplet className="w-3.5 h-3.5" /> },
              { id: 'bsa', labelEn: 'BSA Body Surface', labelKu: 'روبەرێ لەشی (BSA)', icon: <Layers className="w-3.5 h-3.5" /> },
              { id: 'high_alert', labelEn: 'High-Alert Protocols', labelKu: 'دەرمانێن مەترسیدار', icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCalcMode(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  calcMode === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{lang === 'ku' ? tab.labelKu : tab.labelEn}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 1. WEIGHT-BASED DOSE CALCULATOR */}
      {calcMode === 'weight_dose' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                {lang === 'ku' ? 'زانیاریێن نەخۆشی و رێنمایا دۆزێ' : 'Patient Parameters & Prescription Order'}
              </span>
              <button
                onClick={() => {
                  setPatientWeightKg('70');
                  setDosePerKg('15');
                  setFrequencyHours(8);
                  setDrugAvailableMg('250');
                  setLiquidVolumeMl('5');
                }}
                className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-mono transition"
              >
                <RotateCcw className="w-3 h-3" />
                {lang === 'ku' ? 'ڤەگەڕاندن بۆ دەستپێکێ' : 'Reset Inputs'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Patient Weight */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold flex items-center justify-between">
                  <span>{lang === 'ku' ? 'کێشا نەخۆشی (Patient Weight):' : 'Patient Weight:'}</span>
                  <span className="text-cyan-400 font-mono font-bold">{patientWeightKg} kg</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="300"
                    value={patientWeightKg}
                    onChange={(e) => setPatientWeightKg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">kg</span>
                </div>
                {/* Quick weight presets */}
                <div className="flex items-center gap-1 pt-1">
                  {[
                    { label: '5 kg (Infant)', val: '5' },
                    { label: '20 kg (Child)', val: '20' },
                    { label: '50 kg', val: '50' },
                    { label: '70 kg (Adult)', val: '70' },
                    { label: '90 kg', val: '90' }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPatientWeightKg(p.val)}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 font-mono transition"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ordered Dose */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-semibold">
                    {lang === 'ku' ? 'دۆزێ پێدڤی بۆ هەر کیلۆیەکێ:' : 'Prescribed Dose per kg:'}
                  </label>
                  <select
                    value={doseUnit}
                    onChange={(e) => setDoseUnit(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 text-[10px] text-cyan-300 px-1.5 py-0.5 rounded font-mono focus:outline-none"
                  >
                    <option value="mg/kg">mg / kg</option>
                    <option value="mcg/kg">mcg / kg</option>
                    <option value="units/kg">Units / kg</option>
                  </select>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.01"
                    value={dosePerKg}
                    onChange={(e) => setDosePerKg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">{doseUnit}</span>
                </div>
              </div>

              {/* Dosing Frequency */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">
                  {lang === 'ku' ? 'دووبارەبوون (Frequency / Schedule):' : 'Dosing Frequency Schedule:'}
                </label>
                <select
                  value={frequencyHours}
                  onChange={(e) => setFrequencyHours(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value={6}>Every 6 Hours (q6h - 4 times/day)</option>
                  <option value={8}>Every 8 Hours (q8h - 3 times/day)</option>
                  <option value={12}>Every 12 Hours (q12h - 2 times/day)</option>
                  <option value={24}>Once Daily (q24h / OD - 1 time/day)</option>
                  <option value={0}>Single Stat Dose (Once only)</option>
                </select>
              </div>

              {/* Max Daily Adult Safe Limit */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold flex items-center justify-between">
                  <span>{lang === 'ku' ? 'بلندترین سنورێ رۆژانە (Max 24h):' : 'Max 24h Safe Limit:'}</span>
                  <span className="text-amber-400 text-[10px] font-mono">Safety Threshold</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={maxAdultDailyMg}
                    onChange={(e) => setMaxAdultDailyMg(e.target.value)}
                    placeholder="e.g. 4000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">mg/day</span>
                </div>
              </div>

              {/* Liquid Formulation / Suspension Strength */}
              <div className="sm:col-span-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <Syringe className="w-3.5 h-3.5 text-teal-400" />
                  {lang === 'ku' ? 'هێزا دەرمانێ بەردەست بۆ هەژمارتنا قەبارەی (Liquid / Suspension Volume Calculation):' : 'Liquid / Injection Concentration (For mL to Draw):'}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={drugAvailableMg}
                      onChange={(e) => setDrugAvailableMg(e.target.value)}
                      placeholder="e.g. 250"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                    />
                    <span className="absolute right-3 top-2 text-[10px] text-slate-400 font-mono">mg</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={liquidVolumeMl}
                      onChange={(e) => setLiquidVolumeMl(e.target.value)}
                      placeholder="e.g. 5"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                    />
                    <span className="absolute right-3 top-2 text-[10px] text-slate-400 font-mono">in mL</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  Formula: Dose Desired / Dose Available × Volume ({dosePerKg} × {patientWeightKg} / {drugAvailableMg} × {liquidVolumeMl} mL)
                </p>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950/30 rounded-2xl border border-teal-500/30 p-5 space-y-4 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  {lang === 'ku' ? 'ئەنجامێ هەژمارکری یێ دۆزێ' : 'Calculated Nursing Dosing Output'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold">
                  Verified Math
                </span>
              </div>

              {weightCalcResult ? (
                <div className="space-y-3">
                  {/* Single Dose Result */}
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-teal-500/40 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      {lang === 'ku' ? 'دۆزێ ئێک جارێ (Single Dose)' : 'Single Dose to Administer'}
                    </span>
                    <div className="text-3xl font-black text-cyan-300 font-mono tracking-tight">
                      {weightCalcResult.singleDose.toLocaleString()}{' '}
                      <span className="text-sm font-sans font-normal text-slate-400">{doseUnit.split('/')[0]}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      = {patientWeightKg} kg × {dosePerKg} {doseUnit}
                    </p>
                  </div>

                  {/* Volume to administer */}
                  {weightCalcResult.volumePerDoseMl !== null && (
                    <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-cyan-300 uppercase font-bold block">
                          {lang === 'ku' ? 'قەبارەیێ شل یێ دەرزیێ یان شروبی:' : 'Volume to Draw / Dispense:'}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          Based on {drugAvailableMg} mg / {liquidVolumeMl} mL
                        </span>
                      </div>
                      <div className="text-2xl font-black text-teal-300 font-mono">
                        {weightCalcResult.volumePerDoseMl}{' '}
                        <span className="text-xs font-sans text-slate-400">mL</span>
                      </div>
                    </div>
                  )}

                  {/* 24-Hour Total */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        {lang === 'ku' ? 'کۆما گشتی یا ٢٤ دەمژمێران:' : 'Total 24-Hour Daily Dose:'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {weightCalcResult.dosesPerDay} dose(s) per day
                      </span>
                    </div>
                    <div className="text-xl font-bold text-white font-mono">
                      {weightCalcResult.totalDailyDose.toLocaleString()}{' '}
                      <span className="text-xs font-sans text-slate-400">{doseUnit.split('/')[0]}/day</span>
                    </div>
                  </div>

                  {/* Safety Warning Check */}
                  {weightCalcResult.isExceedingDailyMax && (
                    <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/60 text-xs text-rose-200 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-rose-300 font-bold">
                          {lang === 'ku' ? 'ئاگەهدارییا مەترسیدار: دۆز ژ سنورێ رێپێدای دەرباز بوویە!' : 'CRITICAL WARNING: Exceeds Maximum Daily Dose!'}
                        </strong>
                        <span>
                          {lang === 'ku'
                            ? `کۆما گشتی یا رۆژانە (${weightCalcResult.totalDailyDose} mg) پترە ژ سنورێ دیارکری یێ ئەمان (${weightCalcResult.maxDaily} mg/day). فەرمانا نۆشداری دووبارە پشتڕاست بکە!`
                            : `Total daily dose (${weightCalcResult.totalDailyDose} mg) exceeds maximum threshold (${weightCalcResult.maxDaily} mg/day). Clarify order immediately with the prescriber.`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs">
                  {lang === 'ku' ? 'تکایە زانیاریێن دروست د ناڤ خانەیان دا بنڤیسە دا ئەنجام دیار ببیت.' : 'Please enter valid positive numbers to view calculation output.'}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                {lang === 'ku' ? 'یاسایێن زێڕین یێن پەرستاریێ (5 Rights)' : '5 Rights of Medication Safety'}
              </span>
              <span className="text-cyan-400 font-mono">Patient • Drug • Dose • Route • Time</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. IV DRIP RATE CALCULATOR */}
      {calcMode === 'iv_drip' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
                <Droplet className="w-4 h-4" />
                {lang === 'ku' ? 'پارامیتەرێن موغەزیێ و تێکڕایا دەماری' : 'Infusion Parameters & Tubing Drop Factor'}
              </span>
              <button
                onClick={() => setIsReverseCalc(!isReverseCalc)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-cyan-300 hover:border-cyan-500/50 font-mono transition"
              >
                {isReverseCalc
                  ? (lang === 'ku' ? 'هەژمارتن ب گۆرەی قەبارە و دەمی' : 'Mode: Volume & Time')
                  : (lang === 'ku' ? 'هەژمارتن ب گۆرەی خێراییا (mL/hr)' : 'Mode: Direct mL/hr')}
              </button>
            </div>

            {/* Drop Factor Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>{lang === 'ku' ? 'جورێ سۆندێ و ژمارا دڵۆپان د ئێک میللی دا (Drop Factor):' : 'Tubing Calibration (Drop Factor - gtt/mL):'}</span>
                <span className="text-cyan-400 font-mono font-bold">{dropFactor} gtt/mL</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { factor: 10, label: '10 gtt/mL', descEn: 'Blood tubing / Viscous', descKu: 'سۆندا خوینێ' },
                  { factor: 15, label: '15 gtt/mL', descEn: 'Abbott / Regular set', descKu: 'سۆندا ئاسایی' },
                  { factor: 20, label: '20 gtt/mL', descEn: 'Standard Baxter adult', descKu: 'سۆندا گشتی یا کەسێ مەزن' },
                  { factor: 60, label: '60 gtt/mL', descEn: 'Microdrip / Pediatric', descKu: 'مایکرۆدریپ (زارۆک / ICU)' }
                ].map((df) => (
                  <button
                    key={df.factor}
                    onClick={() => setDropFactor(df.factor)}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-0.5 ${
                      dropFactor === df.factor
                        ? 'bg-gradient-to-b from-cyan-950 to-slate-950 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span className="font-mono font-bold text-xs">{df.label}</span>
                    <span className="text-[9px] text-slate-400">{lang === 'ku' ? df.descKu : df.descEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {!isReverseCalc ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                {/* Total Volume */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">
                    {lang === 'ku' ? 'قەبارەیێ گشتی یێ موغەزیێ (Volume):' : 'Total Infusion Volume (mL):'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="50"
                      min="1"
                      value={ivVolumeMl}
                      onChange={(e) => setIvVolumeMl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">mL</span>
                  </div>
                  {/* Quick Volume presets */}
                  <div className="flex items-center gap-1 pt-1">
                    {['100', '250', '500', '1000'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setIvVolumeMl(v)}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400 hover:text-cyan-300 font-mono transition"
                      >
                        {v} mL
                      </button>
                    ))}
                  </div>
                </div>

                {/* Infusion Duration */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">
                    {lang === 'ku' ? 'دەمێ پێدڤی بۆ تەواوبوونێ (Duration):' : 'Infusion Time Duration:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="72"
                        value={ivTimeHours}
                        onChange={(e) => setIvTimeHours(e.target.value)}
                        placeholder="Hours"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">hrs</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={ivTimeMinutes}
                        onChange={(e) => setIvTimeMinutes(e.target.value)}
                        placeholder="Mins"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">mins</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pt-1">
                    {[
                      { l: '1 hr', h: '1', m: '0' },
                      { l: '4 hrs', h: '4', m: '0' },
                      { l: '8 hrs', h: '8', m: '0' },
                      { l: '12 hrs', h: '12', m: '0' },
                      { l: '24 hrs', h: '24', m: '0' }
                    ].map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIvTimeHours(t.h);
                          setIvTimeMinutes(t.m);
                        }}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400 hover:text-cyan-300 font-mono transition"
                      >
                        {t.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 text-xs">
                <label className="text-slate-300 font-semibold">
                  {lang === 'ku' ? 'خێراییا موغەزیێ ب میللی د دەمژمێرەکێ دا (mL/hr):' : 'Direct Infusion Rate Ordered (mL / hr):'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="5"
                    min="1"
                    value={directMlPerHour}
                    onChange={(e) => setDirectMlPerHour(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">mL / hr</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  Formula: Rate (mL/hr) × Drop Factor (gtt/mL) ÷ 60 minutes = Drops per minute (gtt/min)
                </p>
              </div>
            )}
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 rounded-2xl border border-cyan-500/30 p-5 space-y-4 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-cyan-400" />
                  {lang === 'ku' ? 'ئەنجامێ خێراییا دڵۆپان' : 'IV Flow & Drip Rate Output'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                  Clinical Math
                </span>
              </div>

              {ivCalcResult ? (
                <div className="space-y-3">
                  {/* Primary: Drops per minute */}
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      {lang === 'ku' ? 'ژمارا دڵۆپان د خولەکەکێ دا (Drops per Minute)' : 'IV Drip Rate (Gravity Infusion)'}
                    </span>
                    <div className="text-4xl font-black text-cyan-300 font-mono tracking-tight flex items-center justify-center gap-2">
                      <span>{ivCalcResult.gttMin}</span>
                      <span className="text-sm font-sans font-normal text-slate-400">gtt / min</span>
                    </div>
                    {/* Visual Pulse Metronome */}
                    <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                      <span>
                        {lang === 'ku'
                          ? `ئێک دڵۆپ هەر ${ivCalcResult.secondsPerDrop} چرکان`
                          : `Approx. 1 drop every ${ivCalcResult.secondsPerDrop} seconds`}
                      </span>
                    </div>
                  </div>

                  {/* Flow Rate in mL/hr */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        {lang === 'ku' ? 'تێکڕایێ پەمپێ ئەلیکترۆنی (Pump Setting):' : 'Electronic Infusion Pump Setting:'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Volumetric flow rate
                      </span>
                    </div>
                    <div className="text-2xl font-black text-white font-mono">
                      {ivCalcResult.mlHr}{' '}
                      <span className="text-xs font-sans text-slate-400">mL / hr</span>
                    </div>
                  </div>

                  {/* Total duration check */}
                  {ivCalcResult.totalHours !== null && (
                    <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5 font-mono">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {lang === 'ku' ? 'دەواما گشتی:' : 'Total Infusion Time:'}
                      </span>
                      <span className="text-cyan-300 font-mono font-bold">
                        {ivCalcResult.totalHours} hrs ({ivCalcResult.totalMinutes} mins)
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs">
                  {lang === 'ku' ? 'تکایە زانیاریێن دروست بنڤیسە دا خێراییا دڵۆپان بهێتە دیارکرن.' : 'Please enter valid positive values for volume and duration.'}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 leading-relaxed font-sans">
              <strong className="text-cyan-300 block mb-0.5">Clinical Protocol Note:</strong>
              {lang === 'ku'
                ? 'پێدڤیە سۆندا موغەزیێ هەر ٧٢ بۆ ٩٦ دەمژمێران بهێتە گوهۆڕین. بۆ دەرمانێن لەزگین و تەنگاڤیا (ICU)، هەمیشە ئامیرێ ئەلیکترۆنی یێ پەمپێ بکاربینە نەوکێ دڵۆپێن ب دەست.'
                : 'Replace standard IV administration sets every 72 to 96 hours. High-alert infusions and vasoactive medications must ALWAYS be administered via calibrated electronic smart pumps.'}
            </div>
          </div>
        </div>
      )}

      {/* 3. BODY SURFACE AREA (BSA) CALCULATOR */}
      {calcMode === 'bsa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                {lang === 'ku' ? 'هەژمارکرنا روبەرێ لەشی (Mosteller Formula)' : 'Body Surface Area (BSA) Computation'}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Formula: √((Height × Weight) ÷ 3600)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Patient Height */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">
                  {lang === 'ku' ? 'درێژاهیا نەخۆشی (Height):' : 'Patient Height (cm):'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="30"
                    max="250"
                    value={bsaHeightCm}
                    onChange={(e) => setBsaHeightCm(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">cm</span>
                </div>
              </div>

              {/* Patient Weight */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">
                  {lang === 'ku' ? 'کێشا نەخۆشی (Weight):' : 'Patient Weight (kg):'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="300"
                    value={bsaWeightKg}
                    onChange={(e) => setBsaWeightKg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">kg</span>
                </div>
              </div>

              {/* Dose in mg/m2 */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-slate-300 font-semibold">
                  {lang === 'ku' ? 'دۆزێ پێدڤی بۆ هەر مەترە چوارگۆشەکا لەشی (Dose in mg/m²):' : 'Prescribed Dose per m² (mg / m²):'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="0.1"
                    value={bsaDosePerM2}
                    onChange={(e) => setBsaDosePerM2(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">mg / m²</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  Commonly used for chemotherapy agents (e.g. Cisplatin, Doxorubicin) and specialized pediatric protocols.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/30 rounded-2xl border border-indigo-500/30 p-5 space-y-4 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  {lang === 'ku' ? 'روبەرێ لەشی و دۆزێ هاتیە دەر' : 'BSA Clinical Calculation Result'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
                  Mosteller Equation
                </span>
              </div>

              {bsaCalcResult ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-indigo-500/40 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      {lang === 'ku' ? 'روبەرێ سەرڕوویێ لەشێ نەخۆشی (BSA)' : 'Patient Body Surface Area'}
                    </span>
                    <div className="text-4xl font-black text-indigo-300 font-mono tracking-tight">
                      {bsaCalcResult.bsa}{' '}
                      <span className="text-sm font-sans font-normal text-slate-400">m²</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Average adult reference: ~1.7 to 1.9 m²
                    </p>
                  </div>

                  {bsaCalcResult.totalDose !== null && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          {lang === 'ku' ? 'کۆما دۆزێ یا تەواو:' : 'Total Calculated Dose:'}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {bsaCalcResult.bsa} m² × {bsaDosePerM2} mg/m²
                        </span>
                      </div>
                      <div className="text-2xl font-black text-teal-300 font-mono">
                        {bsaCalcResult.totalDose}{' '}
                        <span className="text-xs font-sans text-slate-400">mg</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs">
                  {lang === 'ku' ? 'درێژاهی و کێشێ بنڤیسە دا روبەرێ لەشی بهێتە پێڤان.' : 'Enter height and weight to calculate BSA.'}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 leading-relaxed font-sans">
              {lang === 'ku'
                ? 'روبەرێ لەشی زۆر هویرترە ژ تەنێ کێشێ بۆ دەرمانێن پەنچەشێرێ و دەرمانێن توند یێن گولیچکان چونکی قەبارەیێ شلێن لەشی باشتر دیار دکەت.'
                : 'Body Surface Area reflects metabolic mass more accurately than body weight alone. Essential for oncologic regimens and pediatric low-therapeutic-index therapeutics.'}
            </div>
          </div>
        </div>
      )}

      {/* 4. HIGH-ALERT MEDICATION PROTOCOLS */}
      {calcMode === 'high_alert' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Preset Selector & Details */}
          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                {lang === 'ku' ? 'دەرمانێن مەترسیدار یێن نەخۆشخانێ (High-Alert Safeguards)' : 'High-Alert Drug Infusion Calculator'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                Double RN Check Required
              </span>
            </div>

            {/* Presets List */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                {lang === 'ku' ? 'دەرمانێ مەترسیدار هەلبژێرە:' : 'Select High-Alert Drug Protocol:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {HIGH_ALERT_PRESETS.map((p) => {
                  const isSelected = selectedPresetId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPresetId(p.id);
                        setHaCustomDose(String(p.defaultDose));
                      }}
                      className={`p-3 rounded-xl border text-start transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-rose-950/40 border-rose-500/80 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-xs block text-white line-clamp-1">
                          {p.nameEn}
                        </span>
                        <span className="text-[10px] text-amber-300/90 font-sans block line-clamp-1">
                          {p.nameKu}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400 pt-1">
                        Standard: {p.defaultDose} {p.doseUnit}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Parameters for active drug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">
                  {lang === 'ku' ? 'کێشا نەخۆشی (kg):' : 'Patient Weight (kg):'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={haPatientWeightKg}
                  onChange={(e) => setHaPatientWeightKg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold flex items-center justify-between">
                  <span>{lang === 'ku' ? 'دۆزێ فەرمانپێکری:' : 'Ordered Infusion Rate:'}</span>
                  <span className="text-rose-400 font-mono font-bold">{activePreset.doseUnit}</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={haCustomDose}
                  onChange={(e) => setHaCustomDose(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Standard Hospital Concentration */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold">
                {lang === 'ku' ? 'خەستییا باوەرپێکری یا نەخۆشخانێ:' : 'Standard Premixed Bag Concentration:'}
              </span>
              <p className="text-cyan-300 font-mono text-xs">
                {activePreset.concentration}
              </p>
            </div>
          </div>

          {/* Results & Critical Warnings Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950/40 rounded-2xl border border-rose-500/40 p-5 space-y-4 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-rose-400" />
                  {lang === 'ku' ? 'خێراییا پەمپێ و رێکارێن پاراستنێ' : 'Pump Rate & Safety Safeguards'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                  HIGH ALERT
                </span>
              </div>

              {highAlertResult && highAlertResult.rateMlHr !== null && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-rose-500/50 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      {lang === 'ku' ? 'خێراییا ئامیرێ پەمپێ (Infusion Pump Rate)' : 'Electronic Infusion Pump Flow Rate'}
                    </span>
                    <div className="text-3xl font-black text-rose-300 font-mono tracking-tight">
                      {highAlertResult.rateMlHr}{' '}
                      <span className="text-sm font-sans font-normal text-slate-400">mL / hr</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Total dose: {highAlertResult.totalDosePerHour} {activePreset.doseUnit.split('/')[0]}/hr
                    </p>
                  </div>

                  {/* Max safe threshold indicator */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <span className="text-[10px] text-amber-400 uppercase font-bold block">
                      {lang === 'ku' ? 'بلندترین سنورێ ئەمان (Max Safe Dose):' : 'Max Safe Clinical Limit:'}
                    </span>
                    <p className="text-slate-300 text-xs">
                      {activePreset.maxSafeDose}
                    </p>
                  </div>

                  {/* Warning Callout */}
                  <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/70 text-xs space-y-1.5 text-rose-100">
                    <div className="flex items-center gap-1.5 font-bold text-rose-300">
                      <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      <span>{lang === 'ku' ? 'ئاگەهدارییا کلینیکی یا گرنگ:' : 'Mandatory Clinical Practice Alert:'}</span>
                    </div>
                    <p className="leading-relaxed font-sans text-[11px]">
                      {lang === 'ku' ? activePreset.warningKu : activePreset.warningEn}
                    </p>
                  </div>

                  {/* Antidote / Reversal Callout */}
                  {activePreset.antidoteOrReversalEn && (
                    <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-xs space-y-1 text-emerald-100">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-300 text-[11px]">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{lang === 'ku' ? 'دژەدەرمان / چارەسەریا بلەز (Antidote):' : 'Antidote & Reversal Readiness:'}</span>
                      </div>
                      <p className="text-[11px] font-sans">
                        {lang === 'ku' ? activePreset.antidoteOrReversalKu : activePreset.antidoteOrReversalEn}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Independent Double-Check Required</span>
              <span className="text-rose-400 font-mono font-bold">Sign-off: 2 Registered Nurses</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
