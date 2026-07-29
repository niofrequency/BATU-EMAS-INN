import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserBookings, updateBookingStatus } from '../lib/dataService';
import { Booking } from '../types';
import { Calendar, Clock, Crown, Sparkles, CheckCircle2, AlertCircle, XCircle, RefreshCw, PlusCircle, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GuestDashboardProps {
  onOpenNewBooking: () => void;
}

export const GuestDashboard: React.FC<GuestDashboardProps> = ({ onOpenNewBooking }) => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  // Localized text dictionary for Guest Dashboard
  const text = {
    en: {
      badge: "Guest Member Portal",
      welcomeBack: "Welcome Back,",
      defaultGuest: "Guest",
      subtitle: "Manage your current hotel stays, view reservation status, or book your next getaway at Batu Emas Inn.",
      refreshTitle: "Refresh bookings",
      newReservation: "New Reservation",
      actionCancelled: "Booking has been cancelled.",
      sectionTitle: "My Hotel Reservations",
      recordsFound: "Records Found",
      loadingText: "Loading your reservation history from Firestore database...",
      noRecordsTitle: "No Reservations Found",
      noRecordsDesc: "You haven't placed any bookings under your current account yet. Click below to reserve your room or suite!",
      bookFirstRoom: "Book Your First Room",
      defaultRoom: "Batu Emas Room",
      bookingRef: "Booking Ref:",
      checkIn: "Check-In",
      checkOut: "Check-Out",
      guestsLabel: "Guests:",
      personLabel: "Person(s)",
      totalAmount: "Total Amount:",
      specialRequest: "Special Request:",
      cancelReservation: "Cancel Reservation",
      confirmCancelPrompt: "Are you sure you want to cancel this reservation?",
      statusConfirmed: "Confirmed",
      statusPending: "Pending Confirmation",
      statusCancelled: "Cancelled",
      statusCompleted: "Completed Stay"
    },
    id: {
      badge: "Portal Anggota Tamu",
      welcomeBack: "Selamat Datang Kembali,",
      defaultGuest: "Tamu",
      subtitle: "Kelola masa inap hotel Anda saat ini, lihat status reservasi, atau pesan liburan berikutnya di Batu Emas Inn.",
      refreshTitle: "Segarkan pemesanan",
      newReservation: "Reservasi Baru",
      actionCancelled: "Pemesanan telah dibatalkan.",
      sectionTitle: "Reservasi Hotel Saya",
      recordsFound: "Catatan Ditemukan",
      loadingText: "Memuat riwayat reservasi Anda dari database Firestore...",
      noRecordsTitle: "Tidak Ada Reservasi Ditemukan",
      noRecordsDesc: "Anda belum melakukan pemesanan di bawah akun Anda saat ini. Klik di bawah untuk memesan kamar atau suite Anda!",
      bookFirstRoom: "Pesan Kamar Pertama Anda",
      defaultRoom: "Kamar Batu Emas",
      bookingRef: "Ref Pesanan:",
      checkIn: "Check-In",
      checkOut: "Check-Out",
      guestsLabel: "Tamu:",
      personLabel: "Orang",
      totalAmount: "Total Jumlah:",
      specialRequest: "Permintaan Khusus:",
      cancelReservation: "Batalkan Reservasi",
      confirmCancelPrompt: "Apakah Anda yakin ingin membatalkan reservasi ini?",
      statusConfirmed: "Terkonfirmasi",
      statusPending: "Menunggu Konfirmasi",
      statusCancelled: "Dibatalkan",
      statusCompleted: "Selesai Menginap"
    }
  }[lang];

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchUserBookings(user.uid);
      setBookings(data);
    } catch (e) {
      console.error("Error loading user bookings:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleCancel = async (bookingId: string) => {
    if (!window.confirm(text.confirmCancelPrompt)) return;
    try {
      await updateBookingStatus(bookingId, 'cancelled');
      setActionMsg(text.actionCancelled);
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {text.statusConfirmed}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5" />
            {text.statusPending}
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-3.5 h-3.5" />
            {text.statusCancelled}
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {text.statusCompleted}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-10 bg-stone-50 min-h-screen w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 space-y-8">
        
        {/* Header Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>{text.badge}</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-stone-900">
              {text.welcomeBack} {user?.displayName || text.defaultGuest}
            </h1>
            <p className="text-stone-600 text-sm">
              {text.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-3 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
              title={text.refreshTitle}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenNewBooking}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{text.newReservation}</span>
            </button>
          </div>
        </div>

        {actionMsg && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{actionMsg}</span>
          </div>
        )}

        {/* Bookings Collection Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              {text.sectionTitle}
            </h2>
            <span className="text-xs font-semibold text-stone-500">
              {bookings.length} {text.recordsFound}
            </span>
          </div>

          {loading ? (
            <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-500 text-sm">
              {text.loadingText}
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center space-y-4">
              <Calendar className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-stone-800">{text.noRecordsTitle}</h3>
              <p className="text-stone-500 text-xs max-w-sm mx-auto">
                {text.noRecordsDesc}
              </p>
              <button
                onClick={onOpenNewBooking}
                className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs"
              >
                {text.bookFirstRoom}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow space-y-4 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between border-b border-stone-100 pb-3">
                    <div>
                      <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                        {b.roomName || text.defaultRoom}
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5">
                        {text.bookingRef} <span className="font-mono text-stone-700">{b.id}</span>
                      </div>
                    </div>
                    {getStatusBadge(b.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                      <span className="text-stone-500 block font-medium">{text.checkIn}</span>
                      <strong className="text-stone-900 text-sm">{b.checkInDate}</strong>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                      <span className="text-stone-500 block font-medium">{text.checkOut}</span>
                      <strong className="text-stone-900 text-sm">{b.checkOutDate}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
                    <div>{text.guestsLabel} <strong>{b.guests} {text.personLabel}</strong></div>
                    <div>{text.totalAmount} <strong className="text-amber-700 font-serif text-base">${b.totalAmount}</strong></div>
                  </div>

                  {b.specialRequests && (
                    <div className="text-xs bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/50 text-amber-900">
                      <strong>{text.specialRequest}</strong> {b.specialRequests}
                    </div>
                  )}

                  {b.status === 'pending' && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => b.id && handleCancel(b.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-bold px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                      >
                        {text.cancelReservation}
                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
