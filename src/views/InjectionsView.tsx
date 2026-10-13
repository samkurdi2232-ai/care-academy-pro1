import React, { useState } from 'react';
import { INJECTION_SITES, IV_CANNULA_GAUGES, InjectionSite, IVCannulaGauge } from '../data/injections';
import { useLanguage } from '../context/LanguageContext';
import {
  Syringe,
  MapPin,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Compass,
  Layers,
  Sparkles,
  Info,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const InjectionsView: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedSiteId, setSelectedSiteId] = useState<string>(INJECTION_SITES[0].id);
  const [activeTab, setActiveTab] = useState<'sites' | 'cannulas'>('sites');

  const selectedSite =
    INJECTION_SITES.find((s) => s.id === selectedSiteId) || INJECTION_SITES[0];

  return (
    <div className="w-full h-full flex flex-col p-3 sm:p-5 overflow-y-auto space-y-4">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/90 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Syringe className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-black text-white">{t('injections_title')}</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-semibold border border-cyan-500/30">
              IM / SC / ID / IV
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">{t('injections_subtitle')}</p>
        </div>

        {/* View Switcher: Sites vs IV Cannulas */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('sites')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'sites'
                ? 'bg-cyan-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ku' ? 'جهێن دەرزیان (Sites)' : 'Injection Sites'}
          </button>
          <button
            onClick={() => setActiveTab('cannulas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'cannulas'
                ? 'bg-cyan-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ku' ? 'کانیۆلا دەماری (IV Cannulas)' : 'IV Cannula Gauges'}
          </button>
        </div>
      </div>

      {/* SITES SECTION */}
      {activeTab === 'sites' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* SITES LIST & ANATOMICAL OVERVIEW */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800/80 space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ku' ? 'هەلبژارتنا رێکا لێدانێ:' : 'Select Injection Route:'}</span>
              </span>

              <div className="space-y-2">
                {INJECTION_SITES.map((site) => {
                  const isSelected = site.id === selectedSite.id;
                  return (
                    <button
                      key={site.id}
                      onClick={() => setSelectedSiteId(site.id)}
                      className={`w-full p-3 rounded-xl text-start transition border flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-950/70 to-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              site.angleDegree === 90
                                ? 'bg-rose-400'
                                : site.angleDegree === 45
                                ? 'bg-amber-400'
                                : 'bg-emerald-400'
                            }`}
                          />
                          <span>{lang === 'ku' ? site.nameKu : site.nameEn}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {site.route.toUpperCase()} · {site.angleDegree}° Angle · {site.needleGauge}
                        </div>
                      </div>

                      <div className="text-end">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-mono">
                          {site.maxVolumeMl} mL
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual Needle Angle Diagram Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 text-center space-y-3">
              <span className="text-xs font-bold text-slate-300">
                {t('angle_gauge')}
              </span>
              <div className="flex items-center justify-around gap-2 p-3 bg-slate-900/90 rounded-xl border border-slate-800/80">
                {[
                  { angle: '90°', label: 'IM', color: 'text-rose-400' },
                  { angle: '45°', label: 'Sub-Q', color: 'text-amber-400' },
                  { angle: '25°', label: 'IV', color: 'text-blue-400' },
                  { angle: '10-15°', label: 'ID', color: 'text-emerald-400' }
                ].map((item) => (
                  <div key={item.label} className="text-center space-y-1">
                    <span className={`text-base font-black ${item.color} font-mono`}>
                      {item.angle}
                    </span>
                    <div className="text-[10px] text-slate-400 font-mono">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SITES DETAILED CLINICAL PROTOCOL */}
          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-semibold uppercase">
                  {selectedSite.route.toUpperCase()} ({selectedSite.angleDegree}°)
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {lang === 'ku' ? selectedSite.nameKu : selectedSite.nameEn}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                  <span className="text-slate-500">Gauge: </span>
                  <span className="text-cyan-400 font-bold">{selectedSite.needleGauge}</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                  <span className="text-slate-500">Max: </span>
                  <span className="text-amber-400 font-bold">{selectedSite.maxVolumeMl} mL</span>
                </div>
              </div>
            </div>

            {/* Landmarks */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{t('landmarks')}</span>
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                {(lang === 'ku'
                  ? selectedSite.anatomicalLandmarksKu
                  : selectedSite.anatomicalLandmarksEn
                ).map((lm, i) => (
                  <li key={i} className="leading-relaxed">
                    {lm}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technique */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>{t('clinical_technique')}</span>
              </h4>
              <p className="text-xs text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
                {lang === 'ku' ? selectedSite.clinicalTechniqueKu : selectedSite.clinicalTechniqueEn}
              </p>
            </div>

            {/* Target Drugs */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>{t('preferred_drugs')}</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(lang === 'ku'
                  ? selectedSite.preferredDrugsKu
                  : selectedSite.preferredDrugsEn
                ).map((drug, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200"
                  >
                    {drug}
                  </span>
                ))}
              </div>
            </div>

            {/* Precautions */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>{t('nursing_precautions')}</span>
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-xs text-rose-200">
                {(lang === 'ku'
                  ? selectedSite.nursingPrecautionsKu
                  : selectedSite.nursingPrecautionsEn
                ).map((pre, i) => (
                  <li key={i} className="leading-relaxed">
                    {pre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* IV CANNULAS TABLE SECTION */}
      {activeTab === 'cannulas' && (
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">{t('cannula_gauges_table')}</h3>
              <p className="text-xs text-slate-400">
                {lang === 'ku'
                  ? 'رێزبەندیا ستاندارد یا رەنگ و قەبارێن کانیۆلا د ناڤ دەمار دا ب پێی خێراییا شلەیێ'
                  : 'Standardized color coding and clinical flow rate indications for peripheral IV cannulas'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80">
                  <th className="p-3 text-start">{lang === 'ku' ? 'قەبارە (Gauge)' : 'Gauge'}</th>
                  <th className="p-3 text-start">{lang === 'ku' ? 'رەنگ' : 'Color'}</th>
                  <th className="p-3 text-start">{t('flow_rate')}</th>
                  <th className="p-3 text-start">{lang === 'ku' ? 'درێژاهی' : 'Length'}</th>
                  <th className="p-3 text-start">{t('primary_indications')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {IV_CANNULA_GAUGES.map((can) => (
                  <tr key={can.gauge} className="hover:bg-slate-800/30 transition">
                    <td className="p-3 font-mono font-bold text-white">
                      {can.gauge}G
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: can.hexColor }}
                        />
                        <span className="font-semibold text-slate-200">
                          {lang === 'ku' ? can.colorNameKu : can.colorNameEn}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-cyan-400 font-bold">
                      {can.flowRateMlMin} mL/min
                    </td>
                    <td className="p-3 font-mono text-slate-400">
                      {can.lengthMm} mm
                    </td>
                    <td className="p-3 text-slate-300 max-w-md leading-relaxed">
                      {lang === 'ku' ? can.primaryIndicationsKu : can.primaryIndicationsEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
