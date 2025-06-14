
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { camps, rooms } from '@/data/camps';
import { useToast } from '@/hooks/use-toast';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const room = rooms.find(r => r.id === id);
  const camp = room ? camps.find(c => c.id === room.campId) : null;
  
  const [bookingInfo, setBookingInfo] = useState({
    account: '',
    name: '',
    phone: '',
    checkIn: '',
    checkOut: ''
  });

  if (!room || !camp) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">房型不存在</h1>
            <Link to="/">
              <Button className="mt-4">返回首頁</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingInfo.account || !bookingInfo.name || !bookingInfo.phone || !bookingInfo.checkIn || !bookingInfo.checkOut) {
      toast({
        title: "請填寫完整資訊",
        description: "所有欄位都是必填的",
        variant: "destructive",
      });
      return;
    }

    // Calculate days and total price
    const checkIn = new Date(bookingInfo.checkIn);
    const checkOut = new Date(bookingInfo.checkOut);
    const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) {
      toast({
        title: "日期錯誤",
        description: "退房日期必須晚於入住日期",
        variant: "destructive",
      });
      return;
    }

    const totalPrice = room.price * days;
    
    // Navigate to booking page with booking info
    navigate('/booking', {
      state: {
        ...bookingInfo,
        campName: camp.name,
        roomName: room.name,
        totalPrice,
        days
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to={`/camp/${camp.id}`}>
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回營地
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Room Info */}
          <div>
            <Card>
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl">{room.name}</CardTitle>
                <div className="text-gray-600">
                  {camp.name} • {camp.location}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">房型：</span>
                    <span className="font-semibold">{room.type}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg">可住人數：</span>
                    <span className="font-semibold">{room.capacity} 人</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg">價格：</span>
                    <span className="text-2xl font-bold text-green-600">
                      NT$ {room.price} / 晚
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">房間設施</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>預訂資訊</CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="account">帳號</Label>
                    <Input
                      id="account"
                      type="text"
                      value={bookingInfo.account}
                      onChange={(e) => setBookingInfo(prev => ({ ...prev, account: e.target.value }))}
                      placeholder="請輸入帳號"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      type="text"
                      value={bookingInfo.name}
                      onChange={(e) => setBookingInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="請輸入姓名"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">電話</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingInfo.phone}
                      onChange={(e) => setBookingInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="請輸入電話"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="checkIn">入住日期</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={bookingInfo.checkIn}
                      onChange={(e) => setBookingInfo(prev => ({ ...prev, checkIn: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="checkOut">退房日期</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={bookingInfo.checkOut}
                      onChange={(e) => setBookingInfo(prev => ({ ...prev, checkOut: e.target.value }))}
                      min={bookingInfo.checkIn || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    確認預訂
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
