
import { User } from '@/types';

export interface UserWithPassword extends User {
  password: string;
}

export const mockUsers: UserWithPassword[] = [
  { 
    id: '1', 
    username: 'testuser', 
    email: 'test@example.com', 
    password: 'password123' 
  }
];
