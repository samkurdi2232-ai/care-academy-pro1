import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, ShieldCheck, Activity, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
    <footer className="w-full py-3 px-4 border-t border-slate-900 bg-slate-950 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-start">
        <div className="flex items-center gap-1.5 font-medium text-slate-400">
          <span>CARE ACADEMY 3D © 2026</span>
          <span className="text-slate-600">·</span>
          <span>Training Future Nurses</span>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-1 text-slate-300">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Kurdistan
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
            <span>WHO & AHA 2026 Standards</span>
          </span>
          <span className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-amber-500" />
            <span>WebGL 3D Accelerated</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
