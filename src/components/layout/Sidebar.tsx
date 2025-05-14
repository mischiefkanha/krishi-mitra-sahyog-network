
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  User, 
  Calendar, 
  MessageSquare, 
  Tractor, 
  BarChart, 
  Leaf, 
  Info, 
  Settings,
  Users,
  Shield
} from 'lucide-react';
import SidebarLink from './SidebarLink';
import { useAuth } from '@/context/AuthContext';
import { useIsAdmin } from '@/utils/setupAdminRole';
import { cn } from '@/lib/utils';

const Sidebar = ({ className }: { className?: string }) => {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  
  return (
    <div className={cn("min-h-screen w-64 bg-sidebar text-sidebar-foreground border-r py-6 flex flex-col", className)}>
      <div className="px-6 mb-6 flex items-center">
        <img src="/logo.svg" alt="KrishiMitra" className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-bold">KrishiMitra</h1>
      </div>
      
      <div className="flex-1 px-3">
        <div className="mb-2">
          <p className="px-4 text-xs font-semibold text-sidebar-foreground/60 uppercase mb-2">Dashboard</p>
          <SidebarLink to="/dashboard" icon={<Home />}>Dashboard</SidebarLink>
          <SidebarLink to="/profile" icon={<User />}>Profile</SidebarLink>
        </div>
        
        <div className="mb-2">
          <p className="px-4 text-xs font-semibold text-sidebar-foreground/60 uppercase mb-2">Tools</p>
          <SidebarLink to="/crop-recommendation" icon={<Tractor />}>Crop Recommendation</SidebarLink>
          <SidebarLink to="/disease-detection" icon={<Leaf />}>Disease Detection</SidebarLink>
          <SidebarLink to="/voice-assistant" icon={<MessageSquare />}>Voice Assistant</SidebarLink>
          <SidebarLink to="/crop-calendar" icon={<Calendar />}>Crop Calendar</SidebarLink>
          <SidebarLink to="/market-rates" icon={<BarChart />}>Market Rates</SidebarLink>
        </div>
        
        <div className="mb-2">
          <p className="px-4 text-xs font-semibold text-sidebar-foreground/60 uppercase mb-2">Community</p>
          <SidebarLink to="/forum" icon={<MessageSquare />}>Forum</SidebarLink>
          <SidebarLink to="/ask-expert" icon={<Info />}>Ask Expert</SidebarLink>
          <SidebarLink to="/news" icon={<Info />}>News</SidebarLink>
          <SidebarLink to="/success-stories" icon={<Info />}>Success Stories</SidebarLink>
          <SidebarLink to="/tutorials" icon={<Info />}>Tutorials</SidebarLink>
        </div>
        
        {isAdmin && (
          <div className="mb-2">
            <p className="px-4 text-xs font-semibold text-sidebar-foreground/60 uppercase mb-2">Administration</p>
            <SidebarLink to="/admin" icon={<Shield />} className="text-primary">
              Admin Dashboard
            </SidebarLink>
            <SidebarLink to="/admin/users" icon={<Users />}>
              User Management
            </SidebarLink>
          </div>
        )}
        
        <div>
          <p className="px-4 text-xs font-semibold text-sidebar-foreground/60 uppercase mb-2">Settings</p>
          <SidebarLink to="/settings" icon={<Settings />}>Settings</SidebarLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
