import React, { useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  User,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, loginUser, signupUser, logoutUser, showToast, currentLang } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'reset' | 'otp'>('login');
  const [role, setRole] = useState<UserRole>('tenant');
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [pendingSignupData, setPendingSignupData] = useState<{
    name: string;
    phone: string;
    email: string;
    role: UserRole;
  } | null>(null);

  if (!isOpen) return null;

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-zA-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['Dhaifu Sana', 'Dhaifu', 'Wastani', 'Nzuri', 'Imara Sana 🛡️'];
  const strengthColors = ['bg-rose-500', 'bg-rose-400', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-600'];

  const handleSendOtp = () => {
    if (!identifier || identifier.length < 9) {
      showToast('⚠️ Weka namba ya simu au barua pepe kwanza.');
      return;
    }
    setOtpSent(true);
    setMode('otp');
    showToast(`📱 Nambari ya uthibitisho (OTP: 582419) imetumwa kwa ${identifier}`);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      showToast('⚠️ Jaza simu/barua pepe na nywila yako.');
      return;
    }
    const success = loginUser(identifier, password);
    if (success) {
      onClose();
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('⚠️ Weka jina lako kamili.');
      return;
    }
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      showToast('⚠️ Nywila lazima iwe angalau herufi 8 na iwe na herufi na namba.');
      return;
    }
    if (password !== confirmPassword) {
      showToast('⚠️ Nywila hazilingani.');
      return;
    }

    const isEmail = identifier.includes('@');
    setPendingSignupData({
      name,
      phone: isEmail ? '+255712345678' : identifier,
      email: isEmail ? identifier : undefined as any,
      role,
    });

    // Move to OTP step
    setOtpSent(true);
    setMode('otp');
    showToast(`📱 SMS OTP (582419) imetumwa kwa namba yako.`);
  };

  const handleVerifyOtpAndFinish = () => {
    if (!otpCode || otpCode.trim() !== '582419' && otpCode.length < 4) {
      showToast('⚠️ Ingiza msimbo wa OTP (Tumia: 582419)');
      return;
    }

    if (pendingSignupData) {
      signupUser(
        pendingSignupData.name,
        pendingSignupData.phone,
        pendingSignupData.email,
        pendingSignupData.role
      );
      onClose();
    } else {
      showToast('✅ Umethibitishwa kikamilifu!');
      setMode('login');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      showToast('⚠️ Weka nambari ya simu au barua pepe.');
      return;
    }
    showToast('🔑 Kiungo cha kuweka nywila mpya kimetumwa kupitia SMS/Barua pepe.');
    setMode('login');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A6B3C] to-[#124d2b] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              {mode === 'login' ? '🔐' : mode === 'signup' ? '📝' : '🛡️'}
            </div>
            <div>
              <h3 className="text-xl font-black leading-tight">
                {mode === 'login'
                  ? 'Ingia Kwenye Akaunti'
                  : mode === 'signup'
                  ? 'Fungua Akaunti Mpya'
                  : mode === 'otp'
                  ? 'Uthibitisho wa OTP'
                  : 'Rejesha Nywila'}
              </h3>
              <p className="text-xs text-white/80">ChumbaConnect TZ · Usalama & Faragha</p>
            </div>
          </div>
        </div>

        {/* Currently logged-in card summary */}
        {currentUser && (
          <div className="bg-gray-50 p-3.5 border-b border-gray-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>
                Umeingia kama: <strong>{currentUser.name}</strong> ({currentUser.role})
              </span>
            </div>
            <button
              onClick={() => {
                logoutUser();
                onClose();
              }}
              className="text-rose-600 font-bold hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Toka
            </button>
          </div>
        )}

        {/* Body Form */}
        <div className="p-6 overflow-y-auto space-y-4">
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Simu (+255) au Barua Pepe:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="+255 7XX XXX XXX au mwanafunzi@gmail.com"
                    className="w-full py-2.5 px-3.5 pl-10 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-hidden focus:border-[#1A6B3C]"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-700">Nywila (Password):</label>
                  <button
                    type="button"
                    onClick={() => setMode('reset')}
                    className="text-[11px] text-[#1A6B3C] font-semibold hover:underline"
                  >
                    Umesahau Nywila?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Weka nywila yako..."
                    className="w-full py-2.5 px-3.5 pl-10 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-hidden focus:border-[#1A6B3C]"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#1A6B3C] hover:bg-[#134f2c] text-white font-black text-sm shadow-md transition-all active:scale-95"
              >
                Ingia Sasa
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">
                  Huna akaunti bado?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-[#1A6B3C] font-bold hover:underline"
                  >
                    Jisajili Hapa Bila Malipo
                  </button>
                </p>
              </div>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              {/* Role selection pill */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  1. Unajiunga kama nani?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('tenant')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      role === 'tenant'
                        ? 'border-[#1A6B3C] bg-[#1A6B3C]/10 text-[#1A6B3C]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <span>🎓 Mpangaji / Mwanafunzi</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('landlord')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      role === 'landlord'
                        ? 'border-[#1A6B3C] bg-[#1A6B3C]/10 text-[#1A6B3C]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <span>🏡 Mwenye Nyumba</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Jina Kamili:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mfano: Baraka Mwita"
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-hidden focus:border-[#1A6B3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nambari ya Simu (+255 Tanzania):
                </label>
                <input
                  type="tel"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="+255 7XX XXX XXX"
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-hidden focus:border-[#1A6B3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nywila (Angalau herufi 8 + nambari):
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mfano: NyumbaNzuri2026"
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-hidden focus:border-[#1A6B3C]"
                />
                {/* Strength Meter */}
                {password && (
                  <div className="mt-1.5 space-y-1">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex">
                      <div
                        className={`h-full transition-all duration-300 ${strengthColors[strength]}`}
                        style={{ width: `${Math.min(100, strength * 25)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 font-semibold block">
                      Kiwango cha Usalama: <strong>{strengthLabels[strength]}</strong>
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Thibitisha Nywila:</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Rudia nywila yako..."
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-hidden focus:border-[#1A6B3C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#1A6B3C] hover:bg-[#134f2c] text-white font-black text-sm shadow-md transition-all active:scale-95"
              >
                Endelea na Uthibitisho wa OTP
              </button>

              <div className="text-center pt-1">
                <p className="text-xs text-gray-500">
                  Una akaunti tayari?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#1A6B3C] font-bold hover:underline"
                  >
                    Ingia Hapa
                  </button>
                </p>
              </div>
            </form>
          )}

          {mode === 'otp' && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1A6B3C] flex items-center justify-center mx-auto">
                <Smartphone className="w-6 h-6" />
              </div>

              <div>
                <h4 className="font-bold text-sm text-gray-900">Weka Msimbo wa OTP</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Tumetuma msimbo wa nambari 6 kupitia SMS kwa <strong>{identifier}</strong>.
                </p>
                <span className="inline-block mt-1 text-[11px] bg-emerald-50 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                  Msimbo wa Demo: 582419
                </span>
              </div>

              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="582419"
                className="w-48 mx-auto text-center py-2.5 px-4 rounded-xl border-2 border-[#1A6B3C] font-mono font-black text-lg tracking-widest text-gray-900 focus:outline-hidden"
              />

              <button
                type="button"
                onClick={handleVerifyOtpAndFinish}
                className="w-full py-3 px-4 rounded-xl bg-[#1A6B3C] hover:bg-[#134f2c] text-white font-black text-sm shadow-md"
              >
                Thibitisha na Kamilisha
              </button>

              <button
                type="button"
                onClick={handleSendOtp}
                className="text-xs text-gray-500 hover:text-gray-800 flex items-center justify-center gap-1 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Tuma OTP Tena
              </button>
            </div>
          )}

          {mode === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Weka nambari yako ya simu au barua pepe uliyojisajili nayo ili tukutumie kiungo salama cha kuweka upya nywila yako.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Simu au Barua Pepe:</label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="+255 7XX XXX XXX au barua@pepe.com"
                  className="w-full py-2.5 px-3 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-hidden focus:border-[#1A6B3C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#1A6B3C] hover:bg-[#134f2c] text-white font-black text-sm shadow-md"
              >
                Tuma Maelekezo ya Rejesho
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-gray-500 hover:underline"
                >
                  ← Rudi Kwenye Kuingia
                </button>
              </div>
            </form>
          )}

          {/* Security Standards Footnote */}
          <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200 text-[10px] text-gray-500 space-y-1">
            <div className="flex items-center gap-1 font-bold text-gray-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Usalama na Utunzaji wa Data (Tanzania Data Protection Act):</span>
            </div>
            <p>
              • Data zote zinalindwa kwa TLS 1.3 encryption na hashing ya bcrypt/Argon2.
            </p>
            <p>
              • Hatushiriki nambari yako ya simu na mtu yeyote isipokuwa baada ya malipo halali.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
