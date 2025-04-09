
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className={`bg-white dark:bg-gray-900 shadow-inner py-6 border-t border-border ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="KrishiMitra Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">
                <span className="text-primary-700">Krishi</span>
                <span className="text-primary-900 dark:text-white">Mitra</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Empowering farmers with technology for better farming decisions and improved yields.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-700 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-700 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-700 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-700 transition-colors duration-200">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-200">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-200">
                  {t('dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/crop-recommendation" className="text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-200">
                  {t('cropRecommendation')}
                </Link>
              </li>
              <li>
                <Link to="/disease-detection" className="text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-200">
                  {t('diseaseDetection')}
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-200">
                  {t('marketplace')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact</h3>
            <address className="not-italic text-gray-600 dark:text-gray-400 space-y-2">
              <p>123 Agriculture Road</p>
              <p>Pune, Maharashtra, India</p>
              <p>Email: info@krishimitra.com</p>
              <p>Phone: +91 1234567890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            &copy; {year} KrishiMitra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
