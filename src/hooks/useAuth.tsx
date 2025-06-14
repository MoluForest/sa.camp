
import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/data/users';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, confirmPassword: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const register = async (username: string, password: string, confirmPassword: string): Promise<boolean> => {
    if (password !== confirmPassword) {
      throw new Error('密碼確認不一致');
    }
    
    const existingUser = mockUsers.find(u => u.username === username);
    if (existingUser) {
      throw new Error('帳號已存在');
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email: `${username}@example.com`,
      password
    };
    mockUsers.push(newUser);
    
    return true;
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    
    if (!foundUser) {
      throw new Error('帳號或密碼錯誤');
    }

    setUser({
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
