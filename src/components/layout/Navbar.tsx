
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, ShoppingCart, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="KrishiMitra Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-primary-900">
              <span className="text-primary-700">Krishi</span>
              <span className="text-primary-900">Mitra</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-700 font-medium">Home</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-primary-700 font-medium">Dashboard</Link>
            <Link to="/crop-recommendation" className="text-gray-700 hover:text-primary-700 font-medium">Crop Recommendations</Link>
            <Link to="/disease-detection" className="text-gray-700 hover:text-primary-700 font-medium">Disease Detection</Link>
            <Link to="/marketplace" className="text-gray-700 hover:text-primary-700 font-medium">Marketplace</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="flex items-center gap-2">
                <User size={18} />
                <span>Login</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary-600 hover:bg-primary-700">Register</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary-700 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-primary-700 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/crop-recommendation" 
                className="text-gray-700 hover:text-primary-700 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Crop Recommendations
              </Link>
              <Link 
                to="/disease-detection" 
                className="text-gray-700 hover:text-primary-700 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Disease Detection
              </Link>
              <Link 
                to="/marketplace" 
                className="text-gray-700 hover:text-primary-700 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <div className="flex space-x-4 pt-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User size={18} />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-primary-600 hover:bg-primary-700">Register</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
