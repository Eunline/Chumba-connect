import React, { useState } from 'react';
import { Check, Filter, GraduationCap, Sparkles, X } from 'lucide-react';
import { POPULAR_CAMPUSES, TANZANIA_REGIONS } from '../data/mockData';
import { RoomType } from '../types';

interface TenantOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    campus?: string;
    maxPrice?: number;
    roomType?: RoomType;
    gender?: string;
  }) => void;
}

export const TenantOnboardingModal: React.FC<TenantOnboardingModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
}) => {
  const [step, setStep] = useState(1);
  const [selectedCampus, setSelectedCampus] = useState(POPULAR_CAMPUSES[0]);
  const [maxBudget, setMaxBudget] = useState(150000);
  const [selectedType, setSelectedType] = useState<RoomType>('Self-contained');
  const [selectedGender, setSelectedGender] = useState('Wote (Any)');

  if (!isOpen) return null;

  const roomTypes: RoomType[] = ['Single', 'Self-contained', 'Bedsitter', 'Chumba na Sebule'];

  const handleFinish = () => {
    onApplyFilters({
      campus: selectedCampus,
      maxPrice: maxBudget,
      roomType: selectedType,
      gender: selectedGender,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-5 border border-gray-100">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <h3 className="font-extrabold text-base text-gray-900">
              Mwongozo wa Kutafuta Chumba (Onboarding)
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                1. Unasoma chuo gani au unapendelea eneo gani?
              </label>
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900"
              >
                {POPULAR_CAMPUSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">2. Bajeti yako ya juu kwa mwezi:</label>
                <span className="text-xs font-extrabold text-[#1A6B3C]">
                  TZS {maxBudget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={350000}
                step={10000}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-[#1A6B3C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>TZS 50,000</span>
                <span>TZS 350,000+</span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-xl bg-[#1A6B3C] text-white font-bold text-xs shadow-md"
            >
              Endelea (Hatua ya 2) →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                3. Aina ya chumba unayotaka:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {roomTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedType(t)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      selectedType === t
                        ? 'border-[#1A6B3C] bg-[#1A6B3C]/10 text-[#1A6B3C]'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                4. Mapendekezo ya Jinsia:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Wote (Any)', 'Wanaume tu', 'Wanawake tu'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGender(g)}
                    className={`py-2 px-2 text-[11px] font-bold rounded-xl border text-center transition-all ${
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

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="py-2.5 px-4 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs"
              >
                ← Rudi
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#1A6B3C] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                Onyesha Vyumba Vinavyonifaa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
