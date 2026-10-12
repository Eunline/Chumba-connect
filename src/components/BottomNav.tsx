import React from 'react';
import { Gift, Home, Plus, Search, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeView, setActiveView, currentLang, currentUser } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-1.5 shadow-lg max-w-lg md:max-w-2xl mx-auto md:rounded-t-2xl">
      <div className="flex items-center justify-around">
        {/* Nyumbani (Home) */}
        <button
          onClick={() => setActiveView('home')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            activeView === 'home'
              ? 'text-[#1A6B3C] font-bold scale-105'
              : 'text-gray-500 hover:text-gray-800 font-medium'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">
            {currentLang === 'sw' ? 'Nyumbani' : 'Home'}
          </span>
        </button>

        {/* Vyumba (Search) */}
        <button
          onClick={() => setActiveView('search')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            activeView === 'search'
              ? 'text-[#1A6B3C] font-bold scale-105'
              : 'text-gray-500 hover:text-gray-800 font-medium'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px]">
            {currentLang === 'sw' ? 'Vyumba' : 'Rooms'}
          </span>
        </button>

        {/* Add Listing Floating Button */}
        <button
          onClick={() => setActiveView('add_listing')}
          className="flex flex-col items-center gap-0.5 -mt-5 group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1A6B3C] to-[#259353] text-white flex items-center justify-center shadow-lg shadow-[#1A6B3C]/30 border-4 border-white group-hover:scale-110 active:scale-95 transition-all">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-bold text-gray-700">
            {currentLang === 'sw' ? 'Weka' : 'Post'}
          </span>
        </button>

        {/* Rufaa & Zawadi */}
        <button
          onClick={() => setActiveView('referral')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all relative ${
            activeView === 'referral'
              ? 'text-[#1A6B3C] font-bold scale-105'
              : 'text-gray-500 hover:text-gray-800 font-medium'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="text-[10px]">
            {currentLang === 'sw' ? 'Rufaa' : 'Rewards'}
          </span>
          {currentUser.freeViewsRemaining > 0 && (
            <span className="absolute top-0.5 right-1 w-2 h-2 rounded-full bg-[#F5A623]"></span>
          )}
        </button>

        {/* Role Specific Dashboard (Admin / Landlord / Tenant Account) */}
        {currentUser.role === 'admin' ? (
          <button
            onClick={() => setActiveView('admin')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
              activeView === 'admin'
                ? 'text-[#1A6B3C] font-bold scale-105'
                : 'text-gray-500 hover:text-gray-800 font-medium'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px]">Admin</span>
          </button>
        ) : currentUser.role === 'landlord' ? (
          <button
            onClick={() => setActiveView('landlord_dash')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
              activeView === 'landlord_dash'
                ? 'text-[#1A6B3C] font-bold scale-105'
                : 'text-gray-500 hover:text-gray-800 font-medium'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">
              {currentLang === 'sw' ? 'Vyumba Vyangu' : 'My Rooms'}
            </span>
          </button>
        ) : (
          <button
            onClick={() => setActiveView('tenant_dash')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
              activeView === 'tenant_dash'
                ? 'text-[#1A6B3C] font-bold scale-105'
                : 'text-gray-500 hover:text-gray-800 font-medium'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">
              {currentLang === 'sw' ? 'Akaunti' : 'Account'}
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};
