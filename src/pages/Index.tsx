
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Navigation from '@/components/Navigation';
import CampCard from '@/components/CampCard';
import { camps } from '@/data/camps';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCamps = camps.filter(camp => 
    camp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    camp.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            探索最美的露營體驗
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            在大自然中找到您的完美假期
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="搜尋營地名稱或地點..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Camps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {searchQuery ? '搜尋結果' : '推薦營地'}
          </h2>
          <p className="text-gray-600 text-lg">
            {searchQuery ? `找到 ${filteredCamps.length} 個符合條件的營地` : '精選優質露營地點，給您最棒的戶外體驗'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCamps.map((camp) => (
            <CampCard key={camp.id} camp={camp} />
          ))}
        </div>
        
        {filteredCamps.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg">
              沒有找到符合條件的營地，請試試其他關鍵字
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
