
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  Sprout, 
  Bug, 
  CloudSun, 
  CalendarDays,
  TrendingUp,
  MessageSquare,
  Mic,
  Video, 
  Award,
  Users,
  Newspaper,
  Star,
  Settings,
  User,
  Gift,
  ShoppingBag,
  Moon, 
  Sun, 
  Languages, 
  LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Sidebar = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Navigation items - updated with all requested items
  const navItems = [
    { icon: Home, label: t('home'), path: '/', requiresAuth: false },
    { icon: LayoutDashboard, label: t('dashboard'), path: '/dashboard', requiresAuth: true },
    { icon: Sprout, label: t('cropRecommendation'), path: '/crop-recommendation', requiresAuth: true },
    { icon: Bug, label: t('diseaseDetection'), path: '/disease-detection', requiresAuth: true },
    { icon: CloudSun, label: language === 'en' ? 'Weather Alerts' : 'हवामान सूचना', path: '/weather-alerts', requiresAuth: true },
    { icon: CalendarDays, label: language === 'en' ? 'Crop Calendar' : 'पीक दिनदर्शिका', path: '/crop-calendar', requiresAuth: true },
    { icon: TrendingUp, label: language === 'en' ? 'Market Rates' : 'बाजार दर', path: '/market-rates', requiresAuth: true },
    { icon: MessageSquare, label: language === 'en' ? 'Ask an Expert' : 'तज्ञांना विचारा', path: '/ask-expert', requiresAuth: true },
    { icon: Mic, label: language === 'en' ? 'Voice Assistant' : 'आवाज सहाय्यक', path: '/voice-assistant', requiresAuth: true },
    { icon: Video, label: t('tutorials'), path: '/tutorials', requiresAuth: true },
    { icon: Award, label: language === 'en' ? 'Success Stories' : 'यशोगाथा', path: '/success-stories', requiresAuth: true },
    { icon: Users, label: language === 'en' ? 'Community Forum' : 'समुदाय मंच', path: '/forum', requiresAuth: true },
    { icon: Newspaper, label: language === 'en' ? 'Govt Schemes & News' : 'सरकारी योजना और समाचार', path: '/news', requiresAuth: true },
    { icon: ShoppingBag, label: t('marketplace'), path: '/marketplace', requiresAuth: true },
    { icon: Star, label: t('feedback'), path: '/feedback', requiresAuth: true },
    { icon: Gift, label: language === 'en' ? 'Refer & Earn' : 'संदर्भित करें और कमाएं', path: '/refer', requiresAuth: true },
    { icon: User, label: t('profile'), path: '/profile', requiresAuth: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-background border border-border"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? (
          <span className="block w-6 h-0.5 bg-foreground">×</span>
        ) : (
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-foreground"></span>
            <span className="block w-6 h-0.5 bg-foreground"></span>
            <span className="block w-6 h-0.5 bg-foreground"></span>
          </div>
        )}
      </button>

      {/* Logo fixed at the top for mobile */}
      <div className="md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="KrishiMitra Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">
            <span className="text-primary-700">Krishi</span>
            <span className="text-primary-900 dark:text-white">Mitra</span>
          </span>
        </Link>
      </div>

      {/* Desktop Sidebar */}
      <div 
        className={`hidden md:flex flex-col h-screen ${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-900 border-r border-border fixed left-0 top-0 transition-all duration-300 z-40`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-border">
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="KrishiMitra Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">
                <span className="text-primary-700">Krishi</span>
                <span className="text-primary-900 dark:text-white">Mitra</span>
              </span>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/" className="mx-auto">
              <img src="/logo.svg" alt="KrishiMitra Logo" className="h-8 w-8" />
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              {isCollapsed ? (
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Navigation Links - Main section */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.slice(0, 9).map((item) => (
              (!item.requiresAuth || (item.requiresAuth && user)) && (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon 
                      className={`h-5 w-5 ${isActive(item.path) ? 'text-primary-700 dark:text-primary-400' : ''}`} 
                      aria-hidden="true" 
                    />
                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
                  </Link>
                </li>
              )
            ))}
          </ul>

          {/* Secondary Navigation Section */}
          {!isCollapsed && (
            <div className="pt-4 px-3">
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {language === 'en' ? 'Resources & Community' : 'संसाधने आणि समुदाय'}
              </h3>
            </div>
          )}
          <ul className="space-y-1 px-2 mt-2">
            {navItems.slice(9, 14).map((item) => (
              (!item.requiresAuth || (item.requiresAuth && user)) && (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon 
                      className={`h-5 w-5 ${isActive(item.path) ? 'text-primary-700 dark:text-primary-400' : ''}`} 
                      aria-hidden="true" 
                    />
                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
                  </Link>
                </li>
              )
            ))}
          </ul>

          {/* User Settings Section */}
          {!isCollapsed && (
            <div className="pt-4 px-3">
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {language === 'en' ? 'User' : 'वापरकर्ता'}
              </h3>
            </div>
          )}
          <ul className="space-y-1 px-2 mt-2">
            {navItems.slice(14).map((item) => (
              (!item.requiresAuth || (item.requiresAuth && user)) && (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon 
                      className={`h-5 w-5 ${isActive(item.path) ? 'text-primary-700 dark:text-primary-400' : ''}`} 
                      aria-hidden="true" 
                    />
                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
                  </Link>
                </li>
              )
            ))}
            {/* Settings directly in the sidebar for quick access */}
            {user && !isCollapsed && (
              <li>
                <Link
                  to="/settings"
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    isActive('/settings')
                      ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Settings 
                    className={`h-5 w-5 ${isActive('/settings') ? 'text-primary-700 dark:text-primary-400' : ''}`} 
                    aria-hidden="true" 
                  />
                  <span className="ml-3">{language === 'en' ? 'Settings' : 'सेटिंग्ज'}</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
        
        {/* Sidebar Footer with Theme Toggle & Language Switch */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            {!isCollapsed && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            )}
            <div className="flex items-center space-x-2">
              <Sun className={`h-4 w-4 ${theme === 'light' ? 'text-yellow-500' : 'text-gray-400'}`} />
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={toggleTheme}
                aria-label="Toggle theme"
              />
              <Moon className={`h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`} />
            </div>
          </div>
          
          {!isCollapsed && (
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Language</span>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setLanguage('en')} 
                  className={`px-2 py-1 text-xs ${language === 'en' ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400' : ''}`}>
                  English
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setLanguage('mr')} 
                  className={`px-2 py-1 text-xs ${language === 'mr' ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400' : ''}`}>
                  मराठी
                </Button>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="flex flex-col items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
                className="h-8 w-8"
                aria-label="Toggle language"
              >
                <Languages className="h-5 w-5" />
              </Button>
            </div>
          )}
          
          {/* Sign Out Button */}
          {user && (
            <Button 
              variant="outline" 
              className={`w-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center gap-2 ${isCollapsed ? 'px-2' : ''}`}
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && t('signOut')}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Sidebar (Slide-in) */}
      <div className={`md:hidden fixed inset-0 z-30 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300">
          <div className="p-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="KrishiMitra Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">
                <span className="text-primary-700">Krishi</span>
                <span className="text-primary-900 dark:text-white">Mitra</span>
              </span>
            </Link>
          </div>
          
          <nav className="overflow-y-auto h-[calc(100%-160px)]">
            {/* Main navigation */}
            <div className="pt-2">
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Main Menu' : 'मुख्य मेनू'}
                </h3>
              </div>
              <ul className="space-y-1 px-2">
                {navItems.slice(0, 9).map((item) => (
                  (!item.requiresAuth || (item.requiresAuth && user)) && (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center p-2 rounded-md transition-colors ${
                          isActive(item.path)
                            ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon 
                          className={`h-5 w-5 ${isActive(item.path) ? 'text-primary-700 dark:text-primary-400' : ''}`} 
                        />
                        <span className="ml-3">{item.label}</span>
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </div>

            {/* Resources & Community */}
            <div className="pt-4">
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Resources & Community' : 'संसाधने आणि समुदाय'}
                </h3>
              </div>
              <ul className="space-y-1 px-2">
                {navItems.slice(9, 14).map((item) => (
                  (!item.requiresAuth || (item.requiresAuth && user)) && (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center p-2 rounded-md transition-colors ${
                          isActive(item.path)
                            ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon 
                          className={`h-5 w-5 ${isActive(item.path) ? 'text-primary-700 dark:text-primary-400' : ''}`} 
                        />
                        <span className="ml-3">{item.label}</span>
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </div>

            {/* User Section */}
            <div className="pt-4">
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'User' : 'वापरकर्ता'}
                </h3>
              </div>
              <ul className="space-y-1 px-2">
                {navItems.slice(14).map((item) => (
                  (!item.requiresAuth || (item.requiresAuth && user)) && (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center p-2 rounded-md transition-colors ${
                          isActive(item.path)
                            ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon 
                          className={`h-5 w-5 ${isActive(item.path) ? 'text-primary-700 dark:text-primary-400' : ''}`} 
                        />
                        <span className="ml-3">{item.label}</span>
                      </Link>
                    </li>
                  )
                ))}
                {/* Settings directly in the sidebar for quick access */}
                {user && (
                  <li>
                    <Link
                      to="/settings"
                      className={`flex items-center p-2 rounded-md transition-colors ${
                        isActive('/settings')
                          ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings 
                        className={`h-5 w-5 ${isActive('/settings') ? 'text-primary-700 dark:text-primary-400' : ''}`} 
                      />
                      <span className="ml-3">{language === 'en' ? 'Settings' : 'सेटिंग्ज'}</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
              <div className="flex items-center space-x-2">
                <Sun className={`h-4 w-4 ${theme === 'light' ? 'text-yellow-500' : 'text-gray-400'}`} />
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={toggleTheme}
                  aria-label="Toggle theme"
                />
                <Moon className={`h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`} />
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Language</span>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setLanguage('en')} 
                  className={`px-2 py-1 text-xs ${language === 'en' ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400' : ''}`}>
                  English
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setLanguage('mr')} 
                  className={`px-2 py-1 text-xs ${language === 'mr' ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400' : ''}`}>
                  मराठी
                </Button>
              </div>
            </div>
            
            {user && (
              <Button 
                variant="outline" 
                className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center gap-2"
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                {t('signOut')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
