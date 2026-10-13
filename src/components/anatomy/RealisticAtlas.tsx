import React, { useState, useRef } from 'react';
import { ORGANS } from '../../data/organs';
import { useLanguage } from '../../context/LanguageContext';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Camera,
  Activity,
  Sparkles,
  Layers,
  Info,
  Maximize2
} from 'lucide-react';

interface RealisticAtlasProps {
  selectedOrganId: string | null;
  onSelectOrgan: (id: string | null) => void;
  onOpenPharmacyForOrgan?: (drugs: string[]) => void;
  onStartQuizForOrgan?: (organId: string) => void;
}

export const RealisticAtlas: React.FC<RealisticAtlasProps> = ({
  selectedOrganId,
  onSelectOrgan
}) => {
  const { t, lang } = useLanguage();
  const [zoom, setZoom] = useState(1);
  const [hoveredOrganId, setHoveredOrganId] = useState<string | null>(null);
  const [screenshotFlash, setScreenshotFlash] = useState(false);

  const atlasContainerRef = useRef<HTMLDivElement>(null);
  const selectedOrgan = ORGANS.find((o) => o.id === selectedOrganId) || null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.85));
  const handleReset = () => {
    setZoom(1);
    onSelectOrgan(null);
  };

  const handleScreenshot = () => {
    setScreenshotFlash(true);
    setTimeout(() => setScreenshotFlash(false), 300);
  };

  // Medically calibrated Hotspots for the Hyper-Realistic Clinical 2D Atlas
  const renderHotspots = [
    {
      id: 'brain',
      labelKu: 'مێشک (Brain)',
      labelEn: 'Brain',
      top: '3%',
      left: '39%',
      width: '22%',
      height: '13%',
      color: '#A855F7'
    },
    {
      id: 'heart',
      labelKu: 'دل (Heart)',
      labelEn: 'Heart',
      top: '28%',
      left: '46%',
      width: '14%',
      height: '15%',
      color: '#EF4444'
    },
    {
      id: 'lungs',
      labelKu: 'سیهـ (Lungs)',
      labelEn: 'Lungs',
      top: '24%',
      left: '31%',
      width: '18%',
      height: '21%',
      color: '#F43F5E'
    },
    {
      id: 'lungs',
      labelKu: 'سیهـ (Lungs)',
      labelEn: 'Lungs',
      top: '24%',
      left: '54%',
      width: '18%',
      height: '21%',
      color: '#F43F5E'
    },
    {
      id: 'liver',
      labelKu: 'مێلاک (Liver)',
      labelEn: 'Liver',
      top: '44%',
      left: '34%',
      width: '24%',
      height: '13%',
      color: '#D97706'
    },
    {
      id: 'stomach',
      labelKu: 'گەدە (Stomach)',
      labelEn: 'Stomach',
      top: '48%',
      left: '47%',
      width: '18%',
      height: '13%',
      color: '#F472B6'
    },
    {
      id: 'kidneys',
      labelKu: 'گولچیسک (Kidneys)',
      labelEn: 'Kidneys',
      top: '49%',
      left: '58%',
      width: '10%',
      height: '11%',
      color: '#9F1239'
    },
    {
      id: 'intestines',
      labelKu: 'روویڤیک (Intestines)',
      labelEn: 'Intestines',
      top: '56%',
      left: '32%',
      width: '36%',
      height: '26%',
      color: '#FB923C'
    },
    {
      id: 'bladder',
      labelKu: 'میزڵدان (Bladder)',
      labelEn: 'Bladder',
      top: '81%',
      left: '45%',
      width: '11%',
      height: '8%',
      color: '#F59E0B'
    }
  ];

  return (
    <div
      ref={atlasContainerRef}
      className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] flex flex-col bg-medical-grid overflow-hidden select-none rounded-2xl border border-slate-800 shadow-2xl"
    >
      {/* Screenshot Flash */}
      {screenshotFlash && (
        <div className="absolute inset-0 bg-white/70 z-50 pointer-events-none transition-opacity duration-300" />
      )}

      {/* ================= TOP CONTROLS BAR ================= */}
      <div className="absolute top-2 sm:top-3 inset-x-2 sm:inset-x-3 z-30 flex items-center justify-between gap-1.5 sm:gap-2 pointer-events-none">
        {/* Left: HD Clinical Atlas Badge */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 bg-slate-900/95 backdrop-blur-xl border border-teal-500/40 rounded-xl shadow-lg">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md">
            <Layers className="w-3.5 h-3.5" />
            <span>{t('mode_atlas_hd')}</span>
          </div>
        </div>

        {/* Center: Selected Organ Floating Indicator */}
        {selectedOrgan && (
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-slate-900/95 backdrop-blur-xl border border-amber-500/60 rounded-xl shadow-xl text-xs font-bold text-amber-300 animate-fadeIn">
            <span
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-ping flex-shrink-0"
              style={{ backgroundColor: selectedOrgan.color }}
            />
            <span className="truncate max-w-[120px] sm:max-w-none">
              {lang === 'ku' ? selectedOrgan.nameKu : selectedOrgan.nameEn}
            </span>
            <span className="hidden md:inline text-[10px] text-slate-400 font-mono">[{selectedOrgan.latin}]</span>
            <button
              onClick={() => onSelectOrgan(null)}
              className="ms-1 p-0.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
              title={t('close')}
            >
              ×
            </button>
          </div>
        )}

        {/* Right: Zoom Controls */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-lg">
          <button
            onClick={handleZoomIn}
            className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-teal-400 px-1">
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>

      {/* ================= MAIN DISPLAY AREA: HD CLINICAL ATLAS ================= */}
      <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center p-2">
        <div
          className="relative w-full h-full flex items-center justify-center transition-all duration-300 ease-out origin-center select-none"
          style={{ transform: `scale(${zoom})` }}
        >
          <div className="relative h-[480px] sm:h-[580px] lg:h-[660px] aspect-[3/4] max-w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-950 flex items-center justify-center">
            {/* Hyper-Realistic Anatomical Model Clinical Render */}
            <img
              src="/src/assets/images/human_anatomy_model_1791672507558.jpg"
              alt="High-Definition 2D Clinical Anatomical Human Atlas"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
            />

            {/* Interactive Organ Hotspots & Glowing Callout Overlays */}
            {renderHotspots.map((spot, idx) => {
              const isSelected = selectedOrganId === spot.id;
              const isHovered = hoveredOrganId === spot.id;

              return (
                <div
                  key={`${spot.id}_${idx}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectOrgan(spot.id);
                  }}
                  onMouseEnter={() => setHoveredOrganId(spot.id)}
                  onMouseLeave={() => setHoveredOrganId(null)}
                  style={{
                    top: spot.top,
                    left: spot.left,
                    width: spot.width,
                    height: spot.height
                  }}
                  className={`absolute cursor-pointer rounded-2xl transition-all duration-300 flex items-center justify-center group ${
                    isSelected
                      ? 'ring-4 ring-amber-400 bg-amber-400/20 shadow-[0_0_25px_rgba(245,158,11,0.6)] z-20'
                      : isHovered
                      ? 'ring-2 ring-teal-400 bg-teal-400/15 shadow-[0_0_15px_rgba(14,116,144,0.5)] z-20'
                      : 'hover:ring-1 hover:ring-white/40'
                  }`}
                >
                  {(isSelected || isHovered) && (
                    <div className="absolute -top-3 px-2 py-0.5 rounded-md bg-slate-950/95 border border-amber-400/80 text-[10px] font-bold text-amber-300 whitespace-nowrap shadow-xl pointer-events-none animate-fadeIn flex items-center gap-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-ping"
                        style={{ backgroundColor: spot.color }}
                      />
                      <span>{lang === 'ku' ? spot.labelKu : spot.labelEn}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Click Organ Guidance Banner at Bottom */}
        <div className="absolute bottom-12 sm:bottom-14 inset-x-2 sm:inset-x-4 flex justify-center pointer-events-none">
          <div className="py-1 px-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 text-center text-[10px] sm:text-[11px] text-slate-300 flex items-center justify-center gap-1.5 shadow-lg max-w-[90%] sm:max-w-none">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate sm:overflow-visible">
              {lang === 'ku'
                ? 'کلیک ل سەر هەر ئەندامەکێ بکە بۆ دیتنا نەخوشی، دەرمان و چاڤدێریا پەرستاری'
                : 'Click any organ directly on the model to inspect clinical pathology & nursing care'}
            </span>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BENTO TOOLBAR ================= */}
      <div className="absolute bottom-2 sm:bottom-3 inset-x-2 sm:inset-x-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
        {/* Left Status Text */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 text-xs text-slate-300 font-mono">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>HD Clinical Anatomy Atlas 2026</span>
        </div>

        {/* Right Tools */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl ms-auto">
          {/* Reset Zoom & Selection */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
            title={t('reset_view')}
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">{t('reset_view')}</span>
          </button>

          {/* Screenshot capture */}
          <button
            onClick={handleScreenshot}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
            title={t('screenshot')}
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{t('screenshot')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
