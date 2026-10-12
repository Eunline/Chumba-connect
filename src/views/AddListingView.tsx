import React, { useState } from 'react';
import {
  Camera,
  Check,
  CheckCircle2,
  Droplets,
  GraduationCap,
  Image as ImageIcon,
  Info,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POPULAR_CAMPUSES, TANZANIA_REGIONS } from '../data/mockData';
import {
  ElectricityStatus,
  GenderPreference,
  Listing,
  RoomType,
  WaterStatus,
} from '../types';

export const AddListingView: React.FC = () => {
  const { addListing, currentUser, showToast, currentLang } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('Dar es Salaam');
  const [district, setDistrict] = useState('Kinondoni');
  const [area, setArea] = useState('');
  const [campusNearby, setCampusNearby] = useState(POPULAR_CAMPUSES[0]);
  const [distanceFromCampus, setDistanceFromCampus] = useState('Dakika 5 kwa miguu');
  const [price, setPrice] = useState<number>(120000);
  const [roomType, setRoomType] = useState<RoomType>('Self-contained');
  const [waterStatus, setWaterStatus] = useState<WaterStatus>('Maji ya bomba (24/7)');
  const [electricityStatus, setElectricityStatus] = useState<ElectricityStatus>('TANESCO (Luku binafsi)');
  const [genderPreference, setGenderPreference] = useState<GenderPreference>('Wote (Any)');
  const [houseRules, setHouseRules] = useState('');
  const [phone, setPhone] = useState(currentUser.phone || '+2557');
  const [whatsapp, setWhatsapp] = useState(currentUser.phone || '+2557');
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
  ]);

  const [selectedFurnishings, setSelectedFurnishings] = useState<string[]>([
    'Kitanda',
    'Godoro',
  ]);

  const sampleFurnishingList = [
    'Kitanda',
    'Godoro',
    'Meza',
    'Kiti',
    'Wardrobe',
    'Feni ya dari',
    'Sofa',
    'TV',
    'Sink ya jikoni',
    'Tupu (Empty)',
  ];

  const handleRegionChange = (newReg: string) => {
    setRegion(newReg);
    const districts = TANZANIA_REGIONS[newReg] || ['Mjini'];
    setDistrict(districts[0]);
  };

  const toggleFurnishing = (item: string) => {
    if (selectedFurnishings.includes(item)) {
      setSelectedFurnishings((prev) => prev.filter((f) => f !== item));
    } else {
      setSelectedFurnishings((prev) => [...prev, item]);
    }
  };

  const handleAddSamplePhoto = () => {
    if (photos.length >= 10) {
      showToast('⚠️ Upeo wa juu ni picha 10 kwa chumba kimoja.');
      return;
    }
    const samplePool = [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    ];
    const nextPhoto = samplePool[photos.length % samplePool.length];
    setPhotos((prev) => [...prev, nextPhoto]);
    showToast('📷 Picha imeongezwa!');
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !area.trim() || !phone.trim() || price <= 0) {
      showToast('⚠️ Tafadhali jaza Jina la chumba, Eneo, Kodi, na Simu.');
      return;
    }

    addListing({
      landlordId: currentUser.id,
      landlordName: currentUser.name,
      landlordPhone: phone,
      landlordWhatsapp: whatsapp || phone,
      landlordEmail: currentUser.email,
      title: title.trim(),
      description: description.trim() || 'Chumba kizuri na safi kwa ajili ya mwanafunzi.',
      region,
      district,
      area: area.trim(),
      campusNearby,
      distanceFromCampus,
      price,
      roomType,
      furnishing: selectedFurnishings.length ? selectedFurnishings : ['Tupu'],
      waterStatus,
      electricityStatus,
      genderPreference,
      houseRules: houseRules.trim() || 'Utulivu na usafi wa mazingira unazingatiwa.',
      photos: photos.length ? photos : ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'],
      status: 'AVAILABLE',
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 space-y-5 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1A6B3C] to-[#124d2b] p-6 rounded-3xl text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-xs font-bold text-[#F5A623]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fomu ya Mwenye Nyumba (Landlord Form)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black">➕ Orodhesha Chumba Chako Tanzania</h2>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          Weka maelezo sahihi ya chumba chako ili wanafunzi na wapangaji wakipate kwa urahisi.
          Hakuna malipo ya kutangaza!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-7 shadow-xs space-y-6">
        {/* Photo Upload Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#1A6B3C]" />
              <span>1. Picha za Chumba (Picha {photos.length} kati ya 10)</span>
            </label>
            <span className="text-[11px] text-gray-400">Max 10 images</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {photos.map((p, idx) => (
              <div key={idx} className="relative aspect-4/3 rounded-2xl overflow-hidden border border-gray-200 group">
                <img src={p} alt={`Chumba ${idx}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Kuu (Cover)
                  </span>
                )}
              </div>
            ))}

            {photos.length < 10 && (
              <button
                type="button"
                onClick={handleAddSamplePhoto}
                className="aspect-4/3 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#1A6B3C] bg-gray-50 flex flex-col items-center justify-center text-gray-500 hover:text-[#1A6B3C] transition-colors p-2 text-center"
              >
                <Plus className="w-6 h-6 mb-1" />
                <span className="text-xs font-bold">Ongeza Picha</span>
                <span className="text-[10px] text-gray-400">Pakia picha zaidi</span>
              </button>
            )}
          </div>
        </div>

        {/* Basic Title & Description */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              2. Kichwa cha Chumba (Title):
            </label>
            <input
              type="text"
              required
              placeholder="Mfano: Chumba Kizuri Self-Contained Mwenge karibu na UDSM"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:outline-hidden focus:border-[#1A6B3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Maelezo ya Ziada (Description):
            </label>
            <textarea
              rows={3}
              placeholder="Eleza sifa maalum, mazingira, tiles, feni, ulinzi wa geti, au utaratibu wa usafi..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-hidden focus:border-[#1A6B3C]"
            />
          </div>
        </div>

        {/* Location Region -> District -> Area */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <label className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#1A6B3C]" />
            <span>3. Mahali Nyumba Ilipo (Location Hierarchy)</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="font-bold text-gray-600 block mb-1">Mkoa (Region):</span>
              <select
                value={region}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-300 font-semibold text-gray-900"
              >
                {Object.keys(TANZANIA_REGIONS).map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="font-bold text-gray-600 block mb-1">Wilaya (District):</span>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-300 font-semibold text-gray-900"
              >
                {(TANZANIA_REGIONS[region] || ['Mjini']).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="font-bold text-gray-600 block mb-1">Eneo / Mtaa (Area):</span>
              <input
                type="text"
                required
                placeholder="Mfano: Mwenge Kituoni / Bwawani"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 font-semibold text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Campus proximity & Distance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-100 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#1A6B3C]" />
              <span>Chuo Kilicho Karibu:</span>
            </label>
            <select
              value={campusNearby}
              onChange={(e) => setCampusNearby(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-gray-300 font-semibold text-gray-900"
            >
              {POPULAR_CAMPUSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Umbali Kutoka Chuo (Distance):
            </label>
            <select
              value={distanceFromCampus}
              onChange={(e) => setDistanceFromCampus(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-gray-300 font-semibold text-gray-900"
            >
              <option value="Chini ya dakika 5 kwa miguu">Chini ya dakika 5 kwa miguu</option>
              <option value="Dakika 5 - 10 kwa miguu">Dakika 5 - 10 kwa miguu</option>
              <option value="Dakika 10 - 20 kwa miguu">Dakika 10 - 20 kwa miguu</option>
              <option value="Dakika 3 kwa Bodaboda / Daladala">Dakika 3 kwa Bodaboda / Daladala</option>
            </select>
          </div>
        </div>

        {/* Price & Room Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-100 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Kodi kwa Mwezi (TZS):
            </label>
            <div className="relative">
              <input
                type="number"
                required
                min={20000}
                step={5000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-300 font-black text-gray-900 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                TZS
              </span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Aina ya Chumba (Room Type):</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value as RoomType)}
              className="w-full py-2.5 px-3 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm"
            >
              <option value="Single">Single Room</option>
              <option value="Self-contained">Self-contained (Choo/Bafu ndani)</option>
              <option value="Bedsitter">Bedsitter (Jiko dogo + choo)</option>
              <option value="Chumba na Sebule">Chumba na Sebule</option>
              <option value="Other">Nyingine (Other)</option>
            </select>
          </div>
        </div>

        {/* Utilities & Amenities */}
        <div className="space-y-3 pt-2 border-t border-gray-100 text-xs">
          <label className="font-extrabold text-gray-900 block">
            4. Huduma & Samani Zilizopo
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="font-bold text-gray-600 block mb-1">💧 Maji (Water Status):</span>
              <select
                value={waterStatus}
                onChange={(e) => setWaterStatus(e.target.value as WaterStatus)}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 font-semibold"
              >
                <option value="Maji ya bomba (24/7)">Maji ya bomba (24/7)</option>
                <option value="Maji ya bomba (Mgao)">Maji ya bomba (Mgao)</option>
                <option value="Tanki la maji">Tanki la maji ya akiba</option>
                <option value="Kisima">Kisima salama</option>
              </select>
            </div>

            <div>
              <span className="font-bold text-gray-600 block mb-1">⚡ Umeme (Electricity):</span>
              <select
                value={electricityStatus}
                onChange={(e) => setElectricityStatus(e.target.value as ElectricityStatus)}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 font-semibold"
              >
                <option value="TANESCO (Luku binafsi)">TANESCO (Luku binafsi)</option>
                <option value="TANESCO (Luku ya pamoja)">TANESCO (Luku ya pamoja)</option>
                <option value="Solar">Umeme wa Jua (Solar)</option>
                <option value="Jenereta">Jenereta ya dharura</option>
              </select>
            </div>

            <div>
              <span className="font-bold text-gray-600 block mb-1">👥 Jinsia Inayoruhusiwa:</span>
              <select
                value={genderPreference}
                onChange={(e) => setGenderPreference(e.target.value as GenderPreference)}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 font-semibold"
              >
                <option value="Wote (Any)">Wote (Wanaume na Wanawake)</option>
                <option value="Wanaume tu (Male only)">Wanaume tu</option>
                <option value="Wanawake tu (Female only)">Wanawake tu</option>
              </select>
            </div>
          </div>

          <div>
            <span className="font-bold text-gray-700 block mb-2">Samani Zilizopo (Furnishing):</span>
            <div className="flex flex-wrap gap-2">
              {sampleFurnishingList.map((item) => {
                const isChecked = selectedFurnishings.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleFurnishing(item)}
                    className={`py-1.5 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isChecked
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 text-amber-700" />}
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Sheria za Nyumba (House Rules):</label>
            <input
              type="text"
              placeholder="Mfano: Hakuna kelele usiku baada ya saa 4, wageni waripotiwe mlangoni..."
              value={houseRules}
              onChange={(e) => setHouseRules(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs"
            />
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-3 pt-2 border-t border-gray-100 text-xs">
          <label className="font-extrabold text-gray-900 flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-[#1A6B3C]" />
            <span>5. Mawasiliano Yako (Yatafunguliwa Baada ya Malipo)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="font-bold text-gray-600 block mb-1">Nambari ya Simu:</span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+255 7XX XXX XXX"
                className="w-full py-2 px-3 rounded-xl border border-gray-300 font-bold"
              />
            </div>
            <div>
              <span className="font-bold text-gray-600 block mb-1">Nambari ya WhatsApp:</span>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+255 7XX XXX XXX"
                className="w-full py-2 px-3 rounded-xl border border-gray-300 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-[#1A6B3C] hover:bg-[#134f2c] text-white font-black text-sm shadow-xl shadow-[#1A6B3C]/20 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
            <span>Chapisha Chumba Hewani Sasa (Post Listing)</span>
          </button>
          <p className="text-[11px] text-gray-400 text-center mt-2">
            Chumba kitachapishwa mara moja na wanafunzi wataweza kukitafuta na kufungua mawasiliano yako.
          </p>
        </div>
      </form>
    </div>
  );
};
