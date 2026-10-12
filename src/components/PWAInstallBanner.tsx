import React from 'react';
import { Apple, CheckCircle2, Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, install, isIOS } = usePWAInstall();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A6B3C] to-[#124d2b] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#1A6B3C] font-black text-xl flex items-center justify-center shadow-md">
              CC
            </div>
            <div>
              <h3 className="text-xl font-extrabold leading-tight">ChumbaConnect TZ</h3>
              <p className="text-xs text-white/80">Sakinisha kama App (Install App on Your Phone)</p>
            </div>
          </div>
          <p className="text-xs text-white/90 leading-relaxed mt-2">
            Inafanya kazi bila bando kubwa, inafunguka haraka, na unapata arifa za vyumba vipya papo hapo!
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Install Button for Chrome/Android/Desktop */}
          {isInstallable && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
              <h4 className="font-bold text-sm text-emerald-900 mb-1">
                Kifaa chako kiko tayari kwa usakinishaji wa haraka!
              </h4>
              <p className="text-xs text-emerald-700 mb-3">
                Bonyeza hapa chini kuweka app moja kwa moja kwenye skrini yako.
              </p>
              <button
                onClick={() => {
                  install();
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#1A6B3C] hover:bg-[#134f2c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Download className="w-4 h-4" /> Sakinisha Sasa (Install Now)
              </button>
            </div>
          )}

          {/* Platform 1: Android PWA & Play Store */}
          <div className="border border-gray-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                <Smartphone className="w-5 h-5 text-[#1A6B3C]" />
                <span>Simu za Android (Chrome / Samsung Internet)</span>
              </div>
              <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                PWA / APK
              </span>
            </div>
            <ol className="text-xs text-gray-600 space-y-1.5 list-decimal pl-4">
              <li>Fungua tovuti hii kupitia <strong>Google Chrome</strong>.</li>
              <li>Bonyeza vitone vitatu (⋮) juu kulia mwa kivinjari.</li>
              <li>Chagua <strong>"Weka kwenye skrini ya mwanzo"</strong> (Add to Home screen) au <strong>"Sakinisha App"</strong>.</li>
              <li>Nembo ya ChumbaConnect itatokea kama app kamili kwenye simu yako!</li>
            </ol>
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-[11px] text-gray-600 font-medium">
                <span>Google Play Store (Inakuja Hivi Karibuni)</span>
                <span className="text-gray-400">· Toleo la v1.2</span>
              </div>
            </div>
          </div>

          {/* Platform 2: iOS iPhone / iPad Safari */}
          <div className="border border-gray-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                <Apple className="w-5 h-5 text-gray-900" />
                <span>iPhone / iPad (Safari Browser)</span>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                iOS PWA
              </span>
            </div>
            <ol className="text-xs text-gray-600 space-y-1.5 list-decimal pl-4">
              <li>Fungua tovuti hii kwa kutumia kivinjari cha <strong>Safari</strong>.</li>
              <li>Bonyeza kitufe cha <strong>Share (Shiriki)</strong> [⎋] chini ya skrini.</li>
              <li>Shuka chini kidogo kisha chagua <strong>"Add to Home Screen"</strong> (Weka kwenye Skrini ya Nyumbani).</li>
              <li>Bonyeza <strong>Add</strong> juu kulia ili kukamilisha.</li>
            </ol>
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-[11px] text-gray-600 font-medium">
                <span>Apple App Store (Inakuja Hivi Karibuni)</span>
                <span className="text-gray-400">· iOS 16+</span>
              </div>
            </div>
          </div>

          {/* Branding & Icon Specs Info as per requirements */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <h5 className="font-bold text-xs text-gray-800 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1A6B3C]" />
              Mwongozo wa Picha & Branding (System Specifications):
            </h5>
            <ul className="text-[11px] text-gray-600 space-y-1 pl-4 list-disc">
              <li><strong>Rangi Rasmi:</strong> Primary #1A6B3C (Kijani ya Uaminifu), Accent #F5A623 (Dhahabu/Chungwa).</li>
              <li><strong>Nembo (App Icon):</strong> 512x512 PNG/SVG yenye Squircle Safe-Zone ya 80% bila kukatwa kingo.</li>
              <li><strong>Splash Screen:</strong> Mandharinyuma safi ya #F7F9FC yenye nembo ya kati na jina ChumbaConnect TZ.</li>
              <li><strong>Ukubwa:</strong> Chini ya 2MB, haina gharama ya data ikishahifadhiwa kwenye simu (CacheFirst Service Worker).</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-900 text-white font-semibold text-xs transition-colors"
          >
            Nimeelewa (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
