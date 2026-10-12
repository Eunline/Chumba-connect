import React from 'react';
import { Bell, Check, CheckCheck, Clock, CreditCard, Gift, Home, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationsAsRead, setActiveView } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-5 h-5 text-emerald-600" />;
      case 'referral':
        return <Gift className="w-5 h-5 text-[#F5A623]" />;
      case 'listing':
        return <Home className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col my-auto">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#1A6B3C]" />
            <h3 className="font-extrabold text-sm text-gray-900">Arifa Zangu (Notifications)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markNotificationsAsRead}
              className="text-xs text-[#1A6B3C] font-semibold hover:underline flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Soma Zote
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Bell className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-semibold">Huna arifa zozote mpya kwa sasa.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  notif.read ? 'bg-white border-gray-100' : 'bg-emerald-50/50 border-emerald-200'
                }`}
              >
                <div className="p-2 rounded-xl bg-gray-100 shrink-0">{getIcon(notif.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-bold text-gray-900 leading-tight">{notif.title}</h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#1A6B3C] shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{notif.message}</p>
                  <span className="text-[10px] text-gray-400 mt-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(notif.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
