import React from 'react';
import { CheckCircle2, Clock, HelpCircle, X, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AvailabilityCheckModal: React.FC = () => {
  const {
    showAvailabilityPrompt,
    promptListing,
    confirmListingAvailable,
    dismissAvailabilityPrompt,
  } = useApp();

  if (!showAvailabilityPrompt || !promptListing) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl border-2 border-emerald-500 relative">
        <button
          onClick={dismissAvailabilityPrompt}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
          <HelpCircle className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-black text-gray-900 leading-tight">
          Je, chumba hiki kimechukuliwa?
        </h3>

        <div className="bg-gray-50 rounded-2xl p-3 my-3 text-left border border-gray-100">
          <p className="text-xs font-bold text-gray-900 line-clamp-1">{promptListing.title}</p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            📍 {promptListing.area} · TZS {promptListing.price.toLocaleString()}/mwezi
          </p>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Mfumo wa ChumbaConnect huuliza wenye nyumba mara kwa mara ili kuhakikisha wanafunzi hawapigi simu kwenye vyumba vilivyojaa.
        </p>

        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <button
            onClick={() => confirmListingAvailable(promptListing.id, false)}
            className="py-3 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-rose-200 transition-colors"
          >
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>Kimechukuliwa</span>
          </button>

          <button
            onClick={() => confirmListingAvailable(promptListing.id, true)}
            className="py-3 px-3 rounded-xl bg-[#1A6B3C] hover:bg-[#134f2c] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Bado Kipo Wazi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
