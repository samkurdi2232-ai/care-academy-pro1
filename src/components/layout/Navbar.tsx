import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Activity,
  Heart,
  Pill,
  GraduationCap,
  Award,
  Globe,
  Sun,
  Moon,
  Sparkles,
  Stethoscope,
  ClipboardList,
  Syringe,
  BookOpen,
  Calculator,
  Zap
} from 'lucide-react';

import { PWAInstallButton } from '../common/PWAInstallButton';

export type ActiveRoute =
  | 'anatomy'
  | 'careplans'
  | 'injections'
  | 'training'
  | 'pharmacy'
  | 'flashcards'
  | 'tools'
  | 'exams';

interface NavbarProps {
  activeRoute: ActiveRoute;
  onRouteChange: (route: ActiveRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeRoute, onRouteChange }) => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navItems: { id: ActiveRoute; label: string; icon: React.ReactNode }[] = [
    {
      id: 'anatomy',
      label: t('nav_anatomy'),
      icon: <Heart className="w-3.5 h-3.5 text-rose-400" />
    },
    {
      id: 'careplans',
      label: t('nav_careplans'),
      icon: <ClipboardList className="w-3.5 h-3.5 text-teal-400" />
    },
    {
      id: 'injections',
      label: t('nav_injections'),
      icon: <Syringe className="w-3.5 h-3.5 text-cyan-400" />
    },
    {
      id: 'training',
      label: t('nav_training'),
      icon: <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
    },
    {
      id: 'pharmacy',
      label: t('nav_pharmacy'),
      icon: <Zap className="w-3.5 h-3.5 text-amber-400" />
    },
    {
      id: 'flashcards',
      label: t('nav_flashcards'),
      icon: <BookOpen className="w-3.5 h-3.5 text-purple-400" />
    },
    {
      id: 'tools',
      label: t('nav_tools'),
      icon: <Calculator className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      id: 'exams',
      label: t('nav_exams'),
      icon: <Award className="w-3.5 h-3.5 text-yellow-400" />
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-2.5 py-2 sm:px-5 bg-slate-950/85 backdrop-blur-2xl border-b border-slate-800/80">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-3">
        {/* BRAND & LOGO */}
        <div
          onClick={() => onRouteChange('anatomy')}
          className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-700 via-cyan-600 to-amber-500 p-[1.5px] shadow-lg shadow-teal-900/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-teal-400 group-hover:scale-110 transition duration-200" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-slate-950" />
          </div>

          <div className="hidden xl:block">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white tracking-wider font-mono">
                CARE ACADEMY 3D
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-gradient-to-r from-teal-500/20 to-amber-500/20 text-teal-300 border border-teal-500/30 font-semibold font-mono">
                2026
              </span>
            </div>
            <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
              {t('academy_tagline')}
            </div>
          </div>
        </div>

        {/* PRIMARY NAVIGATION TABS (Horizontal scrolling segmented buttons) */}
        <nav className="flex items-center gap-1 p-1 bg-slate-900/85 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-inner overflow-x-auto no-scrollbar scroll-smooth flex-1 max-w-4xl mx-auto">
          {navItems.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onRouteChange(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-900/30 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT UTILITIES: PWA Install, Strict Language Switcher & Dark/Light Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Strict Language Switcher: English & Behdini Kurdish (زاراڤێ بەهدینی) ONLY */}
          <div className="flex items-center p-0.5 bg-slate-900/95 rounded-xl border border-slate-800 text-[11px] font-bold">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-lg transition-all ${
                lang === 'en'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English (US/UK Clinical Standard)"
            >
              EN
            </button>
            <button
              onClick={() => setLang('ku')}
              className={`px-2 py-1 rounded-lg transition-all font-naskh ${
                lang === 'ku'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="زاراڤێ بەهدینی (Behdini Kurdish)"
            >
              بەهدینی
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-amber-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 transition"
            title={t('theme_toggle')}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
