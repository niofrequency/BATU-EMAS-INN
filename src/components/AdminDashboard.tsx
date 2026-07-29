import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  fetchAllBookings, 
  updateBookingStatus, 
  deleteBooking, 
  fetchAllMessages, 
  updateMessageStatus, 
  deleteMessage,
  fetchAllUsers,
  updateUserRole,
  createBooking
} from '../lib/dataService';
import { Booking, ContactMessage, UserProfile, UserRole } from '../types';
import { ROOMS } from '../data/rooms';
import { 
  ShieldCheck, 
  Inbox, 
  Calendar, 
  Users, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  RefreshCw, 
  MailCheck, 
  Mail, 
  PlusCircle, 
  DollarSign, 
  Filter,
  Sparkles,
  Edit2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'bookings' | 'messages' | 'users' | 'add_booking'>('bookings');
  
  // Data States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [actionMsg, setActionMsg] = useState('');

  // New Booking Form state for Walk-ins
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestEmail, setNewGuestEmail] = useState('');
  const [newRoomType, setNewRoomType] = useState('deluxe_gold');
  const [newCheckIn, setNewCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [newCheckOut, setNewCheckOut] = useState(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
  const [newGuests, setNewGuests] = useState(2);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [bData, mData, uData] = await Promise.all([
        fetchAllBookings(),
        fetchAllMessages(),
        fetchAllUsers()
      ]);
      setBookings(bData);
      setMessages(mData);
      setUsersList(uData);
    } catch (e) {
      console.error("Error loading admin data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  // BOOKING HANDLERS
  const handleUpdateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      await updateBookingStatus(id, status);
      setActionMsg(`Booking status updated to ${status}.`);
      loadAllAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this booking record?")) return;
    try {
      await deleteBooking(id);
      setActionMsg('Booking record removed.');
      loadAllAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  // MESSAGE HANDLERS
  const handleMessageRead = async (id: string, status: ContactMessage['readStatus'], replyNotes?: string) => {
    try {
      await updateMessageStatus(id, status, replyNotes);
      setActionMsg(`Message status set to ${status}.`);
      loadAllAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Delete this inquiry message?")) return;
    try {
      await deleteMessage(id);
      setActionMsg('Message inquiry deleted.');
      loadAllAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  // USER ROLE HANDLERS
  const handleRoleChange = async (uid: string, role: UserRole) => {
    try {
      await updateUserRole(uid, role);
      setActionMsg(`User role updated to ${role}.`);
      loadAllAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  // CREATE WALK-IN BOOKING
  const handleCreateWalkInBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const room = ROOMS.find(r => r.id === newRoomType) || ROOMS[0];
    const nightCount = Math.max(1, Math.round((new Date(newCheckOut).getTime() - new Date(newCheckIn).getTime()) / (1000 * 3600 * 24)));
    
    try {
      await createBooking({
        userID: 'walkin-' + Date.now(),
        guestName: newGuestName,
        guestEmail: newGuestEmail,
        checkInDate: newCheckIn,
        checkOutDate: newCheckOut,
        guests: newGuests,
        roomType: room.id,
        roomName: room.name,
        status: 'confirmed',
        totalAmount: room.pricePerNight * nightCount,
        specialRequests: 'Walk-in / Direct Admin Phone Reservation'
      });
      setActionMsg('New reservation successfully recorded.');
      setNewGuestName('');
      setNewGuestEmail('');
      setActiveTab('bookings');
      loadAllAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  // Metrics
  const totalRevenue = bookings.filter(b => b.status === 'confirmed' || b.status === 'completed').reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const pendingBookingsCount = bookings.filter(b => b.status === 'pending').length;
  const unreadMessagesCount = messages.filter(m => m.readStatus === 'unread').length;

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (b.id && b.id.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-10 bg-stone-900 text-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header Banner */}
        <div className="bg-emerald-950 p-6 sm:p-8 rounded-3xl border-2 border-emerald-800/60 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Full Admin Management Control</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-white">
              Hotel Staff & Operations Portal
            </h1>
            <p className="text-stone-300 text-sm">
              Logged in as <strong className="text-amber-300">{user?.displayName}</strong> ({user?.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllAdminData}
              className="px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:bg-stone-800 text-stone-200 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Action Toast Feedback */}
        {actionMsg && (
          <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{actionMsg}</span>
            </div>
            <button onClick={() => setActionMsg('')} className="text-stone-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Summary Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
              <span>Total Bookings</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-serif text-2xl font-bold text-white">{bookings.length}</div>
            <div className="text-[11px] text-amber-400 font-medium">{pendingBookingsCount} Pending Approvals</div>
          </div>

          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
              <span>Confirmed Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-serif text-2xl font-bold text-emerald-400">${totalRevenue}</div>
            <div className="text-[11px] text-stone-400">Total processed revenue</div>
          </div>

          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
              <span>Inquiry Messages</span>
              <Inbox className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-serif text-2xl font-bold text-white">{messages.length}</div>
            <div className="text-[11px] text-amber-300 font-medium">{unreadMessagesCount} Unread Inquiries</div>
          </div>

          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
              <span>Registered Users</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="font-serif text-2xl font-bold text-white">{usersList.length}</div>
            <div className="text-[11px] text-stone-400">Guest & Staff Profiles</div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-stone-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'bookings'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Bookings CRUD ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all relative ${
              activeTab === 'messages'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Contact Messages ({messages.length})</span>
            {unreadMessagesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'users'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Roles ({usersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add_booking')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'add_booking'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Walk-In Booking</span>
          </button>
        </div>

        {/* TAB 1: BOOKINGS CRUD */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between bg-stone-950 p-4 rounded-2xl border border-stone-800">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by guest name, email, or booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-stone-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-stone-900 border border-stone-700 rounded-xl text-xs px-3 py-2 text-white font-semibold"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending Only</option>
                  <option value="confirmed">Confirmed Only</option>
                  <option value="completed">Completed Only</option>
                  <option value="cancelled">Cancelled Only</option>
                </select>
              </div>
            </div>

            {/* Bookings Table / Cards */}
            {loading ? (
              <div className="bg-stone-950 p-12 text-center text-stone-400 text-xs rounded-2xl border border-stone-800">
                Fetching reservations from Firestore...
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="bg-stone-950 p-12 text-center text-stone-400 text-xs rounded-2xl border border-stone-800">
                No matching bookings found.
              </div>
            ) : (
              <div className="overflow-x-auto bg-stone-950 rounded-2xl border border-stone-800">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-stone-900 uppercase font-bold text-stone-400 border-b border-stone-800">
                    <tr>
                      <th className="p-4">Guest Details</th>
                      <th className="p-4">Room & Stay</th>
                      <th className="p-4">Dates</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-900/60 transition-colors">
                        
                        <td className="p-4">
                          <div className="font-bold text-white">{b.guestName}</div>
                          <div className="text-stone-400 text-[11px]">{b.guestEmail}</div>
                          {b.guestPhone && <div className="text-stone-500 text-[10px]">{b.guestPhone}</div>}
                        </td>

                        <td className="p-4">
                          <div className="font-semibold text-amber-300">{b.roomName || b.roomType}</div>
                          <div className="text-stone-400 text-[11px]">{b.guests} Guests</div>
                        </td>

                        <td className="p-4">
                          <div className="text-stone-200">{b.checkInDate} to {b.checkOutDate}</div>
                          <div className="text-[10px] text-stone-500">Booked: {new Date(b.createdAt).toLocaleDateString()}</div>
                        </td>

                        <td className="p-4 font-serif font-bold text-white text-sm">
                          ${b.totalAmount}
                        </td>

                        <td className="p-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            b.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' :
                            b.status === 'pending' ? 'bg-amber-950 text-amber-300 border border-amber-700' :
                            b.status === 'completed' ? 'bg-blue-950 text-blue-300 border border-blue-700' :
                            'bg-red-950 text-red-300 border border-red-700'
                          }`}>
                            {b.status}
                          </span>
                        </td>

                        <td className="p-4 text-right space-x-2">
                          {b.id && (
                            <>
                              {b.status === 'pending' && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id!, 'confirmed')}
                                  title="Approve / Confirm"
                                  className="px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded-lg text-[11px] font-bold"
                                >
                                  Approve
                                </button>
                              )}
                              
                              {b.status === 'confirmed' && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id!, 'completed')}
                                  title="Mark Completed"
                                  className="px-2.5 py-1 bg-blue-900 hover:bg-blue-800 text-blue-200 rounded-lg text-[11px] font-bold"
                                >
                                  Complete
                                </button>
                              )}

                              {b.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id!, 'cancelled')}
                                  title="Cancel"
                                  className="px-2.5 py-1 bg-amber-950 hover:bg-amber-900 text-amber-200 rounded-lg text-[11px] font-bold"
                                >
                                  Cancel
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteBooking(b.id!)}
                                title="Delete record"
                                className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: CONTACT MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                <Inbox className="w-5 h-5 text-amber-400" />
                Contact Form Message Inbox
              </h2>
              <span className="text-xs text-stone-400">
                Messages submitted directly from the landing page contact form
              </span>
            </div>

            {loading ? (
              <div className="bg-stone-950 p-12 text-center text-stone-400 text-xs rounded-2xl border border-stone-800">
                Fetching message inquiries from Firestore database...
              </div>
            ) : messages.length === 0 ? (
              <div className="bg-stone-950 p-12 text-center text-stone-400 text-xs rounded-2xl border border-stone-800">
                No contact form messages received yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`bg-stone-950 p-6 rounded-2xl border transition-all space-y-4 ${
                      m.readStatus === 'unread' ? 'border-amber-400 shadow-lg' : 'border-stone-800 opacity-90'
                    }`}
                  >
                    <div className="flex items-start justify-between border-b border-stone-800 pb-3">
                      <div>
                        <div className="font-bold text-white text-sm">{m.senderName}</div>
                        <div className="text-amber-300 text-xs">{m.email}</div>
                        {m.phone && <div className="text-stone-400 text-[11px]">{m.phone}</div>}
                      </div>

                      <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                        m.readStatus === 'unread' ? 'bg-red-950 text-red-300 border border-red-700' :
                        m.readStatus === 'replied' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                        'bg-stone-800 text-stone-300'
                      }`}>
                        {m.readStatus}
                      </span>
                    </div>

                    {m.subject && (
                      <div className="text-xs font-bold text-amber-400">
                        Subject: {m.subject}
                      </div>
                    )}

                    <div className="text-xs text-stone-300 leading-relaxed bg-stone-900 p-3.5 rounded-xl border border-stone-800">
                      "{m.messageText}"
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1">
                      <span>Received: {new Date(m.timestamp).toLocaleString()}</span>
                      
                      <div className="flex items-center gap-2">
                        {m.id && (
                          <>
                            {m.readStatus === 'unread' && (
                              <button
                                onClick={() => handleMessageRead(m.id!, 'read')}
                                className="text-xs px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-md font-medium"
                              >
                                Mark Read
                              </button>
                            )}

                            <button
                              onClick={() => handleMessageRead(m.id!, 'replied', 'Replied by admin via email')}
                              className="text-xs px-2 py-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded-md font-medium"
                            >
                              Mark Replied
                            </button>

                            <button
                              onClick={() => handleDeleteMessage(m.id!)}
                              className="p-1 text-stone-500 hover:text-red-400"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: USER ROLES MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                User Profiles & Role Management
              </h2>
              <span className="text-xs text-stone-400">
                Promote or demote user access privileges ('admin' vs 'guest')
              </span>
            </div>

            <div className="overflow-x-auto bg-stone-950 rounded-2xl border border-stone-800">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-900 uppercase font-bold text-stone-400 border-b border-stone-800">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Current Role</th>
                    <th className="p-4 text-right">Change Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  {usersList.map((u) => (
                    <tr key={u.uid} className="hover:bg-stone-900/60 transition-colors">
                      <td className="p-4 font-bold text-white">{u.displayName || 'User'}</td>
                      <td className="p-4 text-stone-400">{u.email}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          u.role === 'admin' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-amber-950 text-amber-300 border border-amber-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {u.role === 'guest' ? (
                          <button
                            onClick={() => handleRoleChange(u.uid, 'admin')}
                            className="px-3 py-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded-lg text-xs font-bold"
                          >
                            Promote to Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRoleChange(u.uid, 'guest')}
                            className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-bold"
                          >
                            Demote to Guest
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 4: WALK-IN / DIRECT BOOKING */}
        {activeTab === 'add_booking' && (
          <div className="bg-stone-950 p-8 rounded-2xl border border-stone-800 max-w-2xl space-y-6">
            <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-amber-400" />
              Create Walk-In / Phone Reservation
            </h2>

            <form onSubmit={handleCreateWalkInBooking} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">Guest Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Guest Name"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">Guest Email</label>
                  <input
                    type="email"
                    required
                    placeholder="guest@example.com"
                    value={newGuestEmail}
                    onChange={(e) => setNewGuestEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Select Room</label>
                <select
                  value={newRoomType}
                  onChange={(e) => setNewRoomType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm"
                >
                  {ROOMS.map(r => (
                    <option key={r.id} value={r.id}>{r.name} (${r.pricePerNight}/night)</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">Check-in</label>
                  <input
                    type="date"
                    required
                    value={newCheckIn}
                    onChange={(e) => setNewCheckIn(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">Check-out</label>
                  <input
                    type="date"
                    required
                    value={newCheckOut}
                    onChange={(e) => setNewCheckOut(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">Guests</label>
                  <select
                    value={newGuests}
                    onChange={(e) => setNewGuests(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold rounded-xl shadow-md text-sm mt-4"
              >
                Record Reservation directly
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
