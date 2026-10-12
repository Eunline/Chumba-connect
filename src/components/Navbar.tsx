import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Download,
  FileCode2,
  Globe,
  Home,
  LogOut,
  ShieldAlert,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { UserRole } from '../types';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenNotifications: () => void;
  onOpenPwaGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenNotifications,
  onOpenPwaGuide,
}) => {
  const {
    currentUser,
    switchUserRole,
    currentLang,
    setLanguage,
    activeView,
    setActiveView,
    notifications,
    systemConfig,
  } = useApp();

  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const roles: { id: UserRole; titleSw: string; titleEn: string; icon: string; descSw: string }[] = [
    {
      id: 'tenant',
      titleSw: 'Mwanafunzi / Mpangaji',
      titleEn: 'Student / Tenant',
      icon: '🎓',
      descSw: 'Tafuta vyumba karibu na campus yako',
    },
    {
      id: 'landlord',
      titleSw: 'Mwenye Nyumba (Landlord)',
      titleEn: 'Landlord / Host',
      icon: '🏡',
      descSw: 'Orodhesha vyumba na simamia wapangaji',
    },
    {
      id: 'admin',
      titleSw: 'Msimamizi wa Mfumo (Admin)',
      titleEn: 'System Administrator',
      icon: '⚡',
      descSw: 'Thibitisha malipo, dhibiti watumiaji & vyumba',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      {/* Broadcast Announcement Banner if configured */}
      {systemConfig.broadcastBanner && (
        <div className="bg-[#1A6B3C] text-white text-[11px] sm:text-xs py-1.5 px-3 text-center flex items-center justify-center gap-1.5 font-medium overflow-hidden">
          <span className="inline-block w-2 h-2 rounded-full bg-[#F5A623] animate-pulse shrink-0"></span>
          <span className="truncate">{systemConfig.broadcastBanner}</span>
        </div>
      )}

      {/* Main Top Header Bar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo - Compact on mobile */}
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-hidden group shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#1A6B3C] to-[#134f2c] text-white flex items-center justify-center font-black text-base sm:text-lg shadow-sm group-hover:scale-105 transition-transform shrink-0">
            <span className="text-[#F5A623]">C</span>C
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-gray-900 tracking-tight text-base sm:text-lg leading-tight">
                Chumba<span className="text-[#1A6B3C]">Connect</span>
              </span>
              <span className="text-[9px] sm:text-[10px] bg-[#F5A623]/20 text-[#b5730b] font-black px-1.5 py-0.2 rounded-full border border-[#F5A623]/30">
                TZ
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-medium hidden sm:block">
              {currentLang === 'sw' ? 'Vyumba vya Chuo Tanzania' : 'Campus Rentals Tanzania'}
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Desktop-only Role Switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200/80 px-2.5 py-1.5 rounded-full text-xs font-semibold text-gray-800 transition-colors border border-gray-200"
              title="Badili Wasifu (Switch Role)"
            >
              <span>
                {currentUser.role === 'tenant'
                  ? '🎓 Mpangaji'
                  : currentUser.role === 'landlord'
                  ? '🏡 Mwenye Nyumba'
                  : '⚡ Admin'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>
          </div>

          {/* Desktop-only Specs & Docs button */}
          <button
            onClick={() => setActiveView('docs')}
            className={`hidden sm:flex p-2 rounded-xl text-xs font-semibold items-center gap-1.5 transition-colors ${
              activeView === 'docs'
                ? 'bg-[#F5A623] text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
            title="Tazama Nyaraka na Mfumo (Architecture & Deliverables)"
          >
            <FileCode2 className="w-4 h-4" />
            <span className="hidden md:inline">
              {currentLang === 'sw' ? 'Mwongozo & Docs' : 'Specs & Docs'}
            </span>
          </button>

          {/* Desktop-only PWA In-App Install Prompt */}
          {!isInstalled && (
            <button
              onClick={() => {
                if (isInstallable) {
                  install();
                } else {
                  onOpenPwaGuide();
                }
              }}
              className="hidden lg:flex p-2 rounded-xl text-xs font-semibold items-center gap-1.5 bg-[#1A6B3C]/10 text-[#1A6B3C] hover:bg-[#1A6B3C]/20 border border-[#1A6B3C]/20 transition-colors"
              title="Pakua au sakinisha app (Install App)"
            >
              <Download className="w-4 h-4" />
              <span>{currentLang === 'sw' ? 'Sakinisha App' : 'Install PWA'}</span>
            </button>
          )}

          {/* 1. LANGUAGE SWITCHER (Prominent, High-Contrast & Touch-Friendly on all devices) */}
          <button
            onClick={() => setLanguage(currentLang === 'sw' ? 'en' : 'sw')}
            className="h-9 px-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-800 font-bold text-xs flex items-center gap-1.5 border border-gray-200 shadow-2xs transition-all"
            title="Badili Lugha (Switch Language: Kiswahili / English)"
            aria-label="Change Language"
          >
            <Globe className="w-4 h-4 text-[#1A6B3C] shrink-0" />
            <span className="text-[11px] tracking-wide font-black">
              {currentLang === 'sw' ? 'SW' : 'EN'}
            </span>
          </button>

          {/* 2. NOTIFICATIONS BELL (Clear icon with red unread counter) */}
          <button
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 flex items-center justify-center relative border border-gray-200 shadow-2xs transition-all"
            title="Arifa (Notifications)"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4 text-gray-700" />
            {unreadNotifs > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-red-600 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-pulse border-2 border-white shadow-xs">
                {unreadNotifs}
              </span>
            )}
          </button>

          {/* 3. PROFILE / ACCOUNT AVATAR (Clear, Distinctive & Easy to Tap) */}
          <button
            onClick={onOpenAuth}
            className="h-9 px-1.5 sm:px-2 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 border border-gray-200 text-gray-800 flex items-center gap-1.5 shadow-2xs transition-all"
            title="Akaunti Yangu (Account & Profile)"
            aria-label="User Account"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#1A6B3C] to-[#259353] text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="text-[11px] font-bold text-gray-700 hidden sm:inline max-w-20 truncate">
              {currentUser.name ? currentUser.name.split(' ')[0] : 'Akaunti'}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE UTILITY SUB-BAR: Provides immediate access to Role Switching, Docs & Install on mobile without crowding the top row */}
      <div className="md:hidden border-t border-gray-100 bg-gray-50/90 px-3 py-1.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {/* Mobile Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-1 bg-white hover:bg-gray-100 px-2.5 py-1 rounded-full text-[11px] font-bold text-gray-800 border border-gray-200 shadow-2xs"
          >
            <span className="truncate max-w-32">
              {currentUser.role === 'tenant'
                ? '🎓 Mpangaji'
                : currentUser.role === 'landlord'
                ? '🏡 Mwenye Nyumba'
                : '⚡ Admin'}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Mobile Docs link */}
          <button
            onClick={() => setActiveView('docs')}
            className={`py-1 px-2.5 rounded-full text-[11px] font-bold flex items-center gap-1 border transition-colors ${
              activeView === 'docs'
                ? 'bg-[#F5A623] text-white border-[#F5A623]'
                : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-50'
            }`}
          >
            <FileCode2 className="w-3 h-3 text-[#F5A623]" />
            <span>Mwongozo & Docs</span>
          </button>

          {/* Mobile PWA Install */}
          {!isInstalled && (
            <button
              onClick={() => {
                if (isInstallable) {
                  install();
                } else {
                  onOpenPwaGuide();
                }
              }}
              className="py-1 px-2.5 rounded-full text-[11px] font-bold flex items-center gap-1 bg-white text-[#1A6B3C] border border-[#1A6B3C]/30 hover:bg-[#1A6B3C]/10"
            >
              <Download className="w-3 h-3 text-[#1A6B3C]" />
              <span>Sakinisha App</span>
            </button>
          )}
        </div>
      </div>

      {/* Role Selection Dropdown Menu (Accessible on both Mobile & Desktop) */}
      {showRoleMenu && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setShowRoleMenu(false)}
          />
          <div className="absolute left-3 md:left-auto md:right-4 top-full mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-gray-100 mb-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {currentLang === 'sw' ? 'Badili Wasifu wa Mtumiaji' : 'Switch Role Experience'}
              </p>
              <p className="text-xs font-bold text-gray-800 mt-0.5">{currentUser.name}</p>
            </div>
            {roles.map((r) => {
              const isActive = currentUser.role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    switchUserRole(r.id);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl flex items-start gap-3 transition-colors ${
                    isActive
                      ? 'bg-[#1A6B3C]/10 text-[#1A6B3C] font-semibold'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-xl">{r.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">
                        {currentLang === 'sw' ? r.titleSw : r.titleEn}
                      </span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#1A6B3C]" />}
                    </div>
                    <p className="text-[10px] text-gray-500 font-normal mt-0.5 line-clamp-1">
                      {r.descSw}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </header>
  );
};
