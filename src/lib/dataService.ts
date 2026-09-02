import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Booking, ContactMessage, UserProfile, UserRole } from '../types';

const BOOKINGS_KEY = 'batu_emas_bookings_v1';
const MESSAGES_KEY = 'batu_emas_messages_v1';
const USERS_KEY = 'batu_emas_users_v1';

// Seed Initial Mock Data for Demo / Fallback Mode
const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    userID: 'demo-guest-id',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor@example.com',
    guestPhone: '+1 (555) 234-5678',
    checkInDate: '2026-08-10',
    checkOutDate: '2026-08-14',
    guests: 2,
    roomType: 'standard',
    roomName: 'Batu Emas Inn Room',
    status: 'confirmed',
    totalAmount: 1400000,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    specialRequests: 'Late check-in requested (around 8 PM).'
  },
  {
    id: 'bk-102',
    userID: 'demo-guest-id-2',
    guestName: 'Marcus Aurelius',
    guestEmail: 'marcus@example.com',
    guestPhone: '+62 812-3456-7890',
    checkInDate: '2026-08-20',
    checkOutDate: '2026-08-25',
    guests: 2,
    roomType: 'standard',
    roomName: 'Batu Emas Inn Room',
    status: 'pending',
    totalAmount: 1750000,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    specialRequests: 'Add extra pillows.'
  }
];

const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-201',
    senderName: 'Sophia Chen',
    email: 'sophia.chen@example.com',
    phone: '+62 813-1234-5678',
    subject: 'Meeting Room Inquiry',
    messageText: 'Hello Batu Emas Inn team! We would like to book the meeting room for 25 people next month for a full-day company training. Could you send us the rates and availability?',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    readStatus: 'unread'
  },
  {
    id: 'msg-202',
    senderName: 'David Miller',
    email: 'david.m@example.com',
    phone: '+62 812-9876-5432',
    subject: 'Room Block Reservation',
    messageText: 'I would like to inquire about booking a block of Superior rooms for our team visiting Timika during the upcoming project in September.',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    readStatus: 'read',
    replyNotes: 'Replied via phone call with availability details.'
  }
];

const DEFAULT_USERS: UserProfile[] = [
  {
    uid: 'demo-admin-id',
    email: 'mpigome44@gmail.com',
    displayName: 'Hotel Administrator',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    uid: 'demo-guest-id',
    email: 'guest@batuemas.com',
    displayName: 'Eleanor Vance',
    role: 'guest',
    createdAt: new Date().toISOString()
  }
];

function getLocalData<T>(key: string, defaultData: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultData;
  }
}

function setLocalData<T>(key: string, data: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

// BOOKINGS API
export async function createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
  const newBooking: Booking = {
    ...bookingData,
    createdAt: new Date().toISOString(),
    status: bookingData.status || 'pending'
  };

  try {
    const docRef = await addDoc(collection(db, 'bookings'), newBooking);
    return { ...newBooking, id: docRef.id };
  } catch (err) {
    console.warn("Firestore save failed, persisting locally:", err);
    const local = getLocalData<Booking>(BOOKINGS_KEY, DEFAULT_BOOKINGS);
    const mockBooking = { ...newBooking, id: 'bk-' + Date.now() };
    local.unshift(mockBooking);
    setLocalData(BOOKINGS_KEY, local);
    return mockBooking;
  }
}

export async function fetchUserBookings(userID: string): Promise<Booking[]> {
  try {
    const q = query(collection(db, 'bookings'), where('userID', '==', userID));
    const snapshot = await getDocs(q);
    const list: Booking[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() } as Booking);
    });
    if (list.length > 0) return list;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'bookings');
  }

  // Fallback
  const local = getLocalData<Booking>(BOOKINGS_KEY, DEFAULT_BOOKINGS);
  return local.filter(b => b.userID === userID || userID === 'demo-guest-id');
}

export async function fetchAllBookings(): Promise<Booking[]> {
  try {
    const snapshot = await getDocs(collection(db, 'bookings'));
    const list: Booking[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() } as Booking);
    });
    if (list.length > 0) return list;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'bookings');
  }

  return getLocalData<Booking>(BOOKINGS_KEY, DEFAULT_BOOKINGS);
}

