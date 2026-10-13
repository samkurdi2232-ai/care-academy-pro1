import React from 'react';
import { Pill as PillIcon, Sparkles } from 'lucide-react';
import { DrugData } from '../../data/pharmacy';

interface PillViewerProps {
  drug: DrugData;
}

export const PillViewer3D: React.FC<PillViewerProps> = ({ drug }) => {
  return (
    <div className="w-full h-full min-h-[220px] rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 w-24 h-24 rounded-full bg-slate-900 border-2 border-teal-500/50 flex items-center justify-center shadow-xl shadow-teal-950/40">
        <PillIcon className="w-12 h-12 text-teal-400 rotate-45 animate-pulse" />
      </div>

      <div className="relative z-10 mt-3 text-center">
        <h4 className="text-sm font-bold text-white tracking-wide">{drug.name}</h4>
        <span className="text-xs text-teal-300 font-mono">{drug.form} • {drug.strength}</span>
      </div>
    </div>
  );
};
