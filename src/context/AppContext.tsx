import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_CONFIG,
  INITIAL_LIPA_NUMBERS,
  INITIAL_LISTINGS,
  INITIAL_PAYMENTS,
  INITIAL_REFERRALS,
  INITIAL_USERS,
} from '../data/mockData';
import {
  AppNotification,
  LipaNumberConfig,
  Listing,
  PaymentOperator,
  PaymentTransaction,
  ReferralRecord,
  SystemConfig,
  User,
  UserRole,
} from '../types';

interface AppContextType {
  currentUser: User;
  allUsers: User[];
  listings: Listing[];
  payments: PaymentTransaction[];
  referrals: ReferralRecord[];
  notifications: AppNotification[];
  lipaNumbers: LipaNumberConfig[];
  systemConfig: SystemConfig;
  currentLang: 'sw' | 'en';
  activeView: string;
  selectedListing: Listing | null;
  toastMessage: string | null;
  showPayModal: boolean;
  listingToUnlock: Listing | null;
  showAvailabilityPrompt: boolean;
  promptListing: Listing | null;
  
  // Actions
  setLanguage: (lang: 'sw' | 'en') => void;
  setActiveView: (view: string) => void;
  setSelectedListing: (listing: Listing | null) => void;
  showToast: (msg: string) => void;
  switchUserRole: (role: UserRole) => void;
  setCurrentUserById: (userId: string) => void;
  
  // Auth
  loginUser: (identifier: string, pass: string) => boolean;
  signupUser: (name: string, phone: string, email: string, role: UserRole) => User;
  logoutUser: () => void;
  
  // Listings
  addListing: (listing: Omit<Listing, 'id' | 'viewsCount' | 'unlocksCount' | 'lastCheckedDate' | 'createdAt' | 'updatedAt'>) => void;
  updateListingStatus: (id: string, status: 'AVAILABLE' | 'TAKEN' | 'FLAGGED') => void;
  duplicateListing: (id: string) => void;
  incrementListingViews: (id: string) => void;
  deleteListing: (id: string) => void;
  confirmListingAvailable: (id: string, stillAvailable: boolean) => void;
  
  // Payments & Unlocks
  openPaywallForListing: (listing: Listing) => void;
  closePaywall: () => void;
  initiateAutomatedPayment: (listingId: string, operator: PaymentOperator, phone: string) => Promise<boolean>;
  submitManualPayment: (listingId: string, operator: PaymentOperator, txnRef: string, note: string) => void;
  approvePayment: (paymentId: string) => void;
  rejectPayment: (paymentId: string) => void;
  redeemFreeView: (listingId: string) => boolean;
  isListingUnlocked: (listingId: string) => boolean;
  
  // Referrals
  claimReferralBonus: (referralId: string) => void;
  
  // Admin
  updateLipaNumber: (operator: PaymentOperator, newLipa: string, accountName?: string) => void;
  updateSystemConfig: (newConfig: Partial<SystemConfig>) => void;
  toggleUserBan: (userId: string) => void;
  
