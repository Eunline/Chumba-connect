import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Compass,
  Download,
  Filter,
  GraduationCap,
  Home,
  KeyRound,
  Lock,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Users,
} from 'lucide-react';
import { RoomCard } from '../components/RoomCard';
import { useApp } from '../context/AppContext';
import { POPULAR_CAMPUSES } from '../data/mockData';
import { Listing } from '../types';

interface HomeViewProps {
  onOpenOnboarding: () => void;
  onOpenPwaGuide: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenOnboarding, onOpenPwaGuide }) => {
  const {
    listings,
    setActiveView,
    currentLang,
    setSelectedListing,
    openPaywallForListing,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampusPill, setSelectedCampusPill] = useState<string>('Zote');

  // Filter available rooms for public homepage
  const availableRooms = listings.filter((l) => l.status === 'AVAILABLE');

  const filteredRooms = availableRooms.filter((r) => {
    const matchSearch =
      !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.campusNearby.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCampus =
      selectedCampusPill === 'Zote' || r.campusNearby.includes(selectedCampusPill);
    return matchSearch && matchCampus;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('search');
  };

  return (
    <div className="space-y-6 pb-24 max-w-6xl mx-auto px-4 pt-3">
      {/* HERO SECTION */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#1A6B3C] via-[#14532e] to-[#0d381e] text-white p-6 sm:p-10 shadow-xl overflow-hidden">
        {/* Background glow and motifs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">
            <span className="text-[#F5A623]">🇹🇿</span>
            <span>
              {currentLang === 'sw'
                ? 'Mtandao Rasmi wa Vyumba vya Chuo Tanzania'
                : 'Tanzania Campus Housing Network'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Pata Chumba Safi Karibu na Chuo Chako bila Dalali Feki
          </h1>

          <p className="text-sm sm:text-base text-white/85 leading-relaxed">
            Tafuta vyumba vya kupanga karibu na UDSM, UDOM, SAUT, MUST, SUA na vyuo vingine vyote.
            Ona bei halisi, picha kamili, na wasiliana na mwenye nyumba moja kwa moja.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="pt-2 flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-2xl shadow-xl max-w-xl"
          >
            <div className="flex-1 flex items-center gap-2 px-3 text-gray-800">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder={
                  currentLang === 'sw'
                    ? 'Tafuta chuo, eneo, au mtaa (e.g. Mwenge, SAUT)...'
                    : 'Search campus or area...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 bg-transparent text-xs sm:text-sm font-semibold outline-hidden placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-[#F5A623] hover:bg-[#e0910f] text-gray-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{currentLang === 'sw' ? 'Tafuta Chumba' : 'Search Room'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Questionnaire Launcher */}
          <div className="pt-1 flex items-center gap-3">
            <button
              onClick={onOpenOnboarding}
              className="text-xs font-bold text-[#F5A623] hover:text-white flex items-center gap-1.5 transition-colors underline"
            >
              <Sparkles className="w-4 h-4" />
              {currentLang === 'sw'
                ? 'Kipima Bajeti: Pata Chumba Kulingana na Pesa Yako'
                : 'Student Budget Finder Wizard'}
            </button>
          </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs text-center">
        <div>
          <div className="text-lg sm:text-2xl font-black text-[#1A6B3C]">200+</div>
          <div className="text-[11px] text-gray-500 font-semibold">Vyumba Vilivyopo</div>
        </div>
        <div className="border-x border-gray-200">
          <div className="text-lg sm:text-2xl font-black text-[#F5A623]">50+</div>
          <div className="text-[11px] text-gray-500 font-semibold">Maeneo ya Vyuo</div>
        </div>
        <div>
          <div className="text-lg sm:text-2xl font-black text-gray-900">1,500+</div>
          <div className="text-[11px] text-gray-500 font-semibold">Wanafunzi Wameridhika</div>
        </div>
      </div>

      {/* QUICK ROLE ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => setActiveView('search')}
          className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-3xl border-2 border-emerald-200 hover:border-emerald-400 cursor-pointer shadow-xs hover:shadow-md transition-all group"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#1A6B3C] text-white flex items-center justify-center text-2xl shadow-sm">
              🎓
            </div>
            <span className="text-xs font-bold text-[#1A6B3C] bg-emerald-100 px-3 py-1 rounded-full group-hover:translate-x-1 transition-transform">
              Tafuta Sasa →
            </span>
          </div>
          <h3 className="text-base font-black text-gray-900 mt-3">Mimi ni Mwanafunzi / Mpangaji</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Chagua chuo chako, linganisha bei za vyumba, maji, umeme, na fungua mawasiliano ya mwenye nyumba moja kwa moja bila usumbufu.
          </p>
        </div>

        <div
          onClick={() => setActiveView('add_listing')}
          className="bg-gradient-to-br from-amber-50 to-white p-5 rounded-3xl border-2 border-amber-200 hover:border-amber-400 cursor-pointer shadow-xs hover:shadow-md transition-all group"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#F5A623] text-gray-950 flex items-center justify-center text-2xl shadow-sm">
              🏡
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full group-hover:translate-x-1 transition-transform">
              Weka Chumba →
            </span>
          </div>
          <h3 className="text-base font-black text-gray-900 mt-3">Mimi ni Mwenye Nyumba (Landlord)</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Una chumba au nyumba wazi karibu na chuo? Tangaza bure hapa upate wanafunzi wa uhakika ndani ya masaa 24.
          </p>
        </div>
      </div>

      {/* POPULAR CAMPUSES PILLS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#1A6B3C]" />
            Vyuo Maarufu Tanzania
          </h2>
          <button
            onClick={() => setActiveView('search')}
            className="text-xs font-bold text-[#1A6B3C] hover:underline"
          >
            Tazama Vyuo Zote ({POPULAR_CAMPUSES.length}) →
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedCampusPill('Zote')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCampusPill === 'Zote'
                ? 'bg-[#1A6B3C] text-white shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Vyuo Zote
          </button>
          {POPULAR_CAMPUSES.slice(0, 6).map((c) => {
            const shortName = c.split(' ')[0];
            const isSelected = selectedCampusPill === shortName;
            return (
              <button
                key={c}
                onClick={() => setSelectedCampusPill(isSelected ? 'Zote' : shortName)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#1A6B3C] text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                🏫 {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* FEATURED AVAILABLE ROOMS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F5A623]" />
              Vyumba Vipya Vinavyopatikana Sasa 🔥
            </h2>
            <p className="text-xs text-gray-500">
              Vyumba vilivyothibitishwa na wenye nyumba hivi karibuni
            </p>
          </div>
          <button
            onClick={() => setActiveView('search')}
            className="text-xs font-bold text-[#1A6B3C] hover:underline"
          >
            Orodha Kamili →
          </button>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center space-y-2">
            <div className="text-3xl">🏠</div>
            <h3 className="font-bold text-sm text-gray-800">Hakuna vyumba vinavyolingana na utafutaji wako</h3>
            <p className="text-xs text-gray-500">Jaribu kubadili jina la chuo au futa utafutaji.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCampusPill('Zote');
              }}
              className="mt-2 py-2 px-4 rounded-xl bg-gray-100 text-xs font-bold text-gray-700 hover:bg-gray-200"
            >
              Onyesha Vyumba Zote
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                listing={room}
                onSelect={(r) => setSelectedListing(r)}
                onUnlock={(r) => openPaywallForListing(r)}
              />
            ))}
          </div>
        )}
      </div>

      {/* HOW IT WORKS BANNER */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/90 space-y-4">
        <div className="text-center max-w-lg mx-auto">
          <span className="text-[11px] font-bold text-[#1A6B3C] bg-[#1A6B3C]/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Rahisi & Salama
          </span>
          <h3 className="text-lg font-black text-gray-900 mt-2">Jinsi ChumbaConnect Inavyofanya Kazi</h3>
          <p className="text-xs text-gray-500 mt-1">
            Mchakato rahisi wa hatua tatu kwa wanafunzi na wenye nyumba
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#1A6B3C]/10 text-[#1A6B3C] font-black text-sm flex items-center justify-center mx-auto">
              1
            </div>
            <h4 className="font-extrabold text-xs text-gray-900">Tafuta Chumba</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Tazama picha, umbali kutoka chuo, maji na umeme, kisha chagua chumba kinachokufaa.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#F5A623]/20 text-[#a06606] font-black text-sm flex items-center justify-center mx-auto">
              2
            </div>
            <h4 className="font-extrabold text-xs text-gray-900">Lipa TZS 2,000</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Lipa ada ndogo ya huduma kupitia M-Pesa, Airtel, Tigo au Halopesa kufungua mawasiliano.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center mx-auto">
              3
            </div>
            <h4 className="font-extrabold text-xs text-gray-900">Wasiliana Moja kwa Moja</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Piga simu au chat WhatsApp na mwenye nyumba, fanya ukaguzi wa chumba na uhamie!
            </p>
          </div>
        </div>
      </div>

      {/* INSTALL APP PROMPT CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white text-[#1A6B3C] font-black text-2xl flex items-center justify-center shrink-0 shadow-md">
            CC
          </div>
          <div>
            <h3 className="text-base font-extrabold">Sakinisha ChumbaConnect Kwenye Simu Yako</h3>
            <p className="text-xs text-gray-300 mt-0.5">
              Inafanya kazi bila bando kubwa na inafunguka kama App rasmi ya Android & iPhone.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenPwaGuide}
          className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#1A6B3C] hover:bg-[#14532e] text-white font-bold text-xs flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
        >
          <Download className="w-4 h-4" />
          <span>Mwongozo wa Kusakinisha App</span>
        </button>
      </div>
    </div>
  );
};
