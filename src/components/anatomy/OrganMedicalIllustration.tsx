import React from 'react';
import { OrganData } from '../../data/organs';

interface OrganIllustrationProps {
  organ: OrganData;
}

export const OrganMedicalIllustration: React.FC<OrganIllustrationProps> = ({ organ }) => {
  return (
    <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-3 flex flex-col items-center justify-between shadow-inner relative overflow-hidden group">
      {/* Blueprint Grid Backdrop */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0E7490_1px,transparent_1px)] [background-size:14px_14px]" />

      {/* Top Badge */}
      <div className="w-full flex items-center justify-between z-10 text-[10px] font-mono text-slate-400">
        <span className="uppercase tracking-wider text-teal-400 font-semibold">
          High-Definition Anatomy
        </span>
        <span className="italic text-slate-400">{organ.latin}</span>
      </div>

      {/* Center Anatomical SVG Visual */}
      <div className="w-full flex-1 flex items-center justify-center z-10 py-1">
        {organ.id === 'heart' && (
          <div className="w-28 h-28 relative animate-heartbeat flex items-center justify-center">
            <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="detHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="35%" stopColor="#EF4444" />
                  <stop offset="75%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>
                <linearGradient id="detAortaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#991B1B" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
              </defs>
              {/* Superior Vena Cava */}
              <rect x="30" y="4" width="12" height="28" rx="4" fill="#2563EB" />
              {/* Inferior Vena Cava */}
              <rect x="36" y="80" width="10" height="20" rx="3" fill="#1D4ED8" />
              {/* Aortic Arch */}
              <path
                d="M 45 28 C 45 10, 72 8, 72 32"
                fill="none"
                stroke="url(#detAortaGrad)"
                strokeWidth="13"
                strokeLinecap="round"
              />
              {/* Brachiocephalic Arteries */}
              <path d="M 52 14 L 52 2 M 60 14 L 60 2 M 68 18 L 70 2" stroke="#EF4444" strokeWidth="3.5" />
              {/* Pulmonary Artery */}
              <path d="M 38 38 Q 45 28 58 35" stroke="#3B82F6" strokeWidth="10" fill="none" strokeLinecap="round" />
              {/* Cardiac Body */}
              <path
                d="M 50 36
                   C 32 20, 14 36, 18 58
                   C 22 80, 42 98, 52 108
                   C 62 98, 84 80, 82 58
                   C 80 36, 64 20, 50 36 Z"
                fill="url(#detHeartGrad)"
                stroke="#F59E0B"
                strokeWidth="2"
              />
              {/* Left Ventricle Sulcus line */}
              <path d="M 52 48 Q 56 75 48 100" fill="none" stroke="#7F1D1D" strokeWidth="3" opacity="0.7" />
              {/* Right Atrium Accent */}
              <ellipse cx="26" cy="48" rx="6" ry="10" fill="#991B1B" opacity="0.4" />
            </svg>
          </div>
        )}

        {organ.id === 'brain' && (
          <div className="w-28 h-28 relative animate-brainwave flex items-center justify-center">
            <svg viewBox="0 0 100 90" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="detBrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5D0FE" />
                  <stop offset="30%" stopColor="#D8B4FE" />
                  <stop offset="70%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#6B21A8" />
                </linearGradient>
              </defs>
              {/* Brainstem */}
              <path d="M 50 65 L 50 88 L 42 88 L 44 65 Z" fill="#7E22CE" />
              {/* Cerebellum */}
              <ellipse cx="36" cy="68" rx="14" ry="10" fill="#9333EA" stroke="#6B21A8" strokeWidth="1.5" />
              {/* Cerebrum main hemisphere */}
              <path
                d="M 50 15
                   C 28 12, 14 26, 15 48
                   C 16 62, 28 66, 42 66
                   C 50 66, 56 65, 65 65
                   C 82 65, 88 52, 87 38
                   C 86 22, 72 14, 50 15 Z"
                fill="url(#detBrainGrad)"
                stroke="#F59E0B"
                strokeWidth="2"
              />
              {/* Sulci / Gyri intricate folds */}
              <path
                d="M 28 32 Q 42 22 55 34 Q 68 46 80 32
                   M 22 46 Q 38 38 52 48 Q 66 58 80 46
                   M 34 58 Q 50 50 68 58"
                fill="none"
                stroke="#581C87"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}

        {organ.id === 'lungs' && (
          <div className="w-28 h-28 relative flex items-center justify-center">
            <svg viewBox="0 0 100 90" className="w-full h-full drop-shadow-xl animate-lungbreathe">
              <defs>
                <linearGradient id="detLungGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FECDD3" />
                  <stop offset="40%" stopColor="#FDA4AF" />
                  <stop offset="80%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#BE123C" />
                </linearGradient>
              </defs>
              {/* Trachea Windpipe */}
              <path d="M 46 4 L 46 32 M 54 4 L 54 32" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="3 2" />
              {/* Bronchi Left & Right */}
              <path d="M 46 32 Q 35 40 28 48 M 54 32 Q 65 40 72 48" stroke="#CBD5E1" strokeWidth="3" fill="none" />
              {/* Right Lung (3 lobes) */}
              <path
                d="M 24 24 C 36 24, 38 42, 38 72 C 34 78, 14 74, 12 55 C 10 38, 16 24, 24 24 Z"
                fill="url(#detLungGrad)"
                stroke="#F59E0B"
                strokeWidth="1.8"
              />
              {/* Left Lung with Cardiac Notch */}
              <path
                d="M 76 24 C 64 24, 62 40, 62 54 C 65 62, 63 68, 62 72 C 66 78, 86 74, 88 55 C 90 38, 84 24, 76 24 Z"
                fill="url(#detLungGrad)"
                stroke="#F59E0B"
                strokeWidth="1.8"
              />
            </svg>
          </div>
        )}

        {organ.id === 'liver' && (
          <div className="w-28 h-28 relative flex items-center justify-center">
            <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-xl">
              <defs>
                <linearGradient id="detLivGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B45309" />
                  <stop offset="40%" stopColor="#92400E" />
                  <stop offset="80%" stopColor="#78350F" />
                  <stop offset="100%" stopColor="#451A03" />
                </linearGradient>
              </defs>
              <path
                d="M 20 25
                   C 45 15, 78 20, 88 38
                   C 92 52, 75 68, 55 68
                   C 35 68, 12 58, 14 42
                   C 15 32, 17 26, 20 25 Z"
                fill="url(#detLivGrad)"
                stroke="#F59E0B"
                strokeWidth="2"
              />
              {/* Falciform division ligament */}
              <path d="M 52 20 Q 55 45 50 68" stroke="#451A03" strokeWidth="2.5" fill="none" opacity="0.6" />
              {/* Gallbladder hint */}
              <ellipse cx="62" cy="62" rx="6" ry="4" fill="#16A34A" stroke="#15803D" strokeWidth="1" />
            </svg>
          </div>
        )}

        {organ.id === 'stomach' && (
          <div className="w-28 h-28 relative flex items-center justify-center">
            <svg viewBox="0 0 100 90" className="w-full h-full drop-shadow-xl">
              <defs>
                <linearGradient id="detStomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9A8D4" />
                  <stop offset="40%" stopColor="#F472B6" />
                  <stop offset="80%" stopColor="#DB2777" />
                  <stop offset="100%" stopColor="#831843" />
                </linearGradient>
              </defs>
              {/* Esophagus Tube Inlet */}
              <rect x="36" y="8" width="10" height="18" rx="2" fill="#F472B6" />
              {/* J-curve Gastric Wall */}
              <path
                d="M 42 22
                   C 25 15, 12 35, 16 55
                   C 20 78, 48 84, 68 76
                   C 82 70, 84 55, 74 48
                   C 65 42, 54 48, 48 38
                   C 45 32, 44 26, 42 22 Z"
                fill="url(#detStomGrad)"
                stroke="#F59E0B"
                strokeWidth="2"
              />
              {/* Pyloric Duodenum Outlet */}
              <path d="M 74 48 L 86 44 L 88 52 L 76 56 Z" fill="#DB2777" />
            </svg>
          </div>
        )}

        {organ.id === 'kidneys' && (
          <div className="w-28 h-28 relative flex items-center justify-center">
            <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-xl">
              <defs>
                <radialGradient id="detKidGrad" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#E11D48" />
                  <stop offset="60%" stopColor="#9F1239" />
                  <stop offset="100%" stopColor="#4C0519" />
                </radialGradient>
              </defs>
              {/* Right Kidney Bean */}
              <path
                d="M 30 18 C 42 18, 46 32, 42 42 C 40 48, 43 54, 40 60 C 26 64, 15 54, 18 36 C 20 24, 25 18, 30 18 Z"
                fill="url(#detKidGrad)"
                stroke="#F59E0B"
                strokeWidth="1.8"
              />
              {/* Left Kidney Bean */}
              <path
                d="M 70 18 C 58 18, 54 32, 58 42 C 60 48, 57 54, 60 60 C 74 64, 85 54, 82 36 C 80 24, 75 18, 70 18 Z"
                fill="url(#detKidGrad)"
                stroke="#F59E0B"
                strokeWidth="1.8"
              />
              {/* Renal Arteries & Ureters */}
              <path d="M 42 42 L 50 42 L 58 42" stroke="#DC2626" strokeWidth="2.5" />
              <path d="M 40 50 Q 45 65 48 76 M 60 50 Q 55 65 52 76" stroke="#F59E0B" strokeWidth="2" fill="none" />
            </svg>
          </div>
        )}

        {/* Fallback for other organs (Intestines, Pancreas, Spleen, Bladder, etc.) */}
        {!['heart', 'brain', 'lungs', 'liver', 'stomach', 'kidneys'].includes(organ.id) && (
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-amber-400"
            style={{ backgroundColor: `${organ.color}35` }}
          >
            <div
              className="w-12 h-12 rounded-xl animate-pulse flex items-center justify-center font-bold text-white text-lg"
              style={{ backgroundColor: organ.color }}
            >
              {organ.nameEn.slice(0, 2).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Subtitle Caption */}
      <div className="w-full text-center z-10 text-[11px] text-slate-300 font-medium">
        <span>{organ.nameKu}</span> · <span className="text-teal-300">{organ.nameEn}</span>
      </div>
    </div>
  );
};
