
export interface Camp {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  image: string;
  amenities: string[];
  rating: number;
  isFavorite?: boolean;
}

export interface Room {
  id: string;
  campId: string;
  name: string;
  type: string;
  capacity: number;
  price: number;
  amenities: string[];
  available: boolean;
  image: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface BookingInfo {
  account: string;
  name: string;
  phone: string;
  campName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}

export interface PaymentMethod {
  type: 'transfer' | 'card' | 'cash';
  details?: string;
}
