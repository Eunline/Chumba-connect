import React, { useState } from 'react';
import {
  Check,
  ChevronDown,
  Filter,
  GraduationCap,
  MapPin,
  RotateCcw,
  Search as SearchIcon,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { RoomCard } from '../components/RoomCard';
import { useApp } from '../context/AppContext';
import { POPULAR_CAMPUSES, TANZANIA_REGIONS } from '../data/mockData';
import { Listing, RoomType } from '../types';

export const SearchView: React.FC = () => {
  const { listings, setSelectedListing, openPaywallForListing, currentLang } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('Zote');
  const [selectedRegion, setSelectedRegion] = useState('Zote');
  const [selectedType, setSelectedType] = useState<string>('Zote');
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [selectedGender, setSelectedGender] = useState('Zote');
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Available room types
  const roomTypes: string[] = ['Zote', 'Single', 'Self-contained', 'Bedsitter', 'Chumba na Sebule'];

  // Only display AVAILABLE listings to public tenants
  const availableRooms = listings.filter((l) => l.status === 'AVAILABLE');

  const filtered = availableRooms.filter((r) => {
    const matchQuery =
      !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.campusNearby.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCampus = selectedCampus === 'Zote' || r.campusNearby.includes(selectedCampus);
    const matchRegion = selectedRegion === 'Zote' || r.region === selectedRegion;
    const matchType = selectedType === 'Zote' || r.roomType === selectedType;
    const matchPrice = r.price <= maxPrice;
    const matchGender =
      selectedGender === 'Zote' ||
      r.genderPreference.includes(selectedGender) ||
      r.genderPreference.includes('Wote');

    return matchQuery && matchCampus && matchRegion && matchType && matchPrice && matchGender;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCampus('Zote');
    setSelectedRegion('Zote');
    setSelectedType('Zote');
    setMaxPrice(300000);
    setSelectedGender('Zote');
  };

  const activeFilterCount =
    (selectedCampus !== 'Zote' ? 1 : 0) +
    (selectedRegion !== 'Zote' ? 1 : 0) +
    (selectedType !== 'Zote' ? 1 : 0) +
    (maxPrice < 300000 ? 1 : 0) +
    (selectedGender !== 'Zote' ? 1 : 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-4 pb-24">
      {/* Search Bar & Filter Toggle */}
      <div className="bg-white p-3 rounded-2xl border border-gray-200/90 shadow-xs flex flex-col sm:flex-row gap-2.5">
        <div className="flex-1 flex items-center gap-2 px-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-800">
          <SearchIcon className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder={
              currentLang === 'sw'
                ? 'Tafuta chuo, eneo, mtaa, au aina ya chumba...'
                : 'Search campus, area, or room type...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 bg-transparent text-xs sm:text-sm font-semibold outline-hidden placeholder:text-gray-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFiltersModal(true)}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
            activeFilterCount > 0
              ? 'bg-[#1A6B3C] text-white border-[#1A6B3C]'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Vichujio (Filters)</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#F5A623] text-gray-950 text-[10px] font-black flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Quick Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {roomTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedType === type
                ? 'bg-[#1A6B3C] text-white shadow-xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {type === 'Zote' ? 'Vyumba Zote' : type}
          </button>
        ))}

        {POPULAR_CAMPUSES.slice(0, 4).map((c) => {
          const short = c.split(' ')[0];
          const isSelected = selectedCampus === short;
          return (
            <button
              key={c}
              onClick={() => setSelectedCampus(isSelected ? 'Zote' : short)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#F5A623] text-gray-950 shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              🏫 {short}
            </button>
          );
        })}
      </div>

      {/* Active Results Summary & Reset */}
      <div className="flex items-center justify-between text-xs text-gray-600 px-1">
        <div>
          Vyumba <strong>{filtered.length}</strong> vimepatikana
          {activeFilterCount > 0 && (
            <span className="text-[#1A6B3C] font-semibold ml-1">· Vichujio {activeFilterCount} vimewashwa</span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-rose-600 font-bold hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Futa Vichujio
          </button>
        )}
      </div>

      {/* Rooms Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-2xl">
            🏚️
          </div>
          <h3 className="font-extrabold text-sm text-gray-900">Hakuna vyumba vinavyolingana na kigezo hiki</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Jaribu kupanua bajeti yako ya mwezi, chagua eneo lingine, au futa vichujio ili uone vyumba vyote vinavyopatikana.
          </p>
          <button
            onClick={resetFilters}
            className="py-2.5 px-5 rounded-xl bg-[#1A6B3C] text-white text-xs font-bold shadow-xs hover:bg-[#134f2c]"
          >
            Onyesha Vyumba Vyote
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((room) => (
            <RoomCard
              key={room.id}
              listing={room}
              onSelect={(r) => setSelectedListing(r)}
              onUnlock={(r) => openPaywallForListing(r)}
            />
          ))}
        </div>
      )}

      {/* ADVANCED FILTERS MODAL */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#1A6B3C]" />
                <h3 className="font-extrabold text-sm text-gray-900">Vichujio vya Vyumba (Filter Options)</h3>
              </div>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Campus Filter */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">Chuo Kilicho Karibu:</label>
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-gray-300 font-semibold text-gray-900"
                >
                  <option value="Zote">Vyuo Vyote Tanzania</option>
                  {POPULAR_CAMPUSES.map((c) => (
                    <option key={c} value={c.split(' ')[0]}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region Filter */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">Mkoa:</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-gray-300 font-semibold text-gray-900"
                >
                  <option value="Zote">Mikoa Yote</option>
                  {Object.keys(TANZANIA_REGIONS).map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-gray-700">Kiwango cha Juu cha Kodi / Mwezi:</label>
                  <span className="font-black text-[#1A6B3C]">TZS {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={400000}
                  step={10000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#1A6B3C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>50,000</span>
                  <span>400,000+</span>
                </div>
              </div>

              {/* Gender Preference */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Jinsia ya Mpangaji:</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Zote', 'Wanaume tu', 'Wanawake tu'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setSelectedGender(g)}
                      className={`py-2 px-2 rounded-xl border text-center font-bold transition-all ${
                        selectedGender === g
                          ? 'border-[#1A6B3C] bg-[#1A6B3C]/10 text-[#1A6B3C]'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
              <button
                onClick={resetFilters}
                className="py-2.5 px-4 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
              >
                Futa Zote
              </button>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#1A6B3C] hover:bg-[#134f2c] text-white font-black shadow-md text-center"
              >
                Tumia Vichujio ({filtered.length} Vyumba)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
