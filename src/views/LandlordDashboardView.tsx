import React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Eye,
  KeyRound,
  Lock,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Listing } from '../types';

export const LandlordDashboardView: React.FC = () => {
  const {
    listings,
    currentUser,
    updateListingStatus,
    duplicateListing,
    deleteListing,
    setActiveView,
    confirmListingAvailable,
    currentLang,
  } = useApp();

  // Filter listings belonging to this landlord or all if demo landlord
  const myListings = listings.filter(
    (l) => l.landlordId === currentUser.id || currentUser.role === 'admin'
  );

  const totalViews = myListings.reduce((sum, l) => sum + l.viewsCount, 0);
  const totalUnlocks = myListings.reduce((sum, l) => sum + l.unlocksCount, 0);
  const availableCount = myListings.filter((l) => l.status === 'AVAILABLE').length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-6 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-[#1A6B3C] p-6 rounded-3xl text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#F5A623] uppercase tracking-wider block mb-1">
            Dashibodi ya Mwenye Nyumba (Landlord Control Panel)
          </span>
          <h2 className="text-2xl font-black">Vyumba Vyangu & Takwimu</h2>
          <p className="text-xs text-white/80 mt-1">
            Simamia upatikanaji wa vyumba vyako, angalia mionekano, na uweke vyumba vipya.
          </p>
        </div>

        <button
          onClick={() => setActiveView('add_listing')}
          className="py-3 px-5 rounded-2xl bg-[#F5A623] hover:bg-[#e0910f] text-gray-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Ongeza Chumba Kipya</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-xs text-center">
          <div className="text-2xl font-black text-[#1A6B3C]">{availableCount}</div>
          <div className="text-[11px] text-gray-500 font-semibold mt-0.5">Vyumba Hewani</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-xs text-center">
          <div className="text-2xl font-black text-blue-600 flex items-center justify-center gap-1">
            <Eye className="w-5 h-5 text-blue-500" />
            <span>{totalViews}</span>
          </div>
          <div className="text-[11px] text-gray-500 font-semibold mt-0.5">Mionekano (Views)</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-xs text-center">
          <div className="text-2xl font-black text-[#F5A623] flex items-center justify-center gap-1">
            <KeyRound className="w-5 h-5 text-[#F5A623]" />
            <span>{totalUnlocks}</span>
          </div>
          <div className="text-[11px] text-gray-500 font-semibold mt-0.5">Wapangaji Waliofungua</div>
        </div>
      </div>

      {/* Availability Periodic Prompt Banner */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="block font-bold">Kikumbusho cha Upatikanaji (14-day Auto-Check):</strong>
          Mfumo wa ChumbaConnect huuliza wenye nyumba mara kwa mara kuthibitisha kama vyumba bado vipo wazi. Chumba kikiwekwa "Kimechukuliwa" kinafichwa mara moja kutoka kwenye utafutaji wa umma ili wanafunzi wasipige simu bila sababu.
        </div>
      </div>

      {/* Listings List */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
          Orodha ya Vyumba Vyako ({myListings.length})
        </h3>

        {myListings.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-200 space-y-3">
            <div className="text-3xl">🏡</div>
            <h4 className="font-bold text-sm text-gray-800">Bado hujaorodhesha chumba chochote</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Weka chumba chako sasa ili wanafunzi kutoka vyuo vya jirani wakupate haraka.
            </p>
            <button
              onClick={() => setActiveView('add_listing')}
              className="py-2.5 px-5 rounded-xl bg-[#1A6B3C] text-white text-xs font-bold"
            >
              + Weka Chumba cha Kwanza
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {myListings.map((room) => {
              const isAvailable = room.status === 'AVAILABLE';
              return (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={room.photos[0]}
                      alt={room.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 bg-gray-100 border border-gray-200"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            isAvailable
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isAvailable ? '✅ Inapatikana (Hewani)' : '❌ Imechukuliwa (Imehifadhiwa)'}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {room.roomType}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-gray-900 leading-snug">{room.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        📍 {room.area}, {room.region} · 🏫 {room.campusNearby}
                      </p>

                      <div className="mt-2 flex items-center gap-3 text-xs">
                        <span className="font-black text-[#1A6B3C]">
                          TZS {room.price.toLocaleString()}/mwezi
                        </span>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-500 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> {room.viewsCount} mionekano
                        </span>
                        <span className="text-gray-400">·</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <KeyRound className="w-3.5 h-3.5" /> {room.unlocksCount} wamefungua
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                    {/* Toggle Status Button */}
                    {isAvailable ? (
                      <button
                        onClick={() => updateListingStatus(room.id, 'TAKEN')}
                        className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1 border border-rose-200 transition-colors"
                        title="Ficha chumba hiki kisiwe hewani"
                      >
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Weka "Kimechukuliwa"</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => updateListingStatus(room.id, 'AVAILABLE')}
                        className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-200 transition-colors"
                        title="Washa chumba hiki kionekane hewani"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Weka "Kinapatikana"</span>
                      </button>
                    )}

                    {/* Duplicate Listing Button */}
                    <button
                      onClick={() => duplicateListing(room.id)}
                      className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs flex items-center gap-1 transition-colors"
                      title="Nakili chumba hiki kama una chumba kingine kinachofanana"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Nakili (Duplicate)</span>
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => deleteListing(room.id)}
                      className="py-2 px-2.5 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Futa chumba"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
