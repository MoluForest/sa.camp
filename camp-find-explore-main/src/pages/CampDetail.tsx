
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { camps, rooms } from '@/data/camps';
import { useFavorites } from '@/hooks/useFavorites';

const CampDetail = () => {
  const { id } = useParams();
  const camp = camps.find(c => c.id === id);
  const campRooms = rooms.filter(r => r.campId === id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!camp) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">營地不存在</h1>
          <Link to="/">
            <Button className="mt-4">返回首頁</Button>
          </Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(camp.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回列表
            </Button>
          </Link>
        </div>

        {/* Camp Info */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img
              src={camp.image}
              alt={camp.name}
              className="w-full h-96 object-cover"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              onClick={() => toggleFavorite(camp)}
            >
              <Heart 
                className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </Button>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{camp.name}</h1>
                <p className="text-gray-600 text-lg">{camp.location}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">NT$ {camp.price}</div>
                <div className="text-gray-500">起/晚</div>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="ml-1 text-lg">{camp.rating}</span>
              <span className="text-gray-500 ml-2">(評分)</span>
            </div>
            
            <p className="text-gray-700 text-lg mb-6">{camp.description}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">設施與服務</h3>
              <div className="flex flex-wrap gap-2">
                {camp.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Available Rooms */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">可訂房型</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campRooms.map((room) => (
              <Card key={room.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {!room.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                      <span className="text-white font-semibold">已滿房</span>
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{room.name}</span>
                    <span className="text-green-600">NT$ {room.price}</span>
                  </CardTitle>
                  <div className="text-sm text-gray-600">
                    {room.type} • 可住 {room.capacity} 人
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link to={`/room/${room.id}`}>
                    <Button 
                      className="w-full" 
                      disabled={!room.available}
                    >
                      {room.available ? '立即預訂' : '已滿房'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {campRooms.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg">
                目前沒有可預訂的房型
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampDetail;
