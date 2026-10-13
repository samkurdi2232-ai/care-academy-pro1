import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useLanguage } from '../../context/LanguageContext';
import { Download, CheckCircle, Smartphone, Share2, PlusSquare, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t, lang } = useLanguage();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // If already in standalone mode, display a subtle "Installed" indicator or hide
  if (isInstalled) {
    return (
      <div
        className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-medium bg-teal-950/40 text-teal-300 border border-teal-800/40 select-none"
        title={lang === 'ku' ? 'بەرنامە هاتیە دامەزراندن' : 'Application Installed'}
      >
        <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
        <span className="font-mono">{lang === 'ku' ? 'داگرتییە' : 'Installed'}</span>
      </div>
    );
  }

  // Chromium / Android / Desktop flow when beforeinstallprompt fired
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-amber-500 hover:from-teal-400 hover:via-cyan-400 hover:to-amber-400 shadow-md shadow-cyan-900/30 hover:shadow-cyan-500/20 active:scale-95 transition-all duration-200"
        title={lang === 'ku' ? 'دابەزاندنا بەرنامەی ب یەک کلیک' : 'Install PWA App'}
      >
        <Download className="w-3.5 h-3.5 text-white animate-bounce" />
        <span>{lang === 'ku' ? 'داگرتنا ئەپی' : 'Install App'}</span>
        <span className="hidden lg:inline text-[10px] px-1 py-0.2 rounded bg-black/20 text-teal-100 font-mono">
          PWA
        </span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-teal-300 bg-teal-950/50 hover:bg-teal-900/40 border border-teal-800/60 transition active:scale-95"
          title={lang === 'ku' ? 'رێبەرییا داگرتنێ بۆ iOS' : 'Install on iPhone/iPad'}
        >
          <Smartphone className="w-3.5 h-3.5 text-teal-400" />
          <span>{lang === 'ku' ? 'داگرتن (iOS)' : 'Install App'}</span>
        </button>

        {showIOSModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700/80 p-5 shadow-2xl text-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-teal-400" />
                  <h3 className="text-sm font-bold text-white">
                    {lang === 'ku' ? 'داگرتنا ئەپی د iPhone / iPad دا' : 'Install on iOS Safari'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="my-4 space-y-3 text-xs leading-relaxed text-slate-300">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <Share2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">
                      {lang === 'ku' ? '١. ل دوگمەیا بەلاڤکرنێ (Share) بدە' : '1. Tap Share in Safari'}
                    </strong>
                    <span className="text-slate-400 text-[11px]">
                      {lang === 'ku' ? 'ل بەشێ خوارێ یان سەرێ وێبگەڕێ Safari.' : 'At bottom toolbar or top of Safari.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <PlusSquare className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">
                      {lang === 'ku' ? '٢. هەلبژێرە "Add to Home Screen"' : '2. Select "Add to Home Screen"'}
                    </strong>
                    <span className="text-slate-400 text-[11px]">
                      {lang === 'ku' ? 'زێدەکرن بۆ سەر شاشەیا سەرەکی.' : 'Adds CARE ACADEMY icon directly to home screen.'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSModal(false)}
                className="w-full py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition shadow-md"
              >
                {lang === 'ku' ? 'تێگەهشتم' : 'Got it'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback trigger button: On desktop Chrome/Edge before event or in browser menus
  return (
    <>
      <button
        onClick={() => setShowHelpModal(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-teal-300 bg-teal-950/40 hover:bg-teal-900/30 border border-teal-800/50 transition active:scale-95"
        title={lang === 'ku' ? 'داگرتنا ئەپێ وەک بەرنامە' : 'Install PWA'}
      >
        <Download className="w-3.5 h-3.5 text-teal-400" />
        <span className="font-semibold">{lang === 'ku' ? 'داگرتنا ئەپی' : 'Install App'}</span>
      </button>

      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700/80 p-5 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-teal-400" />
                <h3 className="text-sm font-bold text-white">
                  {lang === 'ku' ? 'داگرتنا ئەکادیمیایێ وەک ئەپ (PWA)' : 'Install CARE ACADEMY App'}
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                {lang === 'ku'
                  ? 'ئەڤ بەرنامەیە پشتەڤانیا PWA دکەت و دشێی وەک ئەپەکێ فەرمی ل سەر کۆمپیۆتەر و موبایلێ دانێی بێی پێدڤی ب App Store یان Google Play.'
                  : 'This web app is a full Progressive Web App. You can install it on Chrome, Edge, Android, or iOS with one click.'}
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-teal-300">
                {lang === 'ku'
                  ? '💡 ل سەر کۆمپیۆتەرێ، ل ئایکۆنا داگرتنێ (Install) د بەشێ ناڤنیشانێ گەڕانێ (URL bar) بدە.'
                  : '💡 On Desktop Chrome/Edge, look for the install icon in the URL bar.'}
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition shadow-md"
            >
              {lang === 'ku' ? 'داخستن' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
