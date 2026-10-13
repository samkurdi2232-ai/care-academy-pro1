import React, { useState, useMemo } from 'react';
import { ORGANS, SYSTEM_CATEGORIES } from '../../data/organs';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Activity,
  Heart,
  Brain,
  Wind,
  Flame,
  Shield,
  Droplet,
  Bone
} from 'lucide-react';

interface AnatomyLeftPanelProps {
  selectedOrganId: string | null;
  onSelectOrgan: (id: string) => void;
}

export const AnatomyLeftPanel: React.FC<AnatomyLeftPanelProps> = ({
  selectedOrganId,
  onSelectOrgan
}) => {
  const { t, lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSystems, setExpandedSystems] = useState<Record<string, boolean>>({
    circulatory: true,
    nervous: true,
    respiratory: true,
    digestive: true,
    urinary: true
  });

  const toggleSystem = (sysId: string) => {
    setExpandedSystems((prev) => ({
      ...prev,
      [sysId]: !prev[sysId]
    }));
  };

  // Filter organs by search term
  const filteredOrgans = useMemo(() => {
    if (!searchQuery.trim()) return ORGANS;
    const q = searchQuery.toLowerCase().trim();
    return ORGANS.filter(
      (o) =>
        o.nameKu.toLowerCase().includes(q) ||
        o.nameEn.toLowerCase().includes(q) ||
        o.latin.toLowerCase().includes(q) ||
        o.nameAr.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Group organs by system
  const systemsWithOrgans = useMemo(() => {
    const list = SYSTEM_CATEGORIES.filter((s) => s.id !== 'all');
    return list.map((sys) => {
      const organsInSys = filteredOrgans.filter((o) => o.system === sys.id);
      return {
        ...sys,
        organs: organsInSys
      };
    });
  }, [filteredOrgans]);

  const getSystemIcon = (sysId: string) => {
    switch (sysId) {
      case 'circulatory':
        return <Heart className="w-4 h-4 text-red-400" />;
      case 'nervous':
        return <Brain className="w-4 h-4 text-purple-400" />;
      case 'respiratory':
        return <Wind className="w-4 h-4 text-rose-300" />;
      case 'digestive':
        return <Flame className="w-4 h-4 text-amber-400" />;
      case 'urinary':
        return <Droplet className="w-4 h-4 text-sky-400" />;
      case 'skeletal':
        return <Bone className="w-4 h-4 text-slate-300" />;
      case 'immune':
        return <Shield className="w-4 h-4 text-emerald-400" />;
      default:
        return <Activity className="w-4 h-4 text-teal-400" />;
    }
  };

  return (
    <aside className="w-full h-full flex flex-col bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
      {/* Search Header */}
      <div className="p-3.5 border-b border-slate-800/80 space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchOrgan')}
            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl ps-9 pe-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/70 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute top-1/2 -translate-y-1/2 end-3 text-slate-500 hover:text-slate-300 text-xs"
            >
              ×
            </button>
          )}
        </div>

        {/* Quick System Badge count */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-medium">
          <span>{t('all_systems')}</span>
          <span className="font-mono text-teal-400">{filteredOrgans.length} / 12</span>
        </div>
      </div>

      {/* Systems Accordion List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
        {systemsWithOrgans.map((sys) => {
          if (sys.organs.length === 0 && searchQuery) return null;
          const isExpanded = !!expandedSystems[sys.id] || !!searchQuery;

          return (
            <div
              key={sys.id}
              className="border border-slate-800/70 bg-slate-950/40 rounded-xl overflow-hidden transition"
            >
              {/* System Accordion Header */}
              <button
                onClick={() => toggleSystem(sys.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800/50 transition"
              >
                <div className="flex items-center gap-2">
                  {getSystemIcon(sys.id)}
                  <span className="truncate">{lang === 'ku' ? sys.nameKu : sys.nameEn}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 font-mono text-slate-300">
                    {sys.organs.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Organ list in system */}
              {isExpanded && (
                <div className="p-1 space-y-0.5 border-t border-slate-800/60 bg-slate-900/30">
                  {sys.organs.map((organ) => {
                    const isSelected = selectedOrganId === organ.id;
                    return (
                      <button
                        key={organ.id}
                        onClick={() => onSelectOrgan(organ.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition text-start ${
                          isSelected
                            ? 'bg-gradient-to-r from-teal-500/20 to-amber-500/10 border border-teal-500/50 text-teal-200 font-semibold shadow-sm'
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: organ.color }}
                          />
                          <span className="truncate">
                            {lang === 'ku' ? organ.nameKu : organ.nameEn}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono italic truncate max-w-[80px]">
                          {organ.latin}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
