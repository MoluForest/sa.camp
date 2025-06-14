
import { BookingInfo } from '@/types';

// 用於存儲每個使用者的訂單資料
export const userBookings: { [userId: string]: BookingInfo[] } = {
  '1': [
    {
      account: 'testuser',
      name: '王小明',
      phone: '0912345678',
      campName: '山景露營區',
      roomName: '山景豪華帳',
      checkIn: '2024-06-15',
      checkOut: '2024-06-17',
      totalPrice: 2400
    }
  ]
};

export const getUserBookings = (userId: string): BookingInfo[] => {
  return userBookings[userId] || [];
};

export const addUserBooking = (userId: string, booking: BookingInfo) => {
  if (!userBookings[userId]) {
    userBookings[userId] = [];
  }
  userBookings[userId].push(booking);
};
