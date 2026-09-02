export interface MenuItem {
  name: string;
  note?: string;
  price: number;
}

export interface RestaurantMenu {
  hoursNote: string;
  roomServiceNote: string;
  food: MenuItem[];
  drinks: MenuItem[];
}

export const getRestaurantMenu = (lang: 'en' | 'id'): RestaurantMenu => {
  if (lang === 'id') {
    return {
      hoursNote: 'Buka setiap hari, 09.00 - 20.00 WIT',
      roomServiceNote: 'Room service: pesan mulai 10.00, order terakhir 20.00 WIT',
      food: [
        { name: 'Nasi Goreng', price: 35000 },
        { name: 'Mie Goreng', price: 35000 },
        { name: 'Kwetiaw', price: 35000 },
        { name: 'Lalapan Ayam Biasa', price: 45000 },
        { name: 'Lalapan Ayam Kampung', price: 60000 },
        { name: 'Satai Ayam', price: 37000 },
        { name: 'Satai Sapi', price: 50000 },
        { name: 'Mie Ayam', price: 25000 },
        { name: 'Bakso', price: 25000 },
        { name: 'Lumpia', note: 'per pcs', price: 20000 },
        { name: 'Lumpia', note: '5 pcs', price: 100000 }
      ],
      drinks: [
        { name: 'Jeruk Hangat', price: 12000 },
        { name: 'Teh Hangat', price: 10000 },
        { name: 'Es Jeruk', price: 12000 },
        { name: 'Es Teh', price: 10000 }
      ]
    };
  }

  return {
    hoursNote: 'Open daily, 09:00 - 20:00 WIT',
    roomServiceNote: 'Room service: orders open 10:00, last order 20:00 WIT',
    food: [
      { name: 'Nasi Goreng', note: 'Fried Rice', price: 35000 },
      { name: 'Mie Goreng', note: 'Fried Noodles', price: 35000 },
      { name: 'Kwetiaw', note: 'Stir-Fried Flat Rice Noodles', price: 35000 },
      { name: 'Lalapan Ayam Biasa', note: 'Fried Chicken & Fresh Vegetables', price: 45000 },
      { name: 'Lalapan Ayam Kampung', note: 'Free-Range Fried Chicken & Fresh Vegetables', price: 60000 },
      { name: 'Satai Ayam', note: 'Chicken Satay', price: 37000 },
      { name: 'Satai Sapi', note: 'Beef Satay', price: 50000 },
      { name: 'Mie Ayam', note: 'Chicken Noodles', price: 25000 },
      { name: 'Bakso', note: 'Meatball Soup', price: 25000 },
      { name: 'Lumpia', note: 'Spring Roll, per pcs', price: 20000 },
      { name: 'Lumpia', note: 'Spring Roll, 5 pcs', price: 100000 }
    ],
    drinks: [
      { name: 'Jeruk Hangat', note: 'Warm Orange Juice', price: 12000 },
      { name: 'Teh Hangat', note: 'Warm Tea', price: 10000 },
      { name: 'Es Jeruk', note: 'Iced Orange Juice', price: 12000 },
      { name: 'Es Teh', note: 'Iced Tea', price: 10000 }
    ]
  };
};

export interface MeetingPackage {
  label: string;
  price: number;
  remarks: string;
}

export interface MeetingRoomRates {
  capacity: MeetingPackage[];
  addOns: MeetingPackage[];
}

export const getMeetingRoomRates = (lang: 'en' | 'id'): MeetingRoomRates => {
  if (lang === 'id') {
    return {
      capacity: [
        { label: '10 Pax', price: 500000, remarks: 'Untuk 8 Jam' },
        { label: '25 Pax', price: 1000000, remarks: 'Untuk 8 Jam' }
      ],
      addOns: [
        { label: 'Coffee Break', price: 25000, remarks: '1x Coffee Break' },
        { label: 'Makan Siang/Malam', price: 55000, remarks: '1x Makan' },
        { label: 'Paket Half Day', price: 100000, remarks: '1x Coffee Break + 1x Makan' },
        { label: 'Paket Full Day', price: 150000, remarks: '2x Coffee Break + 1x Makan' }
      ]
    };
  }

  return {
    capacity: [
      { label: '10 Pax', price: 500000, remarks: 'For 8 Hours' },
      { label: '25 Pax', price: 1000000, remarks: 'For 8 Hours' }
    ],
    addOns: [
      { label: 'Coffee Break', price: 25000, remarks: '1x Coffee Break' },
      { label: 'Lunch/Dinner', price: 55000, remarks: '1x Meal' },
      { label: 'Half Day Package', price: 100000, remarks: '1x Coffee Break + 1x Meal' },
      { label: 'Full Day Package', price: 150000, remarks: '2x Coffee Break + 1x Meal' }
    ]
  };
};
