import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Crown, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ROOMS } from '../data/rooms';
import { RoomInfo } from '../types';
import { createBooking } from '../lib/dataService';
import { useAuth } from '../context/AuthContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: RoomInfo | null;
  initialSearchParams?: {
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    roomType: string;
  } | null;
  onSuccessNavigate?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedRoom,
  initialSearchParams,
  onSuccessNavigate
}) => {
  const { user } = useAuth();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 4);

  const [selectedRoomId, setSelectedRoomId] = useState<string>(preselectedRoom?.id || 'deluxe_gold');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState(tomorrow.toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(threeDaysLater.toISOString().split('T')[0]);
  const [guestsCount, setGuestsCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedRoom) {
      setSelectedRoomId(preselectedRoom.id);
    }
    if (initialSearchParams) {
      setCheckInDate(initialSearchParams.checkInDate);
      setCheckOutDate(initialSearchParams.checkOutDate);
      setGuestsCount(initialSearchParams.guests);
      setSelectedRoomId(initialSearchParams.roomType);
    }
    if (user) {
      setGuestName(user.displayName || '');
      setGuestEmail(user.email || '');
    }
  }, [preselectedRoom, initialSearchParams, user, isOpen]);

  if (!isOpen) return null;

  const currentRoom = ROOMS.find(r => r.id === selectedRoomId) || ROOMS[0];

  // Calculate nights & total price
  const inDate = new Date(checkInDate);
  const outDate = new Date(checkOutDate);
  const nightCount = Math.max(1, Math.round((outDate.getTime() - inDate.getTime()) / (1000 * 3600 * 24)));
  const totalAmount = nightCount * currentRoom.pricePerNight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !checkInDate || !checkOutDate) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await createBooking({
        userID: user?.uid || 'guest-' + Date.now(),
        guestName,
        guestEmail,
        guestPhone,
        checkInDate,
        checkOutDate,
        guests: guestsCount,
        roomType: currentRoom.id,
        roomName: currentRoom.name,
        status: 'pending',
        totalAmount,
        specialRequests
      });

      setBookedSuccess(true);
    } catch (err) {
      console.error("Booking submission error:", err);
      setErrorMsg('Failed to create reservation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border-2 border-amber-400 relative my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {bookedSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Reservation Request Received!
            </h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Your booking for <strong className="text-stone-900">{currentRoom.name}</strong> from <strong>{checkInDate}</strong> to <strong>{checkOutDate}</strong> ({nightCount} nights, ${totalAmount}) has been stored in our system.
            </p>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 text-left space-y-1 max-w-md mx-auto">
              <div className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Booking Status: Pending Admin Confirmation
              </div>
              <div>Guest Email: {guestEmail}</div>
              <div>Guest Name: {guestName}</div>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  onClose();
                  setBookedSuccess(false);
                  if (onSuccessNavigate) onSuccessNavigate();
                }}
                className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-2.5 rounded-xl shadow-md text-sm"
              >
                View in Guest Dashboard
              </button>
              <button
                onClick={() => {
                  onClose();
                  setBookedSuccess(false);
                }}
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold px-6 py-2.5 rounded-xl text-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-1">
              <Crown className="w-4 h-4 fill-amber-500" />
              Batu Emas Inn Reservation
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">
              Complete Your Suite Booking
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Room Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Select Room or Suite
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold text-sm bg-stone-50 focus:ring-2 focus:ring-amber-500"
                >
                  {ROOMS.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} — ${r.pricePerNight}/night ({r.subtitle})
                    </option>
                  ))}
                </select>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Full Guest Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Guest Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="guest@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkInDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOutDate}
                    min={checkInDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Guests Count
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold bg-stone-50"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>6 Guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Special Requests / Arrival Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Late check-in, high floor preference, airport transfer request..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm resize-none"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-900 font-bold">Estimated Total Amount:</div>
                  <div className="text-[11px] text-stone-600">
                    {nightCount} night(s) x ${currentRoom.pricePerNight} / night
                  </div>
                </div>
                <div className="font-serif text-2xl font-extrabold text-amber-700">
                  ${totalAmount}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-stone-950 font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 fill-stone-950" />
                <span>{submitting ? 'Creating Reservation...' : 'Confirm Reservation'}</span>
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
