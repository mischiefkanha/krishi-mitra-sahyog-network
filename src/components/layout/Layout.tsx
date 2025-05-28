
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AIChatAssistant from '../AIChatAssistant';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen bg-background text-foreground ${theme === 'dark' ? 'dark' : ''}`}>
      <Sidebar />
      <main className="md:ml-64 flex-grow px-4 md:px-6 lg:px-8 transition-all duration-300">
        {children}
      </main>
      <Footer className="md:ml-64 transition-all duration-300" />
      {user && <AIChatAssistant />}
    </div>
  );
};

export default Layout;
