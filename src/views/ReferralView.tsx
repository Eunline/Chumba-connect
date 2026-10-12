import React from 'react';
import {
  CheckCircle2,
  Clock,
  Copy,
  Gift,
  MessageSquare,
  Send,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReferralView: React.FC = () => {
  const { currentUser, referrals, claimReferralBonus, showToast, currentLang } = useApp();

  const referralLink = `https://chumbaconnect.co.tz/join?ref=${currentUser.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralLink);
    showToast('📋 Kiungo cha rufaa kimenakiliwa (Copied to clipboard)!');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Mambo! Kama unatafuta chumba safi karibu na chuo chako bila madalali, jiunge na ChumbaConnect TZ kupitia link hii: ${referralLink}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareSMS = () => {
    const text = encodeURIComponent(
      `Pata chumba karibu na chuo chako Tanzania kupitia ChumbaConnect TZ: ${referralLink}`
    );
    window.open(`sms:?body=${text}`, '_blank');
  };

  const myReferrals = referrals.filter((r) => r.referrerId === currentUser.id);
  const successfulCount = myReferrals.filter((r) => r.hasPaid).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 space-y-6 pb-24">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#1A6B3C] via-[#14552f] to-[#0f3d22] p-6 sm:p-8 rounded-3xl text-white shadow-xl text-center space-y-3 relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto text-3xl shadow-inner border border-white/20">
          🎁
        </div>

        <h2 className="text-2xl sm:text-3xl font-black">
          {currentLang === 'sw' ? 'Pata Angalifu za Bure za Vyumba!' : 'Earn Free Room Unlocks!'}
        </h2>

        <p className="text-xs sm:text-sm text-white/85 max-w-lg mx-auto leading-relaxed">
          Mwalike mwanachuo au rafiki yako. Kila mtu anayejiunga na kulipa ada ya kwanza ya TZS 2,000,
          wewe unapata <strong className="text-[#F5A623]">chumba kimoja bure (Free Unlock)</strong> bila
          kulipa hata senti!
        </p>

        {/* Unique Referral Link Card */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 max-w-md mx-auto mt-4 text-left">
          <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider block mb-1">
            Kiungo Chako Maalum cha Rufaa (Your Referral Link):
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="bg-transparent text-white font-mono text-xs font-semibold w-full outline-hidden truncate"
            />
            <button
              onClick={handleCopyLink}
              className="py-1.5 px-3 rounded-xl bg-[#F5A623] hover:bg-[#e0910f] text-gray-950 font-black text-xs shrink-0 flex items-center gap-1 shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Nakili</span>
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={handleShareWhatsApp}
            className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Shiriki WhatsApp</span>
          </button>

          <button
            onClick={handleShareSMS}
            className="py-2.5 px-4 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Tuma kwa SMS</span>
          </button>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs text-center">
          <div className="text-2xl font-black text-gray-900">{myReferrals.length}</div>
          <div className="text-[11px] text-gray-500 font-semibold mt-0.5">Waliojiunga</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs text-center">
          <div className="text-2xl font-black text-[#1A6B3C]">{successfulCount}</div>
          <div className="text-[11px] text-gray-500 font-semibold mt-0.5">Wamelipa (TZS 2,000)</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs text-center bg-amber-50/50">
          <div className="text-2xl font-black text-[#F5A623]">
            {currentUser.freeViewsRemaining}
          </div>
          <div className="text-[11px] text-gray-700 font-semibold mt-0.5">Angalifu Bure Zilizopo</div>
        </div>
      </div>

      {/* Friends List Card */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#1A6B3C]" />
            <span>Marafiki Waliojiunga Kupitia Wewe ({myReferrals.length})</span>
          </h3>
          <span className="text-xs text-gray-400">Bonus: 1 Chumba Bure / Mtu</span>
        </div>

        {myReferrals.length === 0 ? (
          <div className="p-8 text-center text-gray-400 space-y-2">
            <Gift className="w-8 h-8 mx-auto opacity-50" />
            <p className="text-xs font-semibold">Bado hakuna rafiki aliyejiunga kupitia kiungo chako.</p>
            <p className="text-[11px] text-gray-400">
              Shiriki kiungo chako kwenye magroup ya WhatsApp ya chuoni sasa!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {myReferrals.map((friend) => (
              <div key={friend.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-gray-900">{friend.refereeName}</h4>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    {friend.refereePhone} ·{' '}
                    {new Date(friend.createdAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {friend.hasPaid ? (
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      Amelipa · Bonus Imepokelewa
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Anasubiriwa Kulipa
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Explanation Rules */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 space-y-1.5 leading-relaxed">
        <strong className="block font-bold">💡 Jinsi Mfumo wa Rufaa Unavyofanya Kazi:</strong>
        <p>1. Shiriki kiungo au nambari yako ya rufaa na rafiki yako anayetafuta chumba.</p>
        <p>2. Rafiki yako anajisajili na kufanya malipo yake ya kwanza ya TZS 2,000 kufungua chumba chochote.</p>
        <p>3. Mfumo unakuongezea angalia 1 bure moja kwa moja kwenye akaunti yako!</p>
      </div>
    </div>
  );
};
