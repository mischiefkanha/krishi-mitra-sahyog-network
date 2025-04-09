
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AIChatAssistant from '../AIChatAssistant';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="md:ml-64 flex-grow pt-16 md:pt-0 transition-all duration-300">
        {children}
      </main>
      <Footer className="md:ml-64 transition-all duration-300" />
      {user && <AIChatAssistant />}
    </div>
  );
};

export default Layout;
