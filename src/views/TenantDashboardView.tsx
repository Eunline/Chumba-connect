import React from 'react';
import {
  ExternalLink,
  Gift,
  KeyRound,
  LogOut,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TenantDashboardView: React.FC = () => {
  const {
    currentUser,
    listings,
    logoutUser,
    setActiveView,
    setSelectedListing,
    currentLang,
    showToast,
  } = useApp();

  const unlockedRooms = listings.filter((l) =>
    currentUser.unlockedListings.includes(l.id)
  );

  const handleLogoutAllDevices = () => {
    logoutUser();
    showToast('🔒 Umetoka kwenye vifaa vyote kwa usalama (All sessions invalidated).');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 space-y-6 pb-24 text-xs">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1A6B3C] to-[#2ca760] text-white font-black text-xl flex items-center justify-center shadow-md">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-gray-900">{currentUser.name}</h2>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Mwanafunzi / Mpangaji
              </span>
            </div>
            <p className="text-gray-500 font-medium mt-0.5">{currentUser.phone}</p>
            <p className="text-gray-400 text-[11px] font-mono mt-0.5">
              Msimbo wa Rufaa: <strong>{currentUser.referralCode}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-center">
            <span className="text-xl font-black text-[#F5A623] block leading-tight">
              {currentUser.freeViewsRemaining}
            </span>
            <span className="text-[10px] font-bold text-gray-600">Angalifu Bure</span>
          </div>
        </div>
      </div>

      {/* Unlocked Rooms List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#1A6B3C]" />
            <span>Vyumba Ulivyofungua Mawasiliano ({unlockedRooms.length})</span>
          </h3>
          <button
            onClick={() => setActiveView('search')}
            className="text-[#1A6B3C] font-bold hover:underline flex items-center gap-1"
          >
            <Search className="w-3.5 h-3.5" /> Tafuta Zaidi
          </button>
        </div>

        {unlockedRooms.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-gray-200 text-center space-y-2">
            <KeyRound className="w-8 h-8 text-gray-400 mx-auto" />
            <h4 className="font-bold text-gray-800">Bado hujafungua mawasiliano ya chumba chochote</h4>
            <p className="text-gray-500 max-w-sm mx-auto">
              Ukipata chumba unachokipenda, lipa TZS 2,000 na nambari ya simu na WhatsApp ya mwenye nyumba itahifadhiwa hapa.
            </p>
            <button
              onClick={() => setActiveView('search')}
              className="mt-2 py-2 px-4 rounded-xl bg-[#1A6B3C] text-white font-bold"
            >
              Tazama Vyumba Vilivyopo
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {unlockedRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl border border-emerald-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img src={room.photos[0]} alt={room.title} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{room.title}</h4>
                    <p className="text-gray-500 text-[11px]">
                      📍 {room.area} · TZS {room.price.toLocaleString()}/mwezi
                    </p>
                    <div className="mt-1 font-bold text-emerald-800 flex items-center gap-2">
                      <span>Mwenye Nyumba: {room.landlordName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${room.landlordPhone}`}
                    className="py-2 px-3 rounded-xl bg-[#1A6B3C] text-white font-bold flex items-center gap-1 hover:bg-[#134f2c]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Piga Simu</span>
                  </a>

                  {room.landlordWhatsapp && (
                    <a
                      href={`https://wa.me/${room.landlordWhatsapp.replace(/\+/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 rounded-xl bg-[#25D366] text-white font-bold flex items-center gap-1 hover:bg-[#1ebd5b]"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedListing(room)}
                    className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                  >
                    Maelezo
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Security Box */}
      <div className="bg-gray-50 rounded-3xl border border-gray-200 p-5 space-y-3">
        <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Usalama wa Akaunti (Account Security)</span>
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Akaunti yako inalindwa kwa msimbo wa OTP na usimbaji salama wa data. Iwapo unatumia simu ya pamoja au ya chuo, unaweza kufunga vipindi vyote vya sasa.
        </p>

        <div className="pt-2 flex flex-wrap gap-2">
          <button
            onClick={handleLogoutAllDevices}
            className="py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Toka Kwenye Vifaa Vyote (Logout All Devices)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
