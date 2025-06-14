import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { addUserBooking } from '@/data/bookings';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const bookingData = location.state;
  
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'card' | 'cash'>('transfer');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">預訂資訊不存在</h1>
            <Link to="/">
              <Button className="mt-4">返回首頁</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    if ((paymentMethod === 'transfer' || paymentMethod === 'card') && !paymentDetails) {
      toast({
        title: "請填寫付款資訊",
        description: paymentMethod === 'transfer' ? "請輸入轉帳帳號" : "請輸入卡號",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "請先登入",
        description: "請先登入才能完成訂單",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        // 儲存訂單資訊到使用者的訂單清單
        addUserBooking(user.id, {
          account: bookingData.account,
          name: bookingData.name,
          phone: bookingData.phone,
          campName: bookingData.campName,
          roomName: bookingData.roomName,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          totalPrice: bookingData.totalPrice
        });

        setBookingComplete(true);
        toast({
          title: "付款成功",
          description: "您的預訂已確認！",
        });
      } else {
        toast({
          title: "付款失敗",
          description: "請檢查您的付款資訊並重試",
          variant: "destructive",
        });
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl text-green-600">預訂成功！</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-6xl">✅</div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">預訂詳情</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
                  <div className="flex justify-between">
                    <span>營地：</span>
                    <span className="font-semibold">{bookingData.campName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>房型：</span>
                    <span className="font-semibold">{bookingData.roomName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>入住：</span>
                    <span>{bookingData.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>退房：</span>
                    <span>{bookingData.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>天數：</span>
                    <span>{bookingData.days} 晚</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">總金額：</span>
                    <span className="font-bold text-green-600">NT$ {bookingData.totalPrice}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg text-left space-y-2">
                  <h4 className="font-semibold text-blue-800">聯絡資訊</h4>
                  <div>姓名：{bookingData.name}</div>
                  <div>電話：{bookingData.phone}</div>
                  <div>帳號：{bookingData.account}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link to="/">
                  <Button className="w-full">返回首頁</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回上一頁
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>預訂摘要</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span>營地：</span>
                    <span className="font-semibold">{bookingData.campName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>房型：</span>
                    <span className="font-semibold">{bookingData.roomName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>入住日期：</span>
                    <span>{bookingData.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>退房日期：</span>
                    <span>{bookingData.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>住宿天數：</span>
                    <span>{bookingData.days} 晚</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-lg font-semibold">總金額：</span>
                    <span className="text-xl font-bold text-green-600">
                      NT$ {bookingData.totalPrice}
                    </span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-blue-800">聯絡資訊</h4>
                  <div>帳號：{bookingData.account}</div>
                  <div>姓名：{bookingData.name}</div>
                  <div>電話：{bookingData.phone}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>付款方式</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer">銀行轉帳</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">信用卡</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">現金付款</Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === 'transfer' && (
                  <div>
                    <Label htmlFor="transferAccount">轉帳帳號</Label>
                    <Input
                      id="transferAccount"
                      type="text"
                      value={paymentDetails}
                      onChange={(e) => setPaymentDetails(e.target.value)}
                      placeholder="請輸入您的銀行帳號"
                    />
                    <div className="text-sm text-gray-600 mt-2">
                      轉帳至：華南銀行 123-456-789-012 (露營訂位網)
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'card' && (
                  <div>
                    <Label htmlFor="cardNumber">信用卡號</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      value={paymentDetails}
                      onChange={(e) => setPaymentDetails(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                )}
                
                {paymentMethod === 'cash' && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-yellow-800">
                      <strong>現金付款說明：</strong>
                      <br />
                      請於入住當日攜帶現金至營地櫃台付款
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={handlePayment} 
                  className="w-full" 
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? '處理中...' : '確認付款'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
