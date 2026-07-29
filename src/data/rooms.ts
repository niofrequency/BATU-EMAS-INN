import { RoomInfo } from '../types';
 
export const getRooms = (lang: 'en' | 'id'): RoomInfo[] => {
  if (lang === 'id') {
    return [
      {
        id: 'deluxe_gold',
        name: 'Kamar Deluxe Gold',
        subtitle: 'Keemasan Elegan & Pemandangan Kolam',
        pricePerNight: 120,
        capacity: 2,
        size: '38 m²',
        description: 'Tempat peristirahatan luas yang dibuat dengan cermat, menampilkan aksen ubin marmer kuning mengkilap khas, kasur ukuran king, balkon pribadi, dan pemandangan taman yang tenang.',
        image: '/img/room 1.webp',
        amenities: ['Kasur King', 'Wi-Fi Kecepatan Tinggi', 'Balkon Pemandangan Taman', 'Kamar Mandi Ubin Emas', 'Smart TV 55"', 'Mini Bar', 'AC'],
        rating: 4.9,
        featured: true
      },
      {
        id: 'executive_suite',
        name: 'Suite Eksekutif Amber',
        subtitle: 'Ruang Tamu Mewah & Studio Kerja',
        pricePerNight: 210,
        capacity: 3,
        size: '56 m²',
        description: 'Dirancang untuk pelancong cerdas. Menampilkan area santai terpisah dengan perabotan kayu ek emas, bathtub rendam dalam, lounge kopi espresso, dan pemandangan matahari terbenam.',
        image: '/img/room 2.webp',
        amenities: ['Kasur King + Sofa Bed', 'Ruang Tamu Terpisah', 'Mesin Espresso', 'Bathtub Rendam', 'Meja Kerja Eksekutif', 'Layanan Pelayan 24/7', 'Sarapan Gratis'],
        rating: 4.95,
        featured: true
      },
      {
        id: 'royal_amber',
        name: 'Suite Royal Emas',
        subtitle: 'Puncak Kemewahan',
        pricePerNight: 350,
        capacity: 4,
        size: '85 m²',
        description: 'Permata mahkota kami. Suite megah yang menawarkan lantai ubin emas mengkilap, jendela panorama dari lantai ke langit-langit, jacuzzi pribadi, ruang makan, dan akses lounge VIP.',
        image: '/img/room 3.webp',
        amenities: ['Kamar Utama + Kamar Twin', 'Jacuzzi Pribadi di Kamar', 'Akses Lounge VIP', 'Jendela Full Kaca', 'Meja Makan Pribadi', 'Champagne Gratis'],
        rating: 5.0,
        featured: true
      },
      {
        id: 'family_villa',
        name: 'Vila Keluarga Golden',
        subtitle: 'Suaka Pribadi untuk Keluarga',
        pricePerNight: 280,
        capacity: 6,
        size: '110 m²',
        description: 'Tempat perlindungan pribadi yang luas dikelilingi oleh flora tropis. Menampilkan dua kamar tidur utama, dek kolam renang pribadi, dapur lengkap, dan ruang hiburan keluarga.',
        image: '/img/room 3.webp',
        amenities: ['2 Kamar Tidur (3 Kasur)', 'Akses Kolam Renang Pribadi', 'Dapur Kecil Lengkap', 'Dek Luar Ruangan Luas', 'Fasilitas Ramah Anak', 'Area Barbeque Pribadi'],
        rating: 4.88,
        featured: false
      }
    ];
  }

  return [
    {
      id: 'deluxe_gold',
      name: 'Deluxe Gold Room',
      subtitle: 'Golden Elegance & Pool View',
      pricePerNight: 120,
      capacity: 2,
      size: '38 m²',
      description: 'A spacious and meticulously crafted retreat featuring signature polished yellow marble tile accents, a king-sized mattress, private balcony, and serene garden view.',
      image: '/img/room 3.webp',
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
      image: '/img/room 3.webp',
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
      image: '/img/room 3.webp',
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
      image: '/img/room 3.webp',
      amenities: ['2 Bedrooms (3 Beds)', 'Private Pool Access', 'Fully Equipped Kitchenette', 'Spacious Outdoor Deck', 'Kid-Friendly Amenities', 'Private Barbecue Area'],
      rating: 4.88,
      featured: false
    }
  ];
};

export const getHotelAmenities = (lang: 'en' | 'id') => {
  if (lang === 'id') {
    return [
      {
        icon: 'Wifi',
        title: 'Wi-Fi Super Cepat',
        description: 'Konektivitas nirkabel berkecepatan tinggi tanpa hambatan di seluruh area resor dan kolam renang.'
      },
      {
        icon: 'Waves',
        title: 'Kolam Renang Emas Infinity',
        description: 'Kolam renang luar ruangan dengan suhu terkontrol yang dikelilingi oleh kursi berjemur dan tanaman hijau tropis.'
      },
      {
        icon: 'UtensilsCrossed',
        title: 'Restoran Mewah Emas',
        description: 'Hidangan khas lokal yang otentik dan menu gourmet internasional yang dibuat oleh koki peraih penghargaan.'
      },
      {
        icon: 'Clock',
        title: 'Layanan Pramutamu 24/7',
        description: 'Keramahan personal sepanjang waktu, termasuk parkir valet, tur, dan layanan antar-jemput.'
      },
      {
        icon: 'Sparkles',
        title: 'Spa & Kebugaran Tenang',
        description: 'Pijat aromaterapi yang menyegarkan, ruang sauna, dan perawatan tubuh holistik.'
      },
      {
        icon: 'Car',
        title: 'Antar-Jemput Bandara & Valet',
        description: 'Layanan antar-jemput bandara mewah gratis dan parkir valet berpenjaga 24 jam.'
      }
    ];
  }

  return [
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
};

export const ROOMS: RoomInfo[] = getRooms('en');
export const HOTEL_AMENITIES = getHotelAmenities('en');
