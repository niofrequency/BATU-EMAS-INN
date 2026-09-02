import { RoomInfo } from '../types';

export const getRooms = (lang: 'en' | 'id'): RoomInfo[] => {
  if (lang === 'id') {
    return [
      {
        id: 'junior',
        name: 'Junior Room',
        subtitle: 'Kamar Twin Nyaman di Lantai 3',
        pricePerNight: 300,
        capacity: 2,
        size: '16 m²',
        description: 'Kamar praktis dengan 2 tempat tidur single, cocok untuk rekan perjalanan atau teman yang bepergian bersama dengan harga terjangkau.',
        image: '/img/room 1.webp',
        amenities: ['2 Tempat Tidur Single', 'AC', 'Wi-Fi Gratis', 'Televisi', 'Air Panas & Dingin', 'Housekeeping Harian'],
        rating: 4.6,
        featured: false
      },
      {
        id: 'superior',
        name: 'Superior Room',
        subtitle: 'Kamar Lantai 2, Single atau Double',
        pricePerNight: 350,
        capacity: 2,
        size: '16 m²',
        description: 'Kamar dengan pilihan 1 tempat tidur single atau double, cocok untuk pelancong solo maupun pasangan. Tambahan Rp 50.000 untuk sarapan 2 orang.',
        image: '/img/room 2.webp',
        amenities: ['Tempat Tidur Single/Double', 'AC', 'Wi-Fi Gratis', 'Televisi', 'Air Panas & Dingin', 'Housekeeping Harian'],
        rating: 4.7,
        featured: true
      },
      {
        id: 'deluxe',
        name: 'Deluxe Room',
        subtitle: 'Kamar Lantai 1, Sudah Termasuk Sarapan',
        pricePerNight: 400,
        capacity: 2,
        size: '16 m²',
        description: 'Kamar tarif terbaik kami di lantai 1, sudah termasuk sarapan setiap hari untuk memulai hari Anda dengan nyaman di Batu Emas Inn.',
        image: '/img/room 3.webp',
        amenities: ['Tempat Tidur Single', 'Sarapan Termasuk', 'AC', 'Wi-Fi Gratis', 'Televisi', 'Air Panas & Dingin'],
        rating: 4.8,
        featured: true
      }
    ];
  }

  return [
    {
      id: 'junior',
      name: 'Junior Room',
      subtitle: 'Cozy Twin Room on the 3rd Floor',
      pricePerNight: 300,
      capacity: 2,
      size: '16 m²',
      description: 'A practical room fitted with two single beds, perfect for friends or colleagues travelling together on a budget.',
      image: '/img/room 1.webp',
      amenities: ['2 Single Beds', 'Air Conditioning', 'Free Wi-Fi', 'Television', 'Hot & Cold Shower', 'Daily Housekeeping'],
      rating: 4.6,
      featured: false
    },
    {
      id: 'superior',
      name: 'Superior Room',
      subtitle: '2nd Floor, Single or Double Bed',
      pricePerNight: 350,
      capacity: 2,
      size: '16 m²',
      description: 'A well-appointed room with the option of a single or double bed, ideal for solo travellers and couples. Add Rp 50,000 for breakfast for 2 guests.',
      image: '/img/room 2.webp',
      amenities: ['Single or Double Bed', 'Air Conditioning', 'Free Wi-Fi', 'Television', 'Hot & Cold Shower', 'Daily Housekeeping'],
      rating: 4.7,
      featured: true
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      subtitle: '1st Floor, Breakfast Included',
      pricePerNight: 400,
      capacity: 2,
      size: '16 m²',
      description: 'Our best-rate room on the 1st floor, with breakfast included every day for a comfortable start to your stay at Batu Emas Inn.',
      image: '/img/room 3.webp',
      amenities: ['Single Bed', 'Breakfast Included', 'Air Conditioning', 'Free Wi-Fi', 'Television', 'Hot & Cold Shower'],
      rating: 4.8,
      featured: true
    }
  ];
};

export const getHotelAmenities = (lang: 'en' | 'id') => {
  if (lang === 'id') {
    return [
      {
        icon: 'Wifi',
        title: 'Wi-Fi Gratis',
        description: 'Akses internet nirkabel gratis di seluruh area hotel.'
      },
      {
        icon: 'Wind',
        title: 'AC (Air Conditioner)',
        description: 'Pendingin ruangan di setiap kamar untuk kenyamanan Anda.'
      },
      {
        icon: 'UtensilsCrossed',
        title: 'Restoran & Ruang Meeting',
        description: 'Batu Emas Resto dan ruang pertemuan tersedia untuk acara dan rapat kecil.'
      },
      {
        icon: 'Clock',
        title: 'Layanan 24 Jam',
        description: 'Resepsionis dan bantuan tamu siap melayani 24 jam setiap hari.'
      },
      {
        icon: 'Tv',
        title: 'Televisi',
        description: 'TV tersedia di setiap kamar tamu.'
      },
      {
        icon: 'Car',
        title: 'Parkir',
        description: 'Area parkir luas dan gratis, lokasi dekat dengan Bandara Mozes Kilangin.'
      },
      {
        icon: 'Sparkles',
        title: 'Housekeeping',
        description: 'Layanan kebersihan kamar setiap hari selama masa inap Anda.'
      },
      {
        icon: 'Droplet',
        title: 'Kamar Mandi Air Panas & Dingin',
        description: 'Setiap kamar dilengkapi shower dengan pilihan air panas dan dingin.'
      }
    ];
  }

  return [
    {
      icon: 'Wifi',
      title: 'Free Wi-Fi',
      description: 'Complimentary wireless internet access throughout the hotel.'
    },
    {
      icon: 'Wind',
      title: 'Air Conditioner',
      description: 'In-room air conditioning to keep every stay comfortable.'
    },
    {
      icon: 'UtensilsCrossed',
      title: 'Restaurant & Meeting Room',
      description: 'Batu Emas Resto and a function space available for meetings and small gatherings.'
    },
    {
      icon: 'Clock',
      title: '24 Hours Service',
      description: 'Front desk and guest assistance available around the clock, every day.'
    },
    {
      icon: 'Tv',
      title: 'Television',
      description: 'A television is provided in every guest room.'
    },
    {
      icon: 'Car',
      title: 'Parking',
      description: 'Free on-site parking, conveniently close to Mozes Kilangin Airport.'
    },
    {
      icon: 'Sparkles',
      title: 'Housekeeping',
      description: 'Daily housekeeping service to keep your room fresh and tidy.'
    },
    {
      icon: 'Droplet',
      title: 'Hot & Cold Shower',
      description: 'Every room has an en-suite bathroom with hot and cold water shower.'
    }
  ];
};

export const ROOMS: RoomInfo[] = getRooms('en');
export const HOTEL_AMENITIES = getHotelAmenities('en');
