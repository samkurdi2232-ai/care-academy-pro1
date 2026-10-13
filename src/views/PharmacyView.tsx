import React, { useState, useMemo } from 'react';
import {
  DRUGS,
  DrugData,
  DrugForm,
  DrugCategory,
  DRUG_CATEGORIES
} from '../data/pharmacy';
import {
  EMERGENCY_DRUGS,
  EMERGENCY_PROTOCOLS,
  EmergencyDrug,
  EmergencyProtocol
} from '../data/emergencyProtocols';
import { ORGANS } from '../data/organs';
import { useLanguage } from '../context/LanguageContext';
import { PillViewer3D } from '../components/pharmacy/PillViewer3D';
import { DoseCalculator } from '../components/pharmacy/DoseCalculator';
import { PharmacyInteractionChecker } from '../components/pharmacy/PharmacyInteractionChecker';
import { EmergencyProtocolsHub } from '../components/emergency/EmergencyProtocolsHub';
import {
  Search,
  Pill,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  Clock,
  Target,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Heart,
  Droplet,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
  Activity,
  Flame,
  ShieldAlert,
  ChevronRight,
  Stethoscope,
  Syringe,
  Wind,
  Layers,
  AlertOctagon,
  Eye,
  Box
} from 'lucide-react';

interface PharmacyViewProps {
  initialDrugId?: string | null;
  onNavigateToOrgan?: (organId: string) => void;
}

