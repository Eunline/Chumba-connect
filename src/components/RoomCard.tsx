import React from 'react';
import {
  CheckCircle,
  Clock,
  Eye,
  GraduationCap,
  Image as ImageIcon,
  KeyRound,
  Lock,
  MapPin,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Listing } from '../types';

interface RoomCardProps {
  listing: Listing;
  onSelect: (listing: Listing) => void;
  onUnlock: (listing: Listing) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ listing, onSelect, onUnlock }) => {
  const { isListingUnlocked, currentLang, incrementListingViews } = useApp();
  const unlocked = isListingUnlocked(listing.id);

  const handleClick = () => {
    incrementListingViews(listing.id);
    onSelect(listing);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden group cursor-pointer flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-16/10 bg-gray-100 overflow-hidden">
        <img
          src={listing.photos[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Status Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {listing.status === 'AVAILABLE' ? (
            <span className="bg-emerald-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse"></span>
              {currentLang === 'sw' ? 'Inapatikana' : 'Available'}
            </span>
          ) : (
            <span className="bg-rose-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              {currentLang === 'sw' ? 'Imechukuliwa' : 'Taken'}
            </span>
          )}
          <span className="bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
            {listing.roomType}
          </span>
        </div>

        {/* Photos Count & Views */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          <span className="bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            {listing.photos.length}
          </span>
        </div>

        {/* Price Tag on Image */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-baseline justify-between text-white">
          <div>
            <span className="text-xl font-black text-[#F5A623] drop-shadow-xs">
              TZS {listing.price.toLocaleString()}
            </span>
            <span className="text-[11px] text-white/90 font-medium ml-1">
              /{currentLang === 'sw' ? 'mwezi' : 'mo'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-white/80">
            <Eye className="w-3 h-3" />
            <span>{listing.viewsCount}</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-[#1A6B3C] transition-colors">
            {listing.title}
          </h3>

          {/* Location & Campus Proximity */}
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate font-medium">{listing.area}, {listing.region}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#1A6B3C] font-semibold">
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{listing.campusNearby}</span>
              <span className="text-gray-400 font-normal">· {listing.distanceFromCampus}</span>
            </div>
          </div>

          {/* Amenities preview tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
              💧 {listing.waterStatus.split(' ')[0]}
            </span>
            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
              ⚡ {listing.electricityStatus.split(' ')[0]}
            </span>
            {listing.furnishing.slice(0, 2).map((f, i) => (
              <span key={i} className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-medium border border-amber-200/50">
                🛋️ {f}
              </span>
            ))}
            {listing.furnishing.length > 2 && (
              <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">
                +{listing.furnishing.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs transition-colors text-center"
          >
            {currentLang === 'sw' ? 'Maelezo Zaidi' : 'Details'}
          </button>

          {unlocked ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="py-2 px-3 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-colors border border-emerald-200"
            >
              <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
              <span>{currentLang === 'sw' ? 'Wazi' : 'Unlocked'}</span>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUnlock(listing);
              }}
              className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#1A6B3C] to-[#124f2b] hover:from-[#134f2c] hover:to-[#0f3d22] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <Lock className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>{currentLang === 'sw' ? 'Fungua (2,000/=)' : 'Unlock (2k)'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
