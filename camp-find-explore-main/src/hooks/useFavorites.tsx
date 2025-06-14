
import { createContext, useContext, useState, ReactNode } from 'react';
import { Camp } from '@/types';
import { useAuth } from '@/hooks/useAuth';

interface FavoritesContextType {
  favorites: Camp[];
  addToFavorites: (camp: Camp) => void;
  removeFromFavorites: (campId: string) => void;
  isFavorite: (campId: string) => boolean;
  toggleFavorite: (camp: Camp) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// 用於存儲每個使用者的收藏資料
const userFavorites: { [userId: string]: Camp[] } = {};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Camp[]>([]);

  // 當使用者登入時，載入該使用者的收藏資料
  const getUserFavorites = () => {
    if (!user) return [];
    if (!userFavorites[user.id]) {
      userFavorites[user.id] = [];
    }
    return userFavorites[user.id];
  };

  // 更新使用者的收藏資料
  const updateUserFavorites = (newFavorites: Camp[]) => {
    if (!user) return;
    userFavorites[user.id] = newFavorites;
    setFavorites(newFavorites);
  };

  const addToFavorites = (camp: Camp) => {
    if (!user) return;
    const currentFavorites = getUserFavorites();
    const newFavorites = [...currentFavorites, camp];
    updateUserFavorites(newFavorites);
  };

  const removeFromFavorites = (campId: string) => {
    if (!user) return;
    const currentFavorites = getUserFavorites();
    const newFavorites = currentFavorites.filter(camp => camp.id !== campId);
    updateUserFavorites(newFavorites);
  };

  const isFavorite = (campId: string) => {
    if (!user) return false;
    const currentFavorites = getUserFavorites();
    return currentFavorites.some(camp => camp.id === campId);
  };

  const toggleFavorite = (camp: Camp) => {
    if (isFavorite(camp.id)) {
      removeFromFavorites(camp.id);
    } else {
      addToFavorites(camp);
    }
  };

  // 當使用者改變時，更新收藏清單
  const currentFavorites = user ? getUserFavorites() : [];

  return (
    <FavoritesContext.Provider value={{
      favorites: currentFavorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
