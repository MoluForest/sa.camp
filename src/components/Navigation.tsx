
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Navigation = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-green-600">
            露營訂位網
          </Link>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <span className="text-sm text-gray-600">
                歡迎，{user?.username}
              </span>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">登入</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">註冊</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