export async function updateBookingStatus(bookingID: string, status: Booking['status']): Promise<void> {
  try {
    const docRef = doc(db, 'bookings', bookingID);
    await updateDoc(docRef, { status });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `bookings/${bookingID}`);
  }

  // Sync Local
  const local = getLocalData<Booking>(BOOKINGS_KEY, DEFAULT_BOOKINGS);
  const updated = local.map(b => b.id === bookingID ? { ...b, status } : b);
  setLocalData(BOOKINGS_KEY, updated);
}

export async function deleteBooking(bookingID: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'bookings', bookingID));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `bookings/${bookingID}`);
  }

  const local = getLocalData<Booking>(BOOKINGS_KEY, DEFAULT_BOOKINGS);
  const filtered = local.filter(b => b.id !== bookingID);
  setLocalData(BOOKINGS_KEY, filtered);
}

// CONTACT MESSAGES API
export async function createContactMessage(msgData: Omit<ContactMessage, 'id' | 'timestamp' | 'readStatus'>): Promise<ContactMessage> {
  const newMsg: ContactMessage = {
    ...msgData,
    timestamp: new Date().toISOString(),
    readStatus: 'unread'
  };

  try {
    const docRef = await addDoc(collection(db, 'messages'), newMsg);
    return { ...newMsg, id: docRef.id };
  } catch (err) {
    console.warn("Firestore message write fallback:", err);
    const local = getLocalData<ContactMessage>(MESSAGES_KEY, DEFAULT_MESSAGES);
    const mockMsg = { ...newMsg, id: 'msg-' + Date.now() };
    local.unshift(mockMsg);
    setLocalData(MESSAGES_KEY, local);
    return mockMsg;
  }
}

export async function fetchAllMessages(): Promise<ContactMessage[]> {
  try {
    const snapshot = await getDocs(collection(db, 'messages'));
    const list: ContactMessage[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() } as ContactMessage);
    });
    if (list.length > 0) return list;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'messages');
  }

  return getLocalData<ContactMessage>(MESSAGES_KEY, DEFAULT_MESSAGES);
}

export async function updateMessageStatus(messageID: string, readStatus: ContactMessage['readStatus'], replyNotes?: string): Promise<void> {
  try {
    const docRef = doc(db, 'messages', messageID);
    await updateDoc(docRef, { readStatus, ...(replyNotes ? { replyNotes } : {}) });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `messages/${messageID}`);
  }

  const local = getLocalData<ContactMessage>(MESSAGES_KEY, DEFAULT_MESSAGES);
  const updated = local.map(m => m.id === messageID ? { ...m, readStatus, ...(replyNotes ? { replyNotes } : {}) } : m);
  setLocalData(MESSAGES_KEY, updated);
}

export async function deleteMessage(messageID: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'messages', messageID));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `messages/${messageID}`);
  }

  const local = getLocalData<ContactMessage>(MESSAGES_KEY, DEFAULT_MESSAGES);
  const filtered = local.filter(m => m.id !== messageID);
  setLocalData(MESSAGES_KEY, filtered);
}

// USER PROFILES & ROLES
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    await setDoc(doc(db, 'users', profile.uid), profile, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${profile.uid}`);
  }

  const local = getLocalData<UserProfile>(USERS_KEY, DEFAULT_USERS);
  const idx = local.findIndex(u => u.uid === profile.uid);
  if (idx >= 0) {
    local[idx] = { ...local[idx], ...profile };
  } else {
    local.push(profile);
  }
  setLocalData(USERS_KEY, local);
}

export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users/${uid}`);
  }

  const local = getLocalData<UserProfile>(USERS_KEY, DEFAULT_USERS);
  return local.find(u => u.uid === uid) || null;
}

export async function fetchAllUsers(): Promise<UserProfile[]> {
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    const list: UserProfile[] = [];
    snapshot.forEach((doc) => {
      list.push(doc.data() as UserProfile);
    });
    if (list.length > 0) return list;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'users');
  }

  return getLocalData<UserProfile>(USERS_KEY, DEFAULT_USERS);
}

export async function updateUserRole(uid: string, role: UserRole): Promise<void> {
  try {
    await updateDoc(doc(db, 'users', uid), { role });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `users/${uid}`);
  }

  const local = getLocalData<UserProfile>(USERS_KEY, DEFAULT_USERS);
  const updated = local.map(u => u.uid === uid ? { ...u, role } : u);
  setLocalData(USERS_KEY, updated);
}