export const PharmacyView: React.FC<PharmacyViewProps> = ({
  initialDrugId,
  onNavigateToOrgan
}) => {
  const { t, lang } = useLanguage();
  const [sectionTab, setSectionTab] = useState<'emergency_protocols' | 'emergency_drugs' | 'formulary'>('formulary');

  // Emergency protocols & drugs selection
  const [selectedProtocolId, setSelectedProtocolId] = useState<string>(EMERGENCY_PROTOCOLS[0].id);
  const [selectedEmergDrugId, setSelectedEmergDrugId] = useState<string>(EMERGENCY_DRUGS[0].id);

  // Formulary search & selection
  type DeliveryGroup = 'all' | 'oral' | 'liquids' | 'injectables' | 'topical' | 'emergency';
  const [deliveryGroup, setDeliveryGroup] = useState<DeliveryGroup>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DrugCategory | 'all'>('all');
  const [selectedForm, setSelectedForm] = useState<DrugForm | 'all'>('all');
  const [selectedDrugId, setSelectedDrugId] = useState<string>(initialDrugId || DRUGS[0].id);
  const [show3DViewer, setShow3DViewer] = useState<boolean>(true);

  const selectedProtocol =
    EMERGENCY_PROTOCOLS.find((p) => p.id === selectedProtocolId) || EMERGENCY_PROTOCOLS[0];
  const selectedEmergDrug =
    EMERGENCY_DRUGS.find((d) => d.id === selectedEmergDrugId) || EMERGENCY_DRUGS[0];

  // Saved medications in localStorage
  const [savedDrugIds, setSavedDrugIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('care_saved_medications');
      return saved ? JSON.parse(saved) : ['paracetamol', 'adrenaline', 'amoxicillin_clav'];
    } catch {
      return ['paracetamol', 'adrenaline', 'amoxicillin_clav'];
    }
  });

  const toggleSaveDrug = (id: string) => {
    setSavedDrugIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id];
      try {
        localStorage.setItem('care_saved_medications', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Delivery group counts
  const deliveryGroupCounts = useMemo(() => {
    return {
      all: DRUGS.length,
      oral: DRUGS.filter((d) => d.form === 'tablet' || d.form === 'capsule').length,
      liquids: DRUGS.filter((d) => d.form === 'syrup').length,
      injectables: DRUGS.filter((d) => d.form === 'injection' || d.form === 'iv_infusion').length,
      topical: DRUGS.filter((d) => d.form === 'ointment' || d.form === 'drops' || d.category === 'topical').length,
      emergency: DRUGS.filter((d) => d.category === 'emergency').length
    };
  }, []);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: DRUGS.length };
    DRUG_CATEGORIES.forEach((cat) => {
      counts[cat.id] = DRUGS.filter((d) => d.category === cat.id).length;
    });
    return counts;
  }, []);

  // Filtered drugs
  const filteredDrugs = useMemo(() => {
    return DRUGS.filter((drug) => {
      // 1. Delivery group check
      if (deliveryGroup === 'oral' && !(drug.form === 'tablet' || drug.form === 'capsule')) return false;
      if (deliveryGroup === 'liquids' && drug.form !== 'syrup') return false;
      if (deliveryGroup === 'injectables' && !(drug.form === 'injection' || drug.form === 'iv_infusion')) return false;
      if (deliveryGroup === 'topical' && !(drug.form === 'ointment' || drug.form === 'drops' || drug.category === 'topical')) return false;
      if (deliveryGroup === 'emergency' && drug.category !== 'emergency') return false;

      // 2. Category check
      const matchesCategory = selectedCategory === 'all' || drug.category === selectedCategory;
      if (!matchesCategory) return false;

      // 3. Exact form check
      const matchesForm = selectedForm === 'all' || drug.form === selectedForm;
      if (!matchesForm) return false;

      // 4. Real-time dynamic search
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        drug.name.toLowerCase().includes(q) ||
        drug.nameKu.toLowerCase().includes(q) ||
        (drug.nameAr && drug.nameAr.toLowerCase().includes(q)) ||
        (drug.brandNamesEn && drug.brandNamesEn.toLowerCase().includes(q)) ||
        (drug.brandNamesKu && drug.brandNamesKu.toLowerCase().includes(q)) ||
        (drug.route && drug.route.toLowerCase().includes(q)) ||
        drug.strength.toLowerCase().includes(q) ||
        drug.useKu.toLowerCase().includes(q) ||
        drug.useEn.toLowerCase().includes(q) ||
        drug.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedForm, selectedCategory, deliveryGroup]);

  const selectedDrug = DRUGS.find((d) => d.id === selectedDrugId) || DRUGS[0];
  const isSaved = savedDrugIds.includes(selectedDrug.id);

  const getPregnancyBadge = (status: 'safe' | 'caution' | 'unsafe') => {
    switch (status) {
      case 'safe':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          label: t('pregnancy_safe'),
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        };
      case 'caution':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          label: t('pregnancy_caution'),
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />
        };
      case 'unsafe':
      default:
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          label: t('pregnancy_unsafe'),
          icon: <XCircle className="w-4 h-4 text-rose-400" />
        };
    }
  };

  const getCategoryMeta = (catId: DrugCategory) => {
    return DRUG_CATEGORIES.find((c) => c.id === catId) || DRUG_CATEGORIES[0];
  };

  return (
    <div className="w-full h-full flex flex-col p-3 sm:p-5 overflow-y-auto space-y-4">
      {/* Top Banner with Section Tabs */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/90 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white">{t('pharmacy_emergency_title')}</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold">
              90+ Essential Drugs
            </span>
          </div>
          <p className="text-xs text-slate-400">{t('pharmacy_emergency_subtitle')}</p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
          {[
            { id: 'formulary', label: t('formulary_tab'), icon: <Pill className="w-3.5 h-3.5" /> },
            { id: 'emergency_protocols', label: t('emergency_protocols_tab'), icon: <Activity className="w-3.5 h-3.5" /> },
            { id: 'emergency_drugs', label: t('emergency_drugs_tab'), icon: <Zap className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSectionTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                sectionTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. MASTER FORMULARY & CLINICAL MONOGRAPHS */}
      {sectionTab === 'formulary' && (
        <div className="space-y-4">
          {/* Quick Route & Delivery Category Tabs */}
          <div className="p-3 bg-slate-900/95 rounded-2xl border border-cyan-500/30 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-cyan-400" />
                {lang === 'ku' ? 'پۆلێن سەرەکی یێن شێوازێ دەرمانان (Medication Delivery Forms):' : 'Comprehensive Clinical Categories & Formats:'}
              </span>
              <span className="text-[11px] font-mono text-cyan-300">
                {filteredDrugs.length} {lang === 'ku' ? 'دەرمان بەردەستن' : 'Medications'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                {
                  id: 'all',
                  labelEn: 'All Medications',
                  labelKu: 'هەمی دەرمان',
                  count: deliveryGroupCounts.all,
                  icon: <Layers className="w-4 h-4" />,
                  activeClass: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                },
                {
                  id: 'oral',
                  labelEn: 'Oral (Tabs & Caps)',
                  labelKu: 'دەڤکی (حەب و کەپسول)',
                  count: deliveryGroupCounts.oral,
                  icon: <Pill className="w-4 h-4" />,
                  activeClass: 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold border-teal-400 shadow-md shadow-teal-500/20'
                },
                {
                  id: 'liquids',
                  labelEn: 'Liquids & Syrups',
                  labelKu: 'شەربەت و شروب',
                  count: deliveryGroupCounts.liquids,
                  icon: <Droplet className="w-4 h-4" />,
                  activeClass: 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                },
                {
                  id: 'injectables',
                  labelEn: 'Injectables (IV/IM/SC)',
                  labelKu: 'دەرزی و موغەزی',
                  count: deliveryGroupCounts.injectables,
                  icon: <Syringe className="w-4 h-4" />,
                  activeClass: 'bg-gradient-to-r from-rose-500 to-pink-500 text-slate-950 font-bold border-rose-400 shadow-md shadow-rose-500/20'
                },
                {
                  id: 'topical',
                  labelEn: 'Topical & Drops',
                  labelKu: 'مەلھەم، کرێم و قەترە',
                  count: deliveryGroupCounts.topical,
                  icon: <Sparkles className="w-4 h-4" />,
                  activeClass: 'bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 font-bold border-sky-400 shadow-md shadow-sky-500/20'
                },
                {
                  id: 'emergency',
                  labelEn: 'Emergency & ICU',
                  labelKu: 'دەرمانێن تەنگاڤیا و ICU',
                  count: deliveryGroupCounts.emergency,
                  icon: <Zap className="w-4 h-4" />,
                  activeClass: 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold border-red-400 shadow-md shadow-red-500/30'
                }
              ].map((tab) => {
                const isActive = deliveryGroup === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setDeliveryGroup(tab.id as any);
                      setSelectedForm('all');
                    }}
                    className={`p-2.5 rounded-xl border text-xs flex flex-col items-center justify-center gap-1 transition ${
                      isActive
                        ? tab.activeClass
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {tab.icon}
                      <span className="font-bold text-xs">{lang === 'ku' ? tab.labelKu : tab.labelEn}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-black/30 text-white font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      {tab.count} {lang === 'ku' ? 'دەرمان' : 'drugs'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter Pills (11 Clinical Classes) */}
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                {lang === 'ku' ? `پۆلێنکرنا کلینیکی یا دەرمانان (${DRUG_CATEGORIES.length} پۆلێن سەرەکی):` : `Master Drug Categories (${DRUG_CATEGORIES.length} Clinical Classes):`}
              </span>
              <span className="font-mono text-[11px] text-amber-400">
                {DRUGS.length} {lang === 'ku' ? 'دەرمانێن پێدڤی' : 'Essential Medications'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                  selectedCategory === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{lang === 'ku' ? 'هەمی پۆلێن دەرمانان' : 'All Classes'}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 font-mono">
                  {categoryCounts.all}
                </span>
              </button>

              {DRUG_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{lang === 'ku' ? cat.nameKu : cat.nameEn}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/70 font-mono">
                      {categoryCounts[cat.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* LEFT: Drug Directory & Search */}
            <div className="w-full lg:w-1/3 flex flex-col bg-slate-900/80 rounded-2xl border border-slate-800/80 p-4 space-y-3 shadow-xl">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchDrug')}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Drug Form Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
                {[
                  { id: 'all', label: t('filter_all') },
                  { id: 'tablet', label: t('filter_tablet') },
                  { id: 'capsule', label: t('filter_capsule') },
                  { id: 'injection', label: t('filter_injection') },
                  { id: 'syrup', label: t('filter_syrup') },
                  { id: 'inhaler', label: t('filter_inhaler') },
                  { id: 'ointment', label: t('filter_ointment') },
                  { id: 'drops', label: t('filter_drops') },
                  { id: 'suppository', label: t('filter_suppository') },
                  { id: 'iv_infusion', label: t('filter_iv_infusion') }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedForm(f.id as any)}
                    className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
                      selectedForm === f.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-between px-1">
                <span>{filteredDrugs.length} {lang === 'ku' ? 'دەرمان هاتنە دیتن' : 'medications found'}</span>
                {savedDrugIds.length > 0 && (
                  <span className="text-amber-400 font-mono">
                    {savedDrugIds.length} {lang === 'ku' ? 'خەزنکری' : 'saved'}
                  </span>
                )}
              </div>

              {/* Drug List Items */}
              <div className="space-y-2 overflow-y-auto max-h-[580px] pr-1">
                {filteredDrugs.map((drug) => {
                  const isSelected = selectedDrug.id === drug.id;
                  const catMeta = getCategoryMeta(drug.category);
                  const isDrugSaved = savedDrugIds.includes(drug.id);

                  return (
                    <button
                      key={drug.id}
                      onClick={() => setSelectedDrugId(drug.id)}
                      className={`w-full p-3 rounded-xl text-start transition border flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-950/60 to-slate-900 border-amber-500/80 shadow-md text-white'
                          : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: catMeta.color }}
                          />
                          <span className="text-xs font-bold text-white line-clamp-1">
                            {drug.name}
                          </span>
                          {isDrugSaved && (
                            <BookmarkCheck className="w-3 h-3 text-amber-400 flex-shrink-0" />
                          )}
                        </div>

                        <div className="text-[10px] text-slate-400 line-clamp-1 font-sans">
                          {lang === 'ku' ? drug.nameKu : drug.strength}
                        </div>

                        {drug.brandNamesEn && (
                          <div className="text-[9px] text-cyan-400/90 font-mono line-clamp-1">
                            {drug.brandNamesEn}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-amber-300 font-mono">
                          {drug.strength}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 uppercase font-mono">
                          {drug.form}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Exhaustive Clinical Drug Monograph */}
            <div className="w-full lg:w-2/3 bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
              {/* Header: Names, Category, Badges, Bookmark & 3D Toggle */}
              <div className="border-b border-slate-800 pb-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-white font-bold"
                      style={{ backgroundColor: `${getCategoryMeta(selectedDrug.category).color}33`, color: getCategoryMeta(selectedDrug.category).color }}
                    >
                      {lang === 'ku' ? getCategoryMeta(selectedDrug.category).nameKu : getCategoryMeta(selectedDrug.category).nameEn}
                    </span>

                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono uppercase">
                      {selectedDrug.form}
                    </span>

                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-mono">
                      {selectedDrug.strength}
                    </span>

                    {selectedDrug.route && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                        {selectedDrug.route}
                      </span>
                    )}

                    {/* Pregnancy Badge */}
                    {(() => {
                      const badge = getPregnancyBadge(selectedDrug.pregnancyStatus);
                      return (
                        <span className={`px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.bg}`}>
                          {badge.icon}
                          <span className="text-[10px] font-semibold">{badge.label}</span>
                        </span>
                      );
                    })()}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShow3DViewer(!show3DViewer)}
                      className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                        show3DViewer
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Box className="w-3.5 h-3.5" />
                      <span>{show3DViewer ? (lang === 'ku' ? 'شاردنا مۆدێلێ 3D' : 'Hide 3D') : (lang === 'ku' ? 'نیشاندانا مۆدێلێ 3D' : 'View 3D')}</span>
                    </button>

                    <button
                      onClick={() => toggleSaveDrug(selectedDrug.id)}
                      className={`p-2 rounded-xl border transition ${
                        isSaved
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title="Bookmark Medication"
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">{selectedDrug.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                    <span className="text-amber-400 font-bold font-sans">
                      {selectedDrug.nameKu}
                    </span>
                    {(selectedDrug.brandNamesKu || selectedDrug.brandNamesEn) && (
                      <span className="text-slate-400 font-mono text-[11px]">
                        <span className="text-slate-500 mr-1">{t('brand_names')}</span>
                        {lang === 'ku'
                          ? (selectedDrug.brandNamesKu || selectedDrug.brandNamesEn)
                          : (selectedDrug.brandNamesEn || selectedDrug.brandNamesKu)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 3D Pill / Vial Viewer */}
              {show3DViewer && (
                <div className="h-44 w-full rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-2 left-3 text-[10px] text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>{lang === 'ku' ? 'مۆدێلێ سێ رەهەندی یێ حەب و دەرزیێ (3D Interactive Model)' : '3D Interactive Medication Mesh (Drag to Rotate)'}</span>
                  </div>
                  <PillViewer3D drug={selectedDrug} />
                </div>
              )}

              {/* 1. Clinical Indications & Mechanism */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                <span className="text-[10px] text-cyan-400 uppercase font-black flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  {t('drug_use')}
                </span>
                <p className="text-slate-200 leading-relaxed font-sans">
                  {lang === 'ku' ? selectedDrug.useKu : selectedDrug.useEn}
                </p>
                {selectedDrug.explanationKu && (
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-900 leading-relaxed font-sans">
                    {lang === 'ku' ? selectedDrug.explanationKu : selectedDrug.explanationEn}
                  </p>
                )}
              </div>

              {/* 2. Dosage, Route & Administration Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] text-amber-400 uppercase font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {t('dosage')}
                  </span>
                  <p className="text-slate-200 font-mono text-[11px]">
                    {lang === 'ku' ? selectedDrug.standardDoseKu : selectedDrug.standardDoseEn}
                  </p>
                  <p className="text-[11px] text-slate-400 font-sans">
                    {lang === 'ku' ? selectedDrug.whenKu : selectedDrug.whenEn}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] text-rose-400 uppercase font-bold flex items-center gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                    {t('max_24h_dose')}
                  </span>
                  <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-200 font-mono text-xs font-bold">
                    {selectedDrug.maxDose24h}
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans">
                    {lang === 'ku' ? 'دۆزا حیسابکری یا زارۆکان:' : 'Pediatric formula:'} {selectedDrug.calculator.formulaDescKu}
                  </div>
                </div>
              </div>

              {/* Available Dosages & Strengths */}
              {selectedDrug.availableStrengths && selectedDrug.availableStrengths.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5 text-cyan-400" />
                    {lang === 'ku' ? 'قەبارە و هێزێن بەردەست (Available Strengths):' : 'Available Dosages & Strengths:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDrug.availableStrengths.map((str, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono"
                      >
                        {str}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. PRACTICAL NURSING CONSIDERATIONS (Clinical Pearls) */}
              {selectedDrug.nursingConsiderationsKu && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                    <Stethoscope className="w-4 h-4 text-emerald-400" />
                    <span>{t('nursing_considerations')}</span>
                  </div>
                  <p className="text-xs text-emerald-100 leading-relaxed font-sans">
                    {lang === 'ku'
                      ? (Array.isArray(selectedDrug.nursingConsiderationsKu) ? selectedDrug.nursingConsiderationsKu.join(' | ') : selectedDrug.nursingConsiderationsKu)
                      : (Array.isArray(selectedDrug.nursingConsiderationsEn) ? selectedDrug.nursingConsiderationsEn.join(' | ') : selectedDrug.nursingConsiderationsEn)}
                  </p>
                </div>
              )}

              {/* 4. ADPIE Clinical Nursing Administration Process */}
              {selectedDrug.adpie && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900/90 to-teal-950/30 border border-teal-500/40 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-black text-teal-300">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      <span>{lang === 'ku' ? 'رێبەرییا چاڤدێریا پەرستاری (ADPIE Nursing Protocol):' : 'Clinical ADPIE Nursing Administration Notes:'}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono font-bold">
                      ADPIE 2026
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {/* A - Assessment */}
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-cyan-400 block font-mono">
                        [A] {lang === 'ku' ? 'هەلسەنگاندن (Assessment):' : 'Assessment:'}
                      </span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {lang === 'ku' ? selectedDrug.adpie.assessmentKu : selectedDrug.adpie.assessmentEn}
                      </p>
                    </div>

                    {/* D - Diagnosis */}
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 block font-mono">
                        [D] {lang === 'ku' ? 'دەستنیشانکرن (Diagnosis):' : 'Nursing Diagnosis:'}
                      </span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {lang === 'ku' ? selectedDrug.adpie.diagnosisKu : selectedDrug.adpie.diagnosisEn}
                      </p>
                    </div>

                    {/* P - Planning */}
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-indigo-400 block font-mono">
                        [P] {lang === 'ku' ? 'پلان دانان (Planning):' : 'Planning & Goal:'}
                      </span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {lang === 'ku' ? selectedDrug.adpie.planningKu : selectedDrug.adpie.planningEn}
                      </p>
                    </div>

                    {/* I - Interventions */}
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-400 block font-mono">
                        [I] {lang === 'ku' ? 'کریارێن پەرستاری (Interventions):' : 'Interventions:'}
                      </span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {lang === 'ku' ? selectedDrug.adpie.interventionsKu : selectedDrug.adpie.interventionsEn}
                      </p>
                    </div>
                  </div>

                  {/* E - Evaluation */}
                  {selectedDrug.adpie.evaluationEn && (
                    <div className="p-2.5 rounded-lg bg-teal-950/30 border border-teal-500/30 text-xs space-y-1">
                      <span className="text-[10px] font-bold text-teal-300 block font-mono">
                        [E] {lang === 'ku' ? 'هەلسەنگاندنا داویێ (Evaluation):' : 'Evaluation Criteria:'}
                      </span>
                      <p className="text-[11px] text-teal-100 leading-relaxed">
                        {lang === 'ku' ? selectedDrug.adpie.evaluationKu : selectedDrug.adpie.evaluationEn}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Contraindications Block */}
              {selectedDrug.contraindicationsKu && selectedDrug.contraindicationsKu.length > 0 && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>{lang === 'ku' ? 'رێگریێن بکارئینانێ (Contraindications):' : 'Contraindications:'}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-rose-200 font-sans">
                    {(lang === 'ku' ? selectedDrug.contraindicationsKu : (selectedDrug.contraindicationsEn || selectedDrug.contraindicationsKu)).map((c, idx) => (
                      <li key={idx} className="leading-relaxed">{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 5. Critical Warnings / Black-Box Alerts */}
              {selectedDrug.criticalWarningsKu && selectedDrug.criticalWarningsKu.length > 0 && (
                <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>{t('critical_warnings')}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-rose-200 font-sans">
                    {(lang === 'ku' ? selectedDrug.criticalWarningsKu : (selectedDrug.criticalWarningsEn || selectedDrug.criticalWarningsKu)).map((w, idx) => (
                      <li key={idx} className="leading-relaxed">{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 5. Side Effects Chips & Pregnancy Guidance */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {t('sideEffects')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'ku' ? selectedDrug.sideEffectsKu : selectedDrug.sideEffectsEn).map((se, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-sans"
                      >
                        {se}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-start gap-2">
                  <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-300 mr-1">{t('pregnancy')}:</span>
                    <span className="text-slate-400 font-sans">
                      {lang === 'ku' ? selectedDrug.pregnancyDescKu : selectedDrug.pregnancyDescEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* 6. Smart Pediatric/Adult Dose Calculator */}
              <DoseCalculator drug={selectedDrug} />

              {/* 7. Drug-to-Drug Interaction Checker */}
              <PharmacyInteractionChecker />
            </div>
          </div>
        </div>
      )}

      {/* 2. EMERGENCY RESPONSE PROTOCOLS */}
      {sectionTab === 'emergency_protocols' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Protocol Selection Column */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-2 px-1">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ku' ? 'پرۆتۆکۆلێن لەزگین:' : 'Clinical Emergency Protocols:'}</span>
            </div>

            <div className="space-y-2">
              {EMERGENCY_PROTOCOLS.map((proto) => {
                const isSelected = proto.id === selectedProtocol.id;
                return (
                  <button
                    key={proto.id}
                    onClick={() => setSelectedProtocolId(proto.id)}
                    className={`w-full p-3.5 rounded-2xl text-start transition border ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-950/70 to-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">
                      {lang === 'ku' ? proto.titleKu : proto.titleEn}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {lang === 'ku' ? proto.subtitleKu : proto.subtitleEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Protocol Algorithm Execution Flow */}
          <div className="lg:col-span-8 bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold uppercase">
                  {selectedProtocol.triggerConditionEn}
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  {lang === 'ku' ? selectedProtocol.titleKu : selectedProtocol.titleEn}
                </h3>
              </div>

              <div className="text-end">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  {t('golden_window')}
                </span>
                <span className="text-xs font-mono font-bold text-rose-400">
                  {lang === 'ku' ? selectedProtocol.timeframeAlertKu : selectedProtocol.timeframeAlertEn}
                </span>
              </div>
            </div>

            {/* Step-by-Step Algorithm */}
            <div className="space-y-3">
              {selectedProtocol.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 hover:border-amber-500/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs flex items-center justify-center font-bold">
                        {st.stepNumber}
                      </span>
                      <h4 className="text-xs font-bold text-white">
                        {lang === 'ku' ? st.titleKu : st.titleEn}
                      </h4>
                    </div>

                    <span
                      className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full ${
                        st.priority === 'critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {st.priority}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {lang === 'ku' ? st.actionKu : st.actionEn}
                  </p>

                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{lang === 'ku' ? st.clinicalPearlKu : st.clinicalPearlEn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. EMERGENCY RESUSCITATION DRUGS */}
      {sectionTab === 'emergency_drugs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Drugs List */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-2 px-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'ku' ? 'دەرمانێن فریاکەوتنێ:' : 'Emergency Resuscitation Drugs:'}</span>
            </div>

            <div className="space-y-2">
              {EMERGENCY_DRUGS.map((d) => {
                const isSelected = d.id === selectedEmergDrug.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedEmergDrugId(d.id)}
                    className={`w-full p-3.5 rounded-2xl text-start transition border ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/70 to-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">
                      {lang === 'ku' ? d.genericNameKu : d.genericNameEn}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono">
                      {lang === 'ku' ? d.categoryKu : d.categoryEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Drug Monograph */}
          <div className="lg:col-span-8 bg-slate-900/80 rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-semibold uppercase">
                  {selectedEmergDrug.brandNames}
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  {lang === 'ku' ? selectedEmergDrug.genericNameKu : selectedEmergDrug.genericNameEn}
                </h3>
              </div>

              <div className="text-end">
                <span className="text-[11px] font-mono font-bold text-amber-400 block">
                  {lang === 'ku' ? selectedEmergDrug.concentrationKu : selectedEmergDrug.concentrationEn}
                </span>
              </div>
            </div>

            {/* Indication & Mechanism */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300">{t('mechanism_action')}</h4>
              <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 leading-relaxed font-sans">
                {lang === 'ku' ? selectedEmergDrug.mechanismKu : selectedEmergDrug.mechanismEn}
              </p>
            </div>

            {/* Dosages & Routes */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-cyan-300">{t('emergency_doses')}</h4>
              {selectedEmergDrug.emergencyDoses.map((dose, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5"
                >
                  <div className="text-xs font-bold text-white">
                    {lang === 'ku' ? dose.indicationKu : dose.indicationEn}
                  </div>
                  <div className="text-xs font-mono font-bold text-cyan-400">
                    {lang === 'ku' ? dose.doseRouteKu : dose.doseRouteEn}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    {lang === 'ku' ? dose.frequencyKu : dose.frequencyEn}
                  </div>
                </div>
              ))}
            </div>

            {/* Critical Alerts */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>{t('critical_alerts')}</span>
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-xs text-rose-200 font-sans">
                {(lang === 'ku'
                  ? selectedEmergDrug.criticalAlertsKu
                  : selectedEmergDrug.criticalAlertsEn
                ).map((al, i) => (
                  <li key={i} className="leading-relaxed">
                    {al}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
