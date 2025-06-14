
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(username, password, confirmPassword);
      toast({
        title: "註冊成功",
        description: "請前往登入頁面登入",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "註冊失敗",
        description: error instanceof Error ? error.message : "註冊過程中發生錯誤",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-600">註冊帳號</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">帳號</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="請輸入帳號"
              />
            </div>
            
            <div>
              <Label htmlFor="password">密碼</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="請輸入密碼"
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">確認密碼</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="請再次輸入密碼"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '註冊中...' : '註冊'}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            已有帳號？
            <Link to="/login" className="text-green-600 hover:underline ml-1">
              立即登入
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
