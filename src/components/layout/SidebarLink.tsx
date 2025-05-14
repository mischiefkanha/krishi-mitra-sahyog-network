
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsAdmin } from '@/utils/setupAdminRole';

interface SidebarLinkProps {
  link: {
    href: string;
    label: string;
    icon: React.ReactNode;
    adminOnly?: boolean;
  };
  active?: boolean;
}

const SidebarLink = ({ link, active }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = active || location.pathname === link.href;
  const isAdmin = useIsAdmin();
  
  // Don't render admin-only links for non-admin users
  if (link.adminOnly && !isAdmin) {
    return null;
  }

  return (
    <a
      href={link.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
        isActive
          ? 'bg-primary text-primary-foreground hover:text-primary-foreground'
          : 'text-gray-500 dark:text-gray-400'
      )}
    >
      {link.icon}
      <span>{link.label}</span>
    </a>
  );
};

export default SidebarLink;
