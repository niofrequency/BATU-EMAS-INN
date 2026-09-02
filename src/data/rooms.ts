import { RoomInfo } from '../types';

const ROOM_IMAGES = ['/img/room 1.webp', '/img/room 2.webp', '/img/room 3.webp', '/img/bathroom 1.webp', '/img/bathroom 2.webp'];

export const getRooms = (lang: 'en' | 'id'): RoomInfo[] => {
  if (lang === 'id') {
    return [
      {
        id: 'standard',
        name: 'Kamar Batu Emas Inn',
        subtitle: 'Nyaman, Ber-AC, Single atau Double Bed',
        pricePerNight: 350,
        capacity: 2,
        size: '16 m²',
        description: 'Kamar nyaman berukuran 16 m² dengan pilihan tempat tidur single atau double, AC, dan kamar mandi dalam dengan air panas & dingin — cocok untuk pelancong solo, pasangan, maupun teman seperjalanan.',
        image: '/img/room 2.webp',
        images: ROOM_IMAGES,
        amenities: ['Tempat Tidur Single/Double', 'AC', 'Wi-Fi Gratis', 'Televisi', 'Air Panas & Dingin', 'Housekeeping Harian'],
        rating: 4.7,
        featured: true
      }
    ];
  }

  return [
    {
      id: 'standard',
      name: 'Batu Emas Inn Room',
      subtitle: 'Comfortable, Air-Conditioned, Single or Double Bed',
      pricePerNight: 350,
      capacity: 2,
      size: '16 m²',
      description: 'A comfortable 16 m² room with the option of a single or double bed, air conditioning, and an en-suite bathroom with hot & cold shower — ideal for solo travellers, couples, or friends travelling together.',
      image: '/img/room 2.webp',
      images: ROOM_IMAGES,
      amenities: ['Single or Double Bed', 'Air Conditioning', 'Free Wi-Fi', 'Television', 'Hot & Cold Shower', 'Daily Housekeeping'],
      rating: 4.7,
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
