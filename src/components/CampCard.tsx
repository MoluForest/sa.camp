
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Camp } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';

interface CampCardProps {
  camp: Camp;
}

const CampCard = ({ camp }: CampCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(camp.id);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={camp.image}
          alt={camp.name}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => toggleFavorite(camp)}
        >
          <Heart 
            className={`w-4 h-4 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </Button>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{camp.name}</h3>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">NT$ {camp.price}</div>
            <div className="text-sm text-gray-500">起</div>
          </div>
        </div>
        <div className="text-sm text-gray-600">{camp.location}</div>
        <div className="flex items-center">
          <span className="text-yellow-400">★</span>
          <span className="text-sm ml-1">{camp.rating}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 text-sm mb-4">{camp.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {camp.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
          {camp.amenities.length > 3 && (
            <span className="text-xs text-gray-500">+{camp.amenities.length - 3}項</span>
          )}
        </div>
        
        <Link to={`/camp/${camp.id}`}>
          <Button className="w-full">查看詳情</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CampCard;
