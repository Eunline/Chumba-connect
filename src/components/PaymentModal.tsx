import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Upload,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Listing, PaymentOperator } from '../types';

interface PaymentModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ listing, isOpen, onClose }) => {
  const {
    lipaNumbers,
    systemConfig,
    currentUser,
    initiateAutomatedPayment,
    submitManualPayment,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'automated' | 'manual'>('automated');
  const [selectedOperator, setSelectedOperator] = useState<PaymentOperator>('mpesa');
  const [payerPhone, setPayerPhone] = useState(currentUser.phone || '+2557');
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [showSimulatedUssd, setShowSimulatedUssd] = useState(false);
  const [ussdPin, setUssdPin] = useState('');

  // Manual payment states
  const [manualTxnRef, setManualTxnRef] = useState('');
  const [manualNote, setManualNote] = useState('');
  const [receiptFileName, setReceiptFileName] = useState('');

  if (!isOpen || !listing) return null;

  const currentLipaConfig = lipaNumbers.find((l) => l.operator === selectedOperator);

  const operators: {
    id: PaymentOperator;
    name: string;
    sub: string;
    color: string;
    logo: string;
  }[] = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      sub: 'Vodacom Tanzania',
      color: '#E60000',
      logo: '🔴',
    },
    {
      id: 'airtel',
      name: 'Airtel Money',
      sub: 'Airtel Tanzania',
      color: '#FF0000',
      logo: '⚪',
    },
    {
      id: 'tigo',
      name: 'Tigo / Mixx',
      sub: 'Yas Tanzania',
      color: '#0033A0',
      logo: '🔵',
    },
    {
      id: 'halo',
      name: 'Halopesa',
      sub: 'Halotel Tanzania',
      color: '#FF8200',
      logo: '🟠',
    },
  ];

  const handleStartAutomated = async () => {
    if (!payerPhone || payerPhone.length < 10) {
      showToast('⚠️ Tafadhali weka nambari sahihi ya simu (+255...)');
      return;
    }

    setIsProcessing(true);
    setShowSimulatedUssd(true);
    setCountdown(12);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleConfirmUssdPush = async () => {
    setIsProcessing(false);
    setShowSimulatedUssd(false);
    await initiateAutomatedPayment(listing.id, selectedOperator, payerPhone);
    onClose();
  };

  const handleCopyLipa = (num: string) => {
    navigator.clipboard?.writeText(num);
    showToast(`📋 Nambari ${num} imenakiliwa!`);
  };

  const handleSubmitManualForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTxnRef || manualTxnRef.trim().length < 4) {
      showToast('⚠️ Weka Transaction ID au Kumbukumbu ya Muamala.');
      return;
    }

    submitManualPayment(
      listing.id,
      selectedOperator,
      manualTxnRef.trim(),
      manualNote || `Receipt: ${receiptFileName || 'SMS confirmation'}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A6B3C] to-[#124d2b] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[#F5A623]" />
            </div>
            <div>
              <h3 className="text-lg font-black leading-tight">Fungua Mawasiliano ya Mwenye Nyumba</h3>
              <p className="text-xs text-white/80 line-clamp-1">{listing.title}</p>
            </div>
          </div>

          {/* Amount Badge */}
          <div className="mt-4 bg-black/30 backdrop-blur-xs rounded-2xl p-3 flex items-center justify-between border border-white/10">
            <div>
              <span className="text-[11px] text-white/70 block">Ada ya Kupata Namba (Unlock Fee):</span>
              <span className="text-2xl font-black text-[#F5A623]">
                TZS {systemConfig.unlockPriceTZS.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full">
                Saa {systemConfig.unlockValidityHours} Upatikanaji
              </span>
              <p className="text-[10px] text-white/70 mt-0.5">Simu + WhatsApp moja kwa moja</p>
            </div>
          </div>
        </div>

        {/* Tab Switching: Automated STK Push vs Manual Lipa Namba */}
        <div className="flex border-b border-gray-200 bg-gray-50/80 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab('automated')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'automated'
                ? 'bg-white text-[#1A6B3C] shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Zap className="w-4 h-4 text-[#F5A623]" />
            <span>Haraka (STK Push / USSD)</span>
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'manual'
                ? 'bg-white text-[#1A6B3C] shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Smartphone className="w-4 h-4 text-blue-500" />
            <span>Lipa Namba ya Mtandao</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Operator Grid Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              1. Chagua Mtandao wa Malipo:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {operators.map((op) => {
                const isSelected = selectedOperator === op.id;
                return (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setSelectedOperator(op.id)}
                    className={`p-3 rounded-2xl border-2 text-left flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? 'border-[#1A6B3C] bg-[#1A6B3C]/5 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-xl">{op.logo}</span>
                    <div className="flex-1">
                      <p className="text-xs font-black text-gray-900">{op.name}</p>
                      <p className="text-[10px] text-gray-500 leading-none mt-0.5">{op.sub}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#1A6B3C]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: AUTOMATED STK PUSH (AZAMPAY / CLICKPESA INTEGRATION) */}
          {activeTab === 'automated' ? (
            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                    Ukishabonyeza <strong>Lipa Sasa</strong>, simu yako itatumiwa ombi la malipo (STK Push). Weka tu namba yako ya siri (PIN) kwenye simu yako na namba itafunguka mara moja!
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  2. Weka Nambari Yako ya Simu:
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={payerPhone}
                    onChange={(e) => setPayerPhone(e.target.value)}
                    placeholder="+255 7XX XXX XXX"
                    className="w-full py-3 px-4 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:outline-hidden focus:border-[#1A6B3C] focus:ring-1 focus:ring-[#1A6B3C]"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                    TZ
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Hakikisha namba hii ina salio la kuanzia TZS 2,000 kwenye pochi yako ya {selectedOperator.toUpperCase()}.
                </p>
              </div>

              <button
                type="button"
                onClick={handleStartAutomated}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#1A6B3C] to-[#124d2b] hover:from-[#134f2c] hover:to-[#0e3c21] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#1A6B3C]/20 transition-all active:scale-95 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 text-[#F5A623]" />
                Lipa TZS 2,000 Papo Hapo
              </button>
            </div>
          ) : (
            /* TAB 2: MANUAL OFFLINE LIPA NAMBA WORKFLOW */
            <form onSubmit={handleSubmitManualForm} className="space-y-4">
              {currentLipaConfig && (
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                      {currentLipaConfig.operatorName} Lipa Namba:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyLipa(currentLipaConfig.lipaNumber)}
                      className="text-xs text-[#1A6B3C] font-bold flex items-center gap-1 hover:underline"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Nakili Namba
                    </button>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-gray-900 tracking-wider">
                        {currentLipaConfig.lipaNumber}
                      </span>
                      <p className="text-[11px] text-gray-500 font-medium">
                        Jina: <strong>{currentLipaConfig.accountName}</strong>
                      </p>
                    </div>
                    {currentLipaConfig.contactPhone && (
                      <div className="text-right text-[11px] text-gray-500">
                        <span>Simu:</span>
                        <div className="font-bold text-gray-800">{currentLipaConfig.contactPhone}</div>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-amber-900 font-medium leading-relaxed">
                    👉 <strong>Hatua:</strong> {currentLipaConfig.instructions}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Kumbukumbu ya Muamala (Transaction ID / Code):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mfano: QKD8291KZ au AIR7729110B"
                  value={manualTxnRef}
                  onChange={(e) => setManualTxnRef(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 uppercase focus:outline-hidden focus:border-[#1A6B3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Ujumbe au Jina lililotumika:
                </label>
                <input
                  type="text"
                  placeholder="Mfano: Juma Emmanuel au picha ya risiti"
                  value={manualNote}
                  onChange={(e) => setManualNote(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-hidden focus:border-[#1A6B3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Picha ya Screenshot ya SMS (Hiari):
                </label>
                <div
                  onClick={() => {
                    setReceiptFileName('screenshot_mpesa_2000tzs.jpg');
                    showToast('📷 Risiti imeambatanishwa!');
                  }}
                  className="border-2 border-dashed border-gray-300 hover:border-[#1A6B3C] rounded-xl p-3 text-center cursor-pointer bg-gray-50 transition-colors"
                >
                  <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                  <span className="text-xs text-gray-600 font-medium">
                    {receiptFileName || 'Bonyeza kupakia screenshot ya SMS ya malipo'}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#F5A623] hover:bg-[#e0910f] text-gray-950 font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                Tuma Uthibitisho kwa Admin
              </button>
            </form>
          )}

          {/* Security reassurance */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ulinzi wa 100% kwa muamala kupitia BOT Licensed Payment Gateways</span>
          </div>
        </div>

        {/* SIMULATED USSD PUSH SCREEN MODAL (Real-world Telecom Experience) */}
        {showSimulatedUssd && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center space-y-4 shadow-2xl border-4 border-[#1A6B3C]">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Smartphone className="w-6 h-6 animate-bounce" />
              </div>

              <div>
                <h4 className="font-extrabold text-gray-900 text-base">
                  Ombi la Malipo Kwenye Simu Yako
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Ombi limetumwa kwa <strong>{payerPhone}</strong> ({selectedOperator.toUpperCase()}).
                </p>
              </div>

              {/* Simulated Operator USSD Screen */}
              <div className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-2xl text-left space-y-2 border border-gray-800">
                <div className="text-gray-400 text-[10px]">-- {selectedOperator.toUpperCase()} TANZANIA --</div>
                <div>Lipa TZS 2,000 kwa CHUMBACONNECT TZ?</div>
                <div>Ada: TZS 0.00</div>
                <div className="pt-2">Ingiza Namba ya Siri (PIN):</div>
                <input
                  type="password"
                  maxLength={4}
                  value={ussdPin}
                  onChange={(e) => setUssdPin(e.target.value)}
                  placeholder="****"
                  className="bg-gray-800 text-white px-2 py-1 rounded text-center tracking-widest w-24 border border-green-500 outline-hidden font-bold"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Inasubiri PIN: {countdown}s</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSimulatedUssd(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs"
                >
                  Ghairi (Cancel)
                </button>
                <button
                  type="button"
                  onClick={handleConfirmUssdPush}
                  className="flex-1 py-2.5 rounded-xl bg-[#1A6B3C] text-white font-bold text-xs shadow-md"
                >
                  Thibitisha Malipo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
