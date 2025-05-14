
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading, profile } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-gray-600">Verifying admin credentials...</p>
      </div>
    );
  }
  
  // Check if user is authenticated and has admin role
  if (!user || profile?.role !== 'admin') {
    return (
      <Navigate 
        to="/dashboard" 
        state={{ 
          from: location.pathname, 
          message: "Admin access required. Please contact the system administrator." 
        }} 
        replace 
      />
    );
  }
  
  return <>{children}</>;
};

export default AdminRoute;
