
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIChatAssistant from '../AIChatAssistant';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {user && <AIChatAssistant />}
    </div>
  );
};

export default Layout;
