import React, { useState } from 'react';
import { FLASHCARDS_DATA, Flashcard, FlashcardCategory } from '../data/flashcards';
import { useLanguage } from '../context/LanguageContext';
import {
  RotateCw,
  Shuffle,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Volume2,
  Award,
  Layers
} from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<FlashcardCategory | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('care_flashcards_mastered');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const filteredCards = FLASHCARDS_DATA.filter((card) => {
    if (selectedCategory === 'all') return true;
    return card.category === selectedCategory;
  });

  const activeCard = filteredCards[currentIndex] || filteredCards[0];
  const isMastered = !!masteredIds[activeCard?.id];

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('care_flashcards_mastered', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  const masteredCount = filteredCards.filter((c) => !!masteredIds[c.id]).length;
  const progressPercent =
    filteredCards.length > 0 ? Math.round((masteredCount / filteredCards.length) * 100) : 0;

  return (
    <div className="w-full h-full flex flex-col p-3 sm:p-5 overflow-y-auto space-y-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/90 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white">{t('flashcards_title')}</h2>
          </div>
          <p className="text-xs text-slate-400">{t('flashcards_subtitle')}</p>
        </div>

        {/* Mastered Progress Meter */}
        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-end">
            <span className="text-[10px] text-slate-400 block">{t('mastered_status')}</span>
            <span className="text-xs font-mono font-bold text-amber-400">
              {masteredCount} / {filteredCards.length} ({progressPercent}%)
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-500/30 flex items-center justify-center font-mono text-xs font-bold text-amber-300">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Filter Tabs & Shuffle */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 overflow-x-auto">
          {[
            { id: 'all', label: t('filter_all_cards') },
            { id: 'terminology', label: t('filter_terminology') },
            { id: 'pharmacology', label: t('filter_pharma') },
            { id: 'clinical_normals', label: t('filter_normals') }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleShuffle}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2 transition"
          title={t('shuffle_cards')}
        >
          <Shuffle className="w-3.5 h-3.5 text-amber-400" />
          <span>{t('shuffle_cards')}</span>
        </button>
      </div>

      {/* INTERACTIVE 3D FLIP CARD */}
      {activeCard && (
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full min-h-[340px] sm:min-h-[380px] cursor-pointer perspective-1000 select-none group"
        >
          <div
            className={`relative w-full h-full min-h-[340px] sm:min-h-[380px] rounded-3xl transition-all duration-500 transform preserve-3d border ${
              isFlipped
                ? 'rotate-y-180 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/40 border-teal-500/50 shadow-2xl shadow-teal-500/10'
                : 'bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border-slate-800/80 shadow-2xl hover:border-amber-500/50'
            }`}
          >
            {/* FRONT OF CARD */}
            {!isFlipped && (
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold border border-amber-500/30">
                    {lang === 'ku' ? activeCard.badgeKu : activeCard.badgeEn}
                  </span>

                  <button
                    onClick={(e) => toggleMastered(activeCard.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition border ${
                      isMastered
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMastered ? t('mastered_status') : t('study_again')}</span>
                  </button>
                </div>

                <div className="my-auto text-center space-y-3 py-6">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                    {lang === 'ku' ? activeCard.frontTermKu : activeCard.frontTermEn}
                  </h3>
                  {activeCard.pronunciation && (
                    <span className="font-mono text-xs text-amber-400/80 tracking-wider block">
                      {activeCard.pronunciation}
                    </span>
                  )}
                  <p className="text-xs text-slate-400 font-mono pt-2">
                    {t('tap_to_flip')}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>CARE ACADEMY 3D</span>
                  <span>
                    {currentIndex + 1} / {filteredCards.length}
                  </span>
                </div>
              </div>
            )}

            {/* BACK OF CARD */}
            {isFlipped && (
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono font-semibold border border-teal-500/30">
                    {lang === 'ku' ? 'پێناسە و کارتێکرن' : 'Definition & Clinical Significance'}
                  </span>

                  <button
                    onClick={(e) => toggleMastered(activeCard.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition border ${
                      isMastered
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMastered ? t('mastered_status') : t('study_again')}</span>
                  </button>
                </div>

                <div className="my-auto space-y-4 py-4 text-start">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-teal-400 block font-bold">
                      {lang === 'ku' ? 'پێناسە:' : 'Clinical Definition:'}
                    </span>
                    <p className="text-sm sm:text-base text-white leading-relaxed font-semibold">
                      {lang === 'ku' ? activeCard.backDefinitionKu : activeCard.backDefinitionEn}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 block font-bold">
                      {t('clinical_context')}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'ku' ? activeCard.clinicalContextKu : activeCard.clinicalContextEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>{t('tap_to_flip')}</span>
                  <span>
                    {currentIndex + 1} / {filteredCards.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Controls Bar */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{lang === 'ku' ? 'کارتێ بەرێ' : 'Previous'}</span>
        </button>

        <span className="font-mono text-xs font-bold text-slate-400">
          {currentIndex + 1} / {filteredCards.length}
        </span>

        <button
          onClick={handleNext}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
        >
          <span>{lang === 'ku' ? 'کارتێ دووڤدا' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
