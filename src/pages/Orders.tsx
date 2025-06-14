
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getUserBookings } from '@/data/bookings';
import { useAuth } from '@/hooks/useAuth';

const Orders = () => {
  const { user } = useAuth();
  const userOrders = user ? getUserBookings(user.id) : [];

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">我的訂單</h1>
          <p className="text-gray-600">
            您有 {userOrders.length} 筆訂單
          </p>
        </div>

        {userOrders.length > 0 ? (
          <div className="space-y-6">
            {userOrders.map((booking, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    {booking.campName} - {booking.roomName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>訂位人：</strong>{booking.name}</p>
                      <p><strong>帳號：</strong>{booking.account}</p>
                      <p><strong>電話：</strong>{booking.phone}</p>
                    </div>
                    <div>
                      <p><strong>入住日期：</strong>{booking.checkIn}</p>
                      <p><strong>退房日期：</strong>{booking.checkOut}</p>
                      <p><strong>總金額：</strong>NT$ {booking.totalPrice}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">
              您還沒有任何訂單
            </div>
            <Link to="/">
              <Button>開始探索營地</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
