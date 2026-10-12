import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Droplets,
  ExternalLink,
  Eye,
  Gift,
  GraduationCap,
  Info,
  Lock,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Unlock,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Listing } from '../types';

interface RoomDetailModalProps {
  listing: Listing | null;
  onClose: () => void;
  onUnlock: (listing: Listing) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  listing,
  onClose,
  onUnlock,
}) => {
  const { isListingUnlocked, currentLang, currentUser, redeemFreeView } = useApp();
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!listing) return null;

  const unlocked = isListingUnlocked(listing.id);

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % listing.photos.length);
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + listing.photos.length) % listing.photos.length);
  };

  const handleRedeemFree = () => {
    redeemFreeView(listing.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Sticky Modal Bar */}
        <div className="relative aspect-16/10 sm:aspect-2/1 bg-gray-900 overflow-hidden shrink-0">
          <img
            src={listing.photos[photoIndex] || listing.photos[0]}
            alt={listing.title}
            className="w-full h-full object-cover transition-all duration-300"
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Photo Navigation controls */}
          {listing.photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {photoIndex + 1} / {listing.photos.length}
              </div>
            </>
          )}

          {/* Badge Overlays */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm ${
                listing.status === 'AVAILABLE' ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            >
              {listing.status === 'AVAILABLE' ? '✅ Inapatikana' : '❌ Imechukuliwa'}
            </span>
            <span className="bg-black/60 text-white text-xs px-2.5 py-1 rounded-full font-medium">
              {listing.roomType}
            </span>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Header Title & Price */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                {listing.title}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-[#1A6B3C] shrink-0" />
                <span>
                  {listing.area}, {listing.district}, {listing.region}
                </span>
              </div>
            </div>
            <div className="sm:text-right shrink-0 bg-emerald-50 sm:bg-transparent p-3 sm:p-0 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-black text-[#1A6B3C]">
                TZS {listing.price.toLocaleString()}
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {currentLang === 'sw' ? 'Kwa Mwezi (Per Month)' : 'Per Month'}
              </span>
            </div>
          </div>

          {/* Campus Proximity Card */}
          <div className="bg-[#1A6B3C]/10 border border-[#1A6B3C]/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A6B3C] text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A6B3C] uppercase tracking-wider">
                {currentLang === 'sw' ? 'Chuo Kilicho Karibu' : 'Nearby University'}
              </p>
              <h4 className="font-extrabold text-sm text-gray-900">{listing.campusNearby}</h4>
              <p className="text-xs text-gray-600 mt-0.5">🚶 Umbali: {listing.distanceFromCampus}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide mb-2">
              {currentLang === 'sw' ? 'Maelezo ya Chumba' : 'Description'}
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
              {listing.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                <span>Hali ya Maji</span>
              </div>
              <p className="text-xs font-bold text-gray-800">{listing.waterStatus}</p>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Umeme (Luku)</span>
              </div>
              <p className="text-xs font-bold text-gray-800">{listing.electricityStatus}</p>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                <Users className="w-3.5 h-3.5 text-purple-500" />
                <span>Jinsia Inayoruhusiwa</span>
              </div>
              <p className="text-xs font-bold text-gray-800">{listing.genderPreference}</p>
            </div>
          </div>

          {/* Furnishing Amenities */}
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide mb-2.5">
              {currentLang === 'sw' ? 'Samani Zilizopo (Furnishing)' : 'Furnishing'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {listing.furnishing.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200/60 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* House Rules */}
          {listing.houseRules && (
            <div>
              <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide mb-2">
                {currentLang === 'sw' ? 'Sheria za Nyumba (House Rules)' : 'House Rules'}
              </h4>
              <p className="text-xs text-gray-600 bg-amber-50/60 border border-amber-200/50 p-3.5 rounded-2xl leading-relaxed">
                📜 {listing.houseRules}
              </p>
            </div>
          )}

          {/* CONTACT SECTION (UNLOCKED VS PAYWALL LOCKED) */}
          <div className="pt-2 border-t border-gray-100">
            {unlocked ? (
              <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Unlock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-emerald-950 text-sm">
                        Mawasiliano ya Mwenye Nyumba (Unlocked)
                      </h4>
                      <p className="text-[11px] text-emerald-700">
                        {currentLang === 'sw'
                          ? 'Ulipiaji umethibitishwa. Unaweza kuwasiliana naye sasa.'
                          : 'Contact verified. You can call or WhatsApp directly.'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-full">
                    Saa 24 Wazi
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-emerald-200 space-y-3">
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Jina la Mwenye Nyumba:</span>
                    <p className="font-extrabold text-gray-900 text-base">{listing.landlordName}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <a
                      href={`tel:${listing.landlordPhone}`}
                      className="py-3 px-4 rounded-xl bg-[#1A6B3C] hover:bg-[#134f2c] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <Phone className="w-4 h-4" />
                      Piga Simu: {listing.landlordPhone}
                    </a>

                    {listing.landlordWhatsapp && (
                      <a
                        href={`https://wa.me/${listing.landlordWhatsapp.replace(/\+/g, '')}?text=Habari%20${encodeURIComponent(
                          listing.landlordName
                        )},%20nimeona%20chumba%20chako%20"${encodeURIComponent(
                          listing.title
                        )}"%20kwenye%20ChumbaConnect%20TZ.%20Je,%20bado%20kipo?`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Chat WhatsApp
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-100/50 p-2.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Ushauri: Kagua chumba mwenyewe kabla ya kulipa kodi yoyote ya mwezi!
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-3xl p-6 text-white text-center space-y-4 shadow-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#1A6B3C]/40 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#F5A623]/20 rounded-full blur-2xl" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#1A6B3C] text-white flex items-center justify-center mb-3 shadow-lg">
                    <Lock className="w-7 h-7 text-[#F5A623]" />
                  </div>

                  <h3 className="text-lg font-black tracking-tight">
                    Fungua Nambari ya Simu & WhatsApp
                  </h3>
                  <p className="text-xs text-gray-300 max-w-md mt-1 leading-relaxed">
                    Ili kulinda faragha ya wenye nyumba na kuzuia madalali feki, lipa ada ya huduma ya{' '}
                    <strong className="text-[#F5A623]">TZS 2,000</strong> kupata namba ya simu na
                    WhatsApp ya mwenye chumba hiki moja kwa moja.
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
                    <button
                      onClick={() => onUnlock(listing)}
                      className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#e69512] hover:from-[#e0910f] hover:to-[#cb7f05] text-gray-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/20 transition-all active:scale-95"
                    >
                      <Sparkles className="w-4 h-4" />
                      Lipa TZS 2,000 (M-Pesa / Tigo / Airtel)
                    </button>

                    {currentUser.freeViewsRemaining > 0 && (
                      <button
                        onClick={handleRedeemFree}
                        className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all"
                        title="Tumia bonus ya rufaa"
                      >
                        <Gift className="w-4 h-4 text-[#F5A623]" />
                        Tumia Angalia 1 Bure ({currentUser.freeViewsRemaining} zimebaki)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
