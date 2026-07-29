import { RoomInfo } from '../types';

export const ROOMS: RoomInfo[] = [
  {
    id: 'deluxe_gold',
    name: 'Deluxe Gold Room',
    subtitle: 'Golden Elegance & Pool View',
    pricePerNight: 120,
    capacity: 2,
    size: '38 m²',
    description: 'A spacious and meticulously crafted retreat featuring signature polished yellow marble tile accents, a king-sized mattress, private balcony, and serene garden view.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    amenities: ['King Bed', 'Free High-Speed Wi-Fi', 'Balcony with Garden View', 'Golden Tile Bathroom', '55" Smart TV', 'Mini Bar', 'Air Conditioning'],
    rating: 4.9,
    featured: true
  },
  {
    id: 'executive_suite',
    name: 'Executive Amber Suite',
    subtitle: 'Luxury Living & Work Studio',
    pricePerNight: 210,
    capacity: 3,
    size: '56 m²',
    description: 'Designed for discerning travelers. Features a separate lounge area with golden oak furnishings, deep soak bathtub, coffee espresso lounge, and sunset views.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    amenities: ['King Bed + Sofa Bed', 'Separate Living Room', 'Espresso Machine', 'Soaking Bathtub', 'Executive Desk', '24/7 Butler Service', 'Free Breakfast'],
    rating: 4.95,
    featured: true
  },
  {
    id: 'royal_amber',
    name: 'Royal Emas Suite',
    subtitle: 'The Pinnacle of Luxury',
    pricePerNight: 350,
    capacity: 4,
    size: '85 m²',
    description: 'Our crown jewel. Magnificent suite boasting glossy gold tile floors, panoramic floor-to-ceiling windows, private jacuzzi, dining room, and VIP lounge access.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Master Bedroom + Twin Bedroom', 'Private In-Room Jacuzzi', 'VIP Lounge Access', 'Floor-to-Ceiling Windows', 'Private Dining Table', 'Complimentary Champagne'],
    rating: 5.0,
    featured: true
  },
  {
    id: 'family_villa',
    name: 'Family Golden Villa',
    subtitle: 'Private Sanctuary for Families',
    pricePerNight: 280,
    capacity: 6,
    size: '110 m²',
    description: 'An expansive private sanctuary surrounded by tropical flora. Features two master bedrooms, private pool deck, full kitchen, and family entertaining space.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    amenities: ['2 Bedrooms (3 Beds)', 'Private Pool Access', 'Fully Equipped Kitchenette', 'Spacious Outdoor Deck', 'Kid-Friendly Amenities', 'Private Barbecue Area'],
    rating: 4.88,
    featured: false
  }
];

export const HOTEL_AMENITIES = [
  {
    icon: 'Wifi',
    title: 'Ultra-Fast Wi-Fi',
    description: 'Seamless high-speed wireless connectivity throughout the entire resort and pool area.'
  },
  {
    icon: 'Waves',
    title: 'Infinity Gold Pool',
    description: 'Temperature-controlled outdoor swimming pool framed by sun loungers and tropical greenery.'
  },
  {
    icon: 'UtensilsCrossed',
    title: 'Emas Fine Dining',
    description: 'Authentic local delicacies and international gourmet dishes crafted by award-winning chefs.'
  },
  {
    icon: 'Clock',
    title: '24/7 Concierge Service',
    description: 'Personalized hospitality round-the-clock, including valet parking, tours, and shuttle service.'
  },
  {
    icon: 'Sparkles',
    title: 'Serene Spa & Wellness',
    description: 'Rejuvenating aromatherapy massages, sauna suites, and holistic body treatments.'
  },
  {
    icon: 'Car',
    title: 'Airport Transfer & Valet',
    description: 'Complimentary luxury airport shuttle pickup and 24-hour guarded valet parking.'
  }
];