  // Notifications
  markNotificationsAsRead: () => void;
  dismissAvailabilityPrompt: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage hydrated states
  const [currentLang, setCurrentLang] = useState<'sw' | 'en'>('sw');
  const [activeView, setActiveView] = useState<string>('home');
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('cc_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('cc_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Tenant by default
  });
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('cc_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });
  const [payments, setPayments] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('cc_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });
  const [referrals, setReferrals] = useState<ReferralRecord[]>(() => {
    const saved = localStorage.getItem('cc_referrals');
    return saved ? JSON.parse(saved) : INITIAL_REFERRALS;
  });
  const [lipaNumbers, setLipaNumbers] = useState<LipaNumberConfig[]>(() => {
    const saved = localStorage.getItem('cc_lipa_numbers');
    return saved ? JSON.parse(saved) : INITIAL_LIPA_NUMBERS;
  });
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('cc_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif_1',
      title: 'Vyumba Vipya Mlimani!',
      message: 'Vyumba 12 vimeongezwa karibu na UDSM na Ardhi University.',
      type: 'listing',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'notif_2',
      title: 'Hongera! Bonus ya Rufaa',
      message: 'Baraka Mwita amelipa TZS 2,000. Umepata angalia moja ya bure!',
      type: 'referral',
      read: false,
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'notif_3',
      title: 'Ukumbusho wa Usalama',
      message: 'Usiwalipe wenye nyumba kodi bila kuona chumba na mkataba rasmi.',
      type: 'system',
      read: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPayModal, setShowPayModal] = useState<boolean>(false);
  const [listingToUnlock, setListingToUnlock] = useState<Listing | null>(null);
  const [showAvailabilityPrompt, setShowAvailabilityPrompt] = useState<boolean>(false);
  const [promptListing, setPromptListing] = useState<Listing | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('cc_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('cc_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cc_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('cc_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('cc_referrals', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    localStorage.setItem('cc_lipa_numbers', JSON.stringify(lipaNumbers));
  }, [lipaNumbers]);

  useEffect(() => {
    localStorage.setItem('cc_config', JSON.stringify(systemConfig));
  }, [systemConfig]);

  // Check if landlord has listings that need a 14-day check
  useEffect(() => {
    if (currentUser.role === 'landlord') {
      const landlordRoom = listings.find(
        (l) => l.landlordId === currentUser.id && l.status === 'AVAILABLE'
      );
      if (landlordRoom) {
        // Trigger subtle prompt after 2 seconds for interactive demo
        const timer = setTimeout(() => {
          setPromptListing(landlordRoom);
          setShowAvailabilityPrompt(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentUser.role]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const setLanguage = (lang: 'sw' | 'en') => {
    setCurrentLang(lang);
    showToast(lang === 'sw' ? 'Lugha imebadilishwa kuwa Kiswahili' : 'Language changed to English');
  };

  const switchUserRole = (role: UserRole) => {
    const targetUser = allUsers.find((u) => u.role === role) || {
      ...currentUser,
      role,
    };
    setCurrentUser(targetUser);
    showToast(
      role === 'tenant'
        ? 'Umebadili wasifu: Mpangaji (Student / Tenant)'
        : role === 'landlord'
        ? 'Umebadili wasifu: Mwenye Nyumba (Landlord)'
        : 'Umebadili wasifu: Msimamizi (System Admin)'
    );
  };

  const setCurrentUserById = (userId: string) => {
    const found = allUsers.find((u) => u.id === userId);
    if (found) setCurrentUser(found);
  };

  const loginUser = (identifier: string, pass: string) => {
    const cleanId = identifier.trim().toLowerCase();
    const found = allUsers.find(
      (u) =>
        u.phone.toLowerCase().includes(cleanId) ||
        (u.email && u.email.toLowerCase() === cleanId) ||
        u.name.toLowerCase().includes(cleanId)
    );
    if (found) {
      if (found.isBanned) {
        showToast('Akaunti hii imesimamishwa na Msimamizi (Banned account)');
        return false;
      }
      setCurrentUser(found);
      showToast(`Karibu tena, ${found.name}!`);
      return true;
    }
    showToast('Akaunti haikupatikana. Tafadhali jisajili kwanza.');
    return false;
  };

  const signupUser = (name: string, phone: string, email: string, role: UserRole): User => {
    const newId = `user_${Date.now()}`;
    const code = `${name.split(' ')[0].toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const newUser: User = {
      id: newId,
      name,
      phone,
      email: email || undefined,
      role,
      referralCode: code,
      freeViewsRemaining: role === 'tenant' ? 1 : 0, // 1 welcome unlock gift
      unlockedListings: [],
      createdAt: new Date().toISOString(),
    };
    setAllUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    showToast(`Akaunti imefunguliwa kikamilifu! Karibu ${name}.`);
    return newUser;
  };

  const logoutUser = () => {
    // Revert to demo tenant
    const demoTenant = allUsers.find((u) => u.role === 'tenant') || allUsers[0];
    setCurrentUser(demoTenant);
    showToast('Umetoka kwenye akaunti (Logged out)');
  };

  const addListing = (data: Omit<Listing, 'id' | 'viewsCount' | 'unlocksCount' | 'lastCheckedDate' | 'createdAt' | 'updatedAt'>) => {
    const newListing: Listing = {
      ...data,
      id: `list_${Date.now()}`,
      viewsCount: 1,
      unlocksCount: 0,
      lastCheckedDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setListings((prev) => [newListing, ...prev]);
    showToast('✅ Chumba kimechapishwa hewani! Wapangaji wanaweza kukiangalia sasa.');
    setActiveView('landlord_dash');
  };

  const updateListingStatus = (id: string, status: 'AVAILABLE' | 'TAKEN' | 'FLAGGED') => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l))
    );
    showToast(
      status === 'TAKEN'
        ? 'Chumba kimewekwa: KIMECHUKULIWA (Hidden from search)'
        : status === 'AVAILABLE'
        ? 'Chumba kimewekwa: KINAPATIKANA (Visible in search)'
        : 'Chumba kimewekwa bendera ya ukaguzi (Flagged)'
    );
  };

  const duplicateListing = (id: string) => {
    const target = listings.find((l) => l.id === id);
    if (!target) return;
    const duplicated: Listing = {
      ...target,
      id: `list_${Date.now()}`,
      title: `${target.title} (Nakala Mpya)`,
      status: 'AVAILABLE',
      viewsCount: 0,
      unlocksCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setListings((prev) => [duplicated, ...prev]);
    showToast('📋 Chumba kimenakiliwa! Unaweza kukihariri au kukitangaza moja kwa moja.');
  };

  const incrementListingViews = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, viewsCount: l.viewsCount + 1 } : l))
    );
  };

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    showToast('Chumba kimefutwa kwenye mfumo.');
  };

  const confirmListingAvailable = (id: string, stillAvailable: boolean) => {
    if (stillAvailable) {
      setListings((prev) =>
        prev.map((l) =>
          l.id === id
            ? { ...l, status: 'AVAILABLE', lastCheckedDate: new Date().toISOString() }
            : l
        )
      );
      showToast('Asante kwa kuthibitisha chumba bado kinapatikana!');
    } else {
      updateListingStatus(id, 'TAKEN');
    }
    setShowAvailabilityPrompt(false);
    setPromptListing(null);
  };

  const openPaywallForListing = (listing: Listing) => {
    setListingToUnlock(listing);
    setShowPayModal(true);
  };

  const closePaywall = () => {
    setShowPayModal(false);
    setListingToUnlock(null);
  };

  const isListingUnlocked = (listingId: string): boolean => {
    if (currentUser.role === 'admin') return true;
    return currentUser.unlockedListings.includes(listingId);
  };

  const initiateAutomatedPayment = async (
    listingId: string,
    operator: PaymentOperator,
    phone: string
  ): Promise<boolean> => {
    const targetListing = listings.find((l) => l.id === listingId);
    if (!targetListing) return false;

    // Simulate STK Push to Tanzanian telecom gateway (AzamPay/Vodacom/Airtel/Tigo)
    const newTxn: PaymentTransaction = {
      id: `pay_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: phone,
      listingId,
      listingTitle: targetListing.title,
      landlordName: targetListing.landlordName,
      operator,
      amount: systemConfig.unlockPriceTZS,
      currency: 'TZS',
      status: 'SUCCESS',
      method: 'automated_stk',
      transactionReference: `${operator.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + systemConfig.unlockValidityHours * 3600000).toISOString(),
    };

    setPayments((prev) => [newTxn, ...prev]);

    // Unlock listing for this user
    setCurrentUser((prev) => ({
      ...prev,
      unlockedListings: Array.from(new Set([...prev.unlockedListings, listingId])),
    }));

    // Update listing unlock count
    setListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, unlocksCount: l.unlocksCount + 1 } : l))
    );

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Malipo ya TZS 2,000 Yamefanikiwa! 🎉',
        message: `Mawasiliano ya mwenye nyumba (${targetListing.landlordName}) yamefunguliwa kwa saa ${systemConfig.unlockValidityHours}.`,
        type: 'payment',
        read: false,
        createdAt: new Date().toISOString(),
        listingId,
      },
      ...prev,
    ]);

    showToast('✅ Malipo yamefanikiwa! Namba ya mwenye nyumba imefunguliwa.');
    return true;
  };

  const submitManualPayment = (
    listingId: string,
    operator: PaymentOperator,
    txnRef: string,
    note: string
  ) => {
    const targetListing = listings.find((l) => l.id === listingId);
    if (!targetListing) return;

    const newTxn: PaymentTransaction = {
      id: `pay_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      listingId,
      listingTitle: targetListing.title,
      landlordName: targetListing.landlordName,
      operator,
      amount: systemConfig.unlockPriceTZS,
      currency: 'TZS',
      status: 'PENDING',
      method: 'manual_lipa',
      transactionReference: txnRef,
      receiptNote: note,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + systemConfig.unlockValidityHours * 3600000).toISOString(),
    };

    setPayments((prev) => [newTxn, ...prev]);
    showToast('📥 Uthibitisho wako umetumwa kwa Msimamizi. Utafunguliwa punde ukihakikiwa!');
    closePaywall();
  };

  const approvePayment = (paymentId: string) => {
    const txn = payments.find((p) => p.id === paymentId);
    if (!txn) return;

    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? { ...p, status: 'SUCCESS', verifiedAt: new Date().toISOString() }
          : p
      )
    );

    // Update user's unlocked listings
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === txn.userId
          ? { ...u, unlockedListings: Array.from(new Set([...u.unlockedListings, txn.listingId])) }
          : u
      )
    );

    if (currentUser.id === txn.userId) {
      setCurrentUser((prev) => ({
        ...prev,
        unlockedListings: Array.from(new Set([...prev.unlockedListings, txn.listingId])),
      }));
    }

    // Increment unlock counter on listing
    setListings((prev) =>
      prev.map((l) => (l.id === txn.listingId ? { ...l, unlocksCount: l.unlocksCount + 1 } : l))
    );

    showToast(`Malipo ${txn.transactionReference} yameidhinishwa na mawasiliano yamefunguliwa!`);
  };

  const rejectPayment = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: 'REJECTED' } : p))
    );
    showToast('Malipo yamekataliwa.');
  };

  const redeemFreeView = (listingId: string): boolean => {
    if (currentUser.freeViewsRemaining <= 0) {
      showToast('Huna salio la angalifu bure. Alika marafiki au lipa TZS 2,000.');
      return false;
    }

    setCurrentUser((prev) => ({
      ...prev,
      freeViewsRemaining: prev.freeViewsRemaining - 1,
      unlockedListings: Array.from(new Set([...prev.unlockedListings, listingId])),
    }));

    setListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, unlocksCount: l.unlocksCount + 1 } : l))
    );

    showToast('🎁 Hongera! Umetumia angalia 1 ya bure kufungua chumba hiki.');
    return true;
  };

  const claimReferralBonus = (referralId: string) => {
    setReferrals((prev) =>
      prev.map((r) => (r.id === referralId ? { ...r, bonusClaimed: true } : r))
    );
    setCurrentUser((prev) => ({
      ...prev,
      freeViewsRemaining: prev.freeViewsRemaining + systemConfig.referralRewardFreeViews,
    }));
    showToast(`🎁 Umepata angalia ${systemConfig.referralRewardFreeViews} bure ya mawasiliano!`);
  };

  const updateLipaNumber = (
    operator: PaymentOperator,
    newLipa: string,
    accountName = 'CHUMBACONNECT TZ'
  ) => {
    setLipaNumbers((prev) =>
      prev.map((l) => (l.operator === operator ? { ...l, lipaNumber: newLipa, accountName } : l))
    );
    showToast(`Lipa Namba ya ${operator.toUpperCase()} imesasishwa kuwa ${newLipa}.`);
  };

  const updateSystemConfig = (newConfig: Partial<SystemConfig>) => {
    setSystemConfig((prev) => ({ ...prev, ...newConfig }));
    showToast('Mipangilio ya mfumo imehifadhiwa.');
  };

  const toggleUserBan = (userId: string) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isBanned: !u.isBanned } : u))
    );
    showToast('Hali ya mtumiaji imebadilishwa.');
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissAvailabilityPrompt = () => {
    setShowAvailabilityPrompt(false);
    setPromptListing(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        listings,
        payments,
        referrals,
        notifications,
        lipaNumbers,
        systemConfig,
        currentLang,
        activeView,
        selectedListing,
        toastMessage,
        showPayModal,
        listingToUnlock,
        showAvailabilityPrompt,
        promptListing,
        setLanguage,
        setActiveView,
        setSelectedListing,
        showToast,
        switchUserRole,
        setCurrentUserById,
        loginUser,
        signupUser,
        logoutUser,
        addListing,
        updateListingStatus,
        duplicateListing,
        incrementListingViews,
        deleteListing,
        confirmListingAvailable,
        openPaywallForListing,
        closePaywall,
        initiateAutomatedPayment,
        submitManualPayment,
        approvePayment,
        rejectPayment,
        redeemFreeView,
        isListingUnlocked,
        claimReferralBonus,
        updateLipaNumber,
        updateSystemConfig,
        toggleUserBan,
        markNotificationsAsRead,
        dismissAvailabilityPrompt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
