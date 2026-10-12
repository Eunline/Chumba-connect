import React, { useState } from 'react';
import {
  AlertTriangle,
  Ban,
  CheckCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  Edit,
  Eye,
  KeyRound,
  Lock,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Trash2,
  Users,
  XCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LipaNumberConfig, PaymentOperator, PaymentStatus } from '../types';

export const AdminView: React.FC = () => {
  const {
    payments,
    allUsers,
    listings,
    lipaNumbers,
    systemConfig,
    approvePayment,
    rejectPayment,
    updateLipaNumber,
    updateSystemConfig,
    toggleUserBan,
    updateListingStatus,
    deleteListing,
    showToast,
    currentLang,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'payments' | 'users' | 'listings' | 'lipa' | 'settings'>('payments');
  const [paymentFilter, setPaymentFilter] = useState<'ALL' | 'PENDING' | 'SUCCESS'>('ALL');
  const [userSearch, setUserSearch] = useState('');
  const [listingSearch, setListingSearch] = useState('');

  // Editable Lipa state
  const [editingOperator, setEditingOperator] = useState<PaymentOperator | null>(null);
  const [editLipaVal, setEditLipaVal] = useState('');
  const [editAccountVal, setEditAccountVal] = useState('');

  // Editable settings
  const [broadcastVal, setBroadcastVal] = useState(systemConfig.broadcastBanner || '');
  const [priceVal, setPriceVal] = useState(systemConfig.unlockPriceTZS);

  const pendingPayments = payments.filter((p) => p.status === 'PENDING');
  const filteredPayments = payments.filter((p) => {
    if (paymentFilter === 'PENDING') return p.status === 'PENDING';
    if (paymentFilter === 'SUCCESS') return p.status === 'SUCCESS';
    return true;
  });

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.phone.includes(userSearch) ||
      u.role.includes(userSearch.toLowerCase())
  );

  const filteredListings = listings.filter(
    (l) =>
      l.title.toLowerCase().includes(listingSearch.toLowerCase()) ||
      l.area.toLowerCase().includes(listingSearch.toLowerCase()) ||
      l.landlordName.toLowerCase().includes(listingSearch.toLowerCase())
  );

  const handleStartEditLipa = (conf: LipaNumberConfig) => {
    setEditingOperator(conf.operator);
    setEditLipaVal(conf.lipaNumber);
    setEditAccountVal(conf.accountName);
  };

  const handleSaveLipa = () => {
    if (editingOperator && editLipaVal) {
      updateLipaNumber(editingOperator, editLipaVal, editAccountVal);
      setEditingOperator(null);
    }
  };

  const handleSaveSystemSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSystemConfig({
      broadcastBanner: broadcastVal,
      unlockPriceTZS: priceVal,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-5 pb-24">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-950 p-6 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F5A623] text-gray-950 font-black text-xl flex items-center justify-center shadow-md">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black">Panel ya Msimamizi (Admin Control)</h2>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              Idhinisha malipo ya Lipa Namba, dhibiti watumiaji & vyumba, na sasisha mipangilio ya mfumo.
            </p>
          </div>
        </div>

        {/* Quick pending badge alert */}
        {pendingPayments.length > 0 && (
          <div className="bg-amber-500/20 border border-amber-500/40 p-3 rounded-2xl flex items-center gap-2.5 text-xs text-amber-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>
              Malipo <strong>{pendingPayments.length}</strong> yanasubiri idhini yako!
            </span>
          </div>
        )}
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto gap-2 pb-1 no-scrollbar text-xs font-bold">
        <button
          onClick={() => setActiveAdminTab('payments')}
          className={`py-2.5 px-4 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeAdminTab === 'payments'
              ? 'bg-[#1A6B3C] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Malipo & Idhini</span>
          {pendingPayments.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
              {pendingPayments.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('users')}
          className={`py-2.5 px-4 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeAdminTab === 'users'
              ? 'bg-[#1A6B3C] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Watumiaji ({allUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('listings')}
          className={`py-2.5 px-4 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeAdminTab === 'listings'
              ? 'bg-[#1A6B3C] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <span>🏠 Vyumba Vyote ({listings.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('lipa')}
          className={`py-2.5 px-4 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeAdminTab === 'lipa'
              ? 'bg-[#1A6B3C] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Lipa Namba za Mitandao</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('settings')}
          className={`py-2.5 px-4 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeAdminTab === 'settings'
              ? 'bg-[#1A6B3C] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <span>⚙️ Mipangilio ya Mfumo</span>
        </button>
      </div>

      {/* TAB 1: PAYMENTS & MANUAL APPROVALS */}
      {activeAdminTab === 'payments' && (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-sm text-gray-900">
                Kumbukumbu za Malipo (Transactions Log)
              </h3>
              <p className="text-xs text-gray-500">
                Thibitisha miamala ya Lipa Namba ili kufungua nambari za mwenye nyumba kwa wapangaji.
              </p>
            </div>

            <div className="flex gap-1.5 text-xs">
              <button
                onClick={() => setPaymentFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg font-bold ${
                  paymentFilter === 'ALL' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Zote ({payments.length})
              </button>
              <button
                onClick={() => setPaymentFilter('PENDING')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 ${
                  paymentFilter === 'PENDING'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                Inasubiri ({pendingPayments.length})
              </button>
              <button
                onClick={() => setPaymentFilter('SUCCESS')}
                className={`px-3 py-1.5 rounded-lg font-bold ${
                  paymentFilter === 'SUCCESS' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                Zilizofanikiwa
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-extrabold uppercase text-[10px] tracking-wider border-y border-gray-200">
                <tr>
                  <th className="p-3">Mtumiaji / Simu</th>
                  <th className="p-3">Chumba / Mwenye Nyumba</th>
                  <th className="p-3">Kiasi / Mtandao</th>
                  <th className="p-3">Kumbukumbu (Txn ID)</th>
                  <th className="p-3">Hali (Status)</th>
                  <th className="p-3 text-right">Hatua (Action)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredPayments.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-gray-900">{txn.userName}</div>
                      <div className="text-[11px] text-gray-400">{txn.userPhone}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-gray-800 line-clamp-1 max-w-xs">
                        {txn.listingTitle}
                      </div>
                      <div className="text-[11px] text-gray-400">Host: {txn.landlordName}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-black text-[#1A6B3C]">
                        TZS {txn.amount.toLocaleString()}
                      </div>
                      <div className="text-[11px] uppercase font-bold text-gray-500">
                        {txn.operator} · {txn.method === 'automated_stk' ? 'STK Push' : 'Manual Lipa'}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-mono font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                        {txn.transactionReference}
                      </span>
                      {txn.receiptNote && (
                        <div className="text-[10px] text-amber-700 italic mt-0.5">
                          "{txn.receiptNote}"
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      {txn.status === 'SUCCESS' ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ✅ Imethibitishwa
                        </span>
                      ) : txn.status === 'PENDING' ? (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-max">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Inasubiri Idhini
                        </span>
                      ) : (
                        <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ❌ Imekataliwa
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      {txn.status === 'PENDING' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => approvePayment(txn.id)}
                            className="py-1.5 px-3 rounded-lg bg-[#1A6B3C] text-white font-bold text-[11px] hover:bg-[#134f2c] shadow-xs"
                          >
                            Idhinisha & Fungua
                          </button>
                          <button
                            onClick={() => rejectPayment(txn.id)}
                            className="py-1.5 px-2.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-[11px] hover:bg-rose-100 border border-rose-200"
                          >
                            Kataa
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-400">Imekamilika</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: USERS MANAGEMENT */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-sm text-gray-900">Usimamizi wa Watumiaji</h3>
              <p className="text-xs text-gray-500">Angalia wasifu, fungia, au rejesha akaunti.</p>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tafuta jina au simu..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="bg-transparent text-xs font-semibold outline-hidden"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-extrabold uppercase text-[10px] tracking-wider border-y border-gray-200">
                <tr>
                  <th className="p-3">Jina la Mtumiaji</th>
                  <th className="p-3">Simu / Barua Pepe</th>
                  <th className="p-3">Wadhifa (Role)</th>
                  <th className="p-3">Msimbo wa Rufaa</th>
                  <th className="p-3">Angalifu Bure</th>
                  <th className="p-3 text-right">Hali / Hatua</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-gray-900">{u.name}</div>
                      <div className="text-[10px] text-gray-400">ID: {u.id}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-gray-800">{u.phone}</div>
                      <div className="text-[11px] text-gray-400">{u.email || 'Hakuna email'}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : u.role === 'landlord'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-xs font-bold text-gray-700">{u.referralCode}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-[#F5A623]">{u.freeViewsRemaining}</span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleUserBan(u.id)}
                        className={`py-1.5 px-3 rounded-lg text-[11px] font-bold border transition-colors ${
                          u.isBanned
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                        }`}
                      >
                        {u.isBanned ? 'Fungua (Unban)' : 'Fungia (Ban)'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: LISTINGS MANAGEMENT */}
      {activeAdminTab === 'listings' && (
        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-sm text-gray-900">Usimamizi wa Vyumba Vyote</h3>
              <p className="text-xs text-gray-500">
                Futa vyumba feki, badili hali ya upatikanaji, au kagua picha.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tafuta chumba au mwenye nyumba..."
                value={listingSearch}
                onChange={(e) => setListingSearch(e.target.value)}
                className="bg-transparent text-xs font-semibold outline-hidden"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredListings.map((r) => (
              <div
                key={r.id}
                className="p-3.5 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img src={r.photos[0]} alt={r.title} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{r.title}</h4>
                    <p className="text-gray-500 text-[11px]">
                      Mwenye Nyumba: <strong>{r.landlordName}</strong> ({r.landlordPhone}) · {r.area}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-black text-[#1A6B3C]">TZS {r.price.toLocaleString()}</span>
                      <span className="text-gray-400">·</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                          r.status === 'AVAILABLE'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {r.status === 'AVAILABLE' ? (
                    <button
                      onClick={() => updateListingStatus(r.id, 'TAKEN')}
                      className="py-1.5 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 text-[11px]"
                    >
                      Weka Taken
                    </button>
                  ) : (
                    <button
                      onClick={() => updateListingStatus(r.id, 'AVAILABLE')}
                      className="py-1.5 px-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold text-[11px]"
                    >
                      Weka Available
                    </button>
                  )}

                  <button
                    onClick={() => deleteListing(r.id)}
                    className="py-1.5 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] border border-rose-200"
                  >
                    Futa Kabisa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LIPA NUMBERS CONFIG */}
      {activeAdminTab === 'lipa' && (
        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-gray-900">
              Lipa Namba za Mitandao ya Simu (Mobile Money Config)
            </h3>
            <p className="text-xs text-gray-500">
              Badili nambari za Lipa kwa kila mtandao (Vodacom M-Pesa, Airtel Money, Tigo/Mixx, Halopesa).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {lipaNumbers.map((conf) => {
              const isEditing = editingOperator === conf.operator;
              return (
                <div key={conf.operator} className="p-4 rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: conf.badgeColor }} />
                      <h4 className="font-bold text-sm text-gray-900">{conf.operatorName}</h4>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => handleStartEditLipa(conf)}
                        className="text-xs text-[#1A6B3C] font-bold hover:underline flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Hariri
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="block text-gray-600 mb-1 font-semibold">Lipa Namba:</label>
                        <input
                          type="text"
                          value={editLipaVal}
                          onChange={(e) => setEditLipaVal(e.target.value)}
                          className="w-full py-2 px-3 border border-gray-300 rounded-xl font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-1 font-semibold">Jina la Akaunti:</label>
                        <input
                          type="text"
                          value={editAccountVal}
                          onChange={(e) => setEditAccountVal(e.target.value)}
                          className="w-full py-2 px-3 border border-gray-300 rounded-xl font-bold"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setEditingOperator(null)}
                          className="py-1.5 px-3 rounded-xl bg-gray-100 text-gray-700 font-bold"
                        >
                          Ghairi
                        </button>
                        <button
                          onClick={handleSaveLipa}
                          className="py-1.5 px-4 rounded-xl bg-[#1A6B3C] text-white font-bold flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" /> Hifadhi
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-3 rounded-xl space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Lipa Namba:</span>
                        <span className="font-mono font-black text-gray-900 text-sm">
                          {conf.lipaNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Jina:</span>
                        <span className="font-bold text-gray-800">{conf.accountName}</span>
                      </div>
                      {conf.contactPhone && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Simu ya Msaada:</span>
                          <span className="font-bold text-gray-800">{conf.contactPhone}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-[11px] text-gray-500 italic">👉 {conf.instructions}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: SYSTEM SETTINGS */}
      {activeAdminTab === 'settings' && (
        <form onSubmit={handleSaveSystemSettings} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-5 text-xs">
          <div>
            <h3 className="font-extrabold text-sm text-gray-900">Mipangilio ya Mfumo (Global Settings)</h3>
            <p className="text-gray-500">Dhibiti ada ya kufungua, matangazo ya juu, na sheria za rufaa.</p>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Ada ya Kufungua Mawasiliano (TZS):
            </label>
            <input
              type="number"
              min={500}
              step={500}
              value={priceVal}
              onChange={(e) => setPriceVal(Number(e.target.value))}
              className="w-full max-w-xs py-2.5 px-3.5 rounded-xl border border-gray-300 font-black text-sm text-gray-900"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Tangazo la Juu (Broadcast Announcement Banner):
            </label>
            <input
              type="text"
              value={broadcastVal}
              onChange={(e) => setBroadcastVal(e.target.value)}
              placeholder="Weka tangazo hapa litakaloonekana kwa watumiaji wote..."
              className="w-full py-2.5 px-3.5 rounded-xl border border-gray-300 text-xs text-gray-900"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Zawadi ya Rufaa (Referral Reward):
            </label>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 max-w-md">
              <span className="font-bold text-gray-900">
                1 Angalia Bure ya Chumba kwa kila rafiki anayelipa TZS 2,000.
              </span>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Mtumiaji anaweza kutumia salio la bure kufungua namba ya mwenye nyumba yeyote.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="py-3 px-6 rounded-2xl bg-[#1A6B3C] text-white font-black text-xs shadow-md hover:bg-[#134f2c]"
          >
            Hifadhi Mipangilio
          </button>
        </form>
      )}
    </div>
  );
};
