import React, { useState } from 'react';
import { AnatomyLeftPanel } from '../components/anatomy/AnatomyLeftPanel';
import { RealisticAtlas } from '../components/anatomy/RealisticAtlas';
import { AnatomyRightPanel } from '../components/anatomy/AnatomyRightPanel';
import { ListFilter, FileText, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AnatomyViewProps {
  onNavigateToPharmacyWithDrug?: (drugId: string) => void;
  onStartQuizForOrgan?: (organId: string) => void;
}

export const AnatomyView: React.FC<AnatomyViewProps> = ({
  onNavigateToPharmacyWithDrug,
  onStartQuizForOrgan
}) => {
  const { t } = useLanguage();
  const [selectedOrganId, setSelectedOrganId] = useState<string | null>('heart');
  const [mobileTab, setMobileTab] = useState<'left' | 'center' | 'right'>('center');

  return (
    <div className="w-full h-full flex flex-col p-2 sm:p-4 gap-3 overflow-hidden">
      {/* Mobile view switcher segmented controls */}
      <div className="flex lg:hidden items-center justify-between p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs flex-shrink-0">
        <button
          onClick={() => setMobileTab('left')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
            mobileTab === 'left' ? 'bg-teal-600 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          <ListFilter className="w-3.5 h-3.5" />
          <span>{t('all_systems')}</span>
        </button>
        <button
          onClick={() => setMobileTab('center')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
            mobileTab === 'center' ? 'bg-teal-600 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>{t('nav_anatomy')}</span>
        </button>
        <button
          onClick={() => setMobileTab('right')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
            mobileTab === 'right' ? 'bg-teal-600 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{t('overview')}</span>
        </button>
      </div>

      {/* DESKTOP BENTO GRID LAYOUT: Left 22% - Center 53% - Right 25% */}
      <div className="flex-1 w-full flex flex-col lg:flex-row gap-3 min-h-[520px] lg:min-h-[700px]">
        {/* Left Systems Accordion: 22% on desktop */}
        <div
          className={`w-full lg:w-[22%] h-[540px] sm:h-[620px] lg:h-[720px] flex-shrink-0 ${
            mobileTab === 'left' ? 'block' : 'hidden lg:block'
          }`}
        >
          <AnatomyLeftPanel
            selectedOrganId={selectedOrganId}
            onSelectOrgan={(id) => {
              setSelectedOrganId(id);
              setMobileTab('right'); // On mobile switch to details
            }}
          />
        </div>

        {/* Center 3D Medical Anatomical Model Viewer: 53% on desktop */}
        <div
          className={`w-full lg:w-[53%] h-[540px] sm:h-[620px] lg:h-[720px] flex-shrink-0 ${
            mobileTab === 'center' ? 'block' : 'hidden lg:block'
          }`}
        >
          <RealisticAtlas
            selectedOrganId={selectedOrganId}
            onSelectOrgan={(id) => {
              setSelectedOrganId(id);
              if (id) setMobileTab('right');
            }}
          />
        </div>

        {/* Right Organ Clinical Details: 25% on desktop */}
        <div
          className={`w-full lg:w-[25%] h-[540px] sm:h-[620px] lg:h-[720px] flex-shrink-0 ${
            mobileTab === 'right' ? 'block' : 'hidden lg:block'
          }`}
        >
          <AnatomyRightPanel
            selectedOrganId={selectedOrganId}
            onSelectOrgan={(id) => setSelectedOrganId(id)}
            onNavigateToPharmacyWithDrug={onNavigateToPharmacyWithDrug}
            onStartQuizForOrgan={onStartQuizForOrgan}
          />
        </div>
      </div>
    </div>
  );
};
