
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import CampCard from '@/components/CampCard';
import { useFavorites } from '@/hooks/useFavorites';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首頁
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">我的收藏</h1>
          <p className="text-gray-600">
            您收藏了 {favorites.length} 個營地
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((camp) => (
              <CampCard key={camp.id} camp={camp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">
              您還沒有收藏任何營地
            </div>
            <Link to="/">
              <Button>探索營地</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
