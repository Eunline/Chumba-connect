export type UserRole = 'tenant' | 'landlord' | 'admin';

export type RoomType = 'Single' | 'Self-contained' | 'Chumba na Sebule' | 'Bedsitter' | 'Other';

export type WaterStatus = 'Maji ya bomba (24/7)' | 'Maji ya bomba (Mgao)' | 'Tanki la maji' | 'Kisima';

export type ElectricityStatus = 'TANESCO (Luku binafsi)' | 'TANESCO (Luku ya pamoja)' | 'Solar' | 'Jenereta';

export type GenderPreference = 'Wote (Any)' | 'Wanaume tu (Male only)' | 'Wanawake tu (Female only)';

export type PaymentOperator = 'mpesa' | 'airtel' | 'tigo' | 'halo';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REJECTED';

export type PaymentMethod = 'automated_stk' | 'manual_lipa';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  referralCode: string;
  referredBy?: string;
  freeViewsRemaining: number;
  unlockedListings: string[]; // listing IDs
  createdAt: string;
  isBanned?: boolean;
}

export interface Listing {
  id: string;
  landlordId: string;
  landlordName: string;
  landlordPhone: string;
  landlordWhatsapp?: string;
  landlordEmail?: string;
  title: string;
  description: string;
  region: string;
  district: string;
  area: string;
  campusNearby: string;
  distanceFromCampus: string; // e.g. "Dakika 5 kwa miguu"
  price: number; // in TZS / month
  roomType: RoomType;
  furnishing: string[]; // e.g. ['Kitanda', 'Godoro', 'Meza', 'Kiti', 'Wardrobe']
  waterStatus: WaterStatus;
  electricityStatus: ElectricityStatus;
  genderPreference: GenderPreference;
  houseRules: string;
  photos: string[];
  status: 'AVAILABLE' | 'TAKEN' | 'FLAGGED';
  viewsCount: number;
  unlocksCount: number;
  lastCheckedDate: string;
  createdAt: string;
  updatedAt: string;
  mapCoordinates?: { lat: number; lng: number };
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  listingId: string;
  listingTitle: string;
  landlordName: string;
  operator: PaymentOperator;
  amount: number;
  currency: 'TZS';
  status: PaymentStatus;
  method: PaymentMethod;
  transactionReference: string; // operator txn code or receipt
  receiptNote?: string;
  createdAt: string;
  verifiedAt?: string;
  expiresAt: string; // 24 hours or 7 days
}

export interface ReferralRecord {
  id: string;
  referrerId: string;
  refereeId: string;
  refereeName: string;
  refereePhone: string;
  hasPaid: boolean;
  bonusClaimed: boolean;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  userId?: string; // or broadcast
  title: string;
  message: string;
  type: 'payment' | 'listing' | 'referral' | 'system' | 'availability_check';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  listingId?: string;
}

export interface LipaNumberConfig {
  operator: PaymentOperator;
  operatorName: string;
  lipaNumber: string;
  accountName: string;
  instructions: string;
  contactPhone?: string;
  badgeColor: string;
}

export interface SystemConfig {
  unlockPriceTZS: number;
  referralRewardFreeViews: number;
  unlockValidityHours: number;
  broadcastBanner?: string;
  enableAutomatedGateway: boolean;
}
