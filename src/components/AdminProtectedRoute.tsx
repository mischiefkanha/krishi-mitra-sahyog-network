
import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const adminSession = localStorage.getItem('adminSession');
      if (adminSession) {
        try {
          const session = JSON.parse(adminSession);
          // Check if session is still valid (less than 24 hours old)
          const loginTime = new Date(session.loginTime);
          const now = new Date();
          const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
          
          if (hoursDiff < 24) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('adminSession');
            setIsAuthenticated(false);
          }
        } catch (error) {
          localStorage.removeItem('adminSession');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-gray-600">Verifying admin credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
