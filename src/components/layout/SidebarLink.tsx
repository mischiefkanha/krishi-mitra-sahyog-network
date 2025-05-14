
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsAdmin } from '@/utils/setupAdminRole';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  adminOnly?: boolean;
}

const SidebarLink = ({ to, icon, children, className, adminOnly }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const isAdmin = useIsAdmin();
  
  // Don't render admin-only links for non-admin users
  if (adminOnly && !isAdmin) {
    return null;
  }

  return (
    <a
      href={to}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
        isActive
          ? 'bg-primary text-primary-foreground hover:text-primary-foreground'
          : 'text-gray-500 dark:text-gray-400',
        className
      )}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
};

export default SidebarLink;
