export type UserRole = 'admin' | 'guest';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
}

export type RoomType = 'deluxe_gold' | 'executive_suite' | 'royal_amber' | 'family_villa';

export interface RoomInfo {
  id: RoomType;
  name: string;
  subtitle: string;
  pricePerNight: number;
  capacity: number;
  size: string;
  description: string;
  image: string;
  amenities: string[];
  rating: number;
  featured?: boolean;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id?: string;
  userID: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType: string;
  roomName?: string;
  status: BookingStatus;
  totalAmount: number;
  createdAt: string;
  specialRequests?: string;
}

export type MessageStatus = 'unread' | 'read' | 'replied';

export interface ContactMessage {
  id?: string;
  senderName: string;
  email: string;
  phone?: string;
  subject?: string;
  messageText: string;
  timestamp: string;
  readStatus: MessageStatus;
  replyNotes?: string;
}
