
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, User, LayoutDashboard, 
  LogOut, Sun, Moon, Settings,
  LogIn, Globe, Newspaper, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'mr' : 'en');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="KrishiMitra Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold dark:text-white">
              <span className="text-primary-700 dark:text-primary-400">Krishi</span>
              <span className="text-primary-900 dark:text-primary-200">Mitra</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium transition-colors ${location.pathname === '/' ? 'text-primary-700 dark:text-primary-400' : ''}`}>
              Home
            </Link>

            <Link to="/news" className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium transition-colors ${location.pathname === '/news' ? 'text-primary-700 dark:text-primary-400' : ''}`}>
              News
            </Link>

            <Link to="/forum" className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium transition-colors ${location.pathname === '/forum' ? 'text-primary-700 dark:text-primary-400' : ''}`}>
              Community
            </Link>
            
            {user && (
              <>
                <Link to="/dashboard" className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium transition-colors ${location.pathname === '/dashboard' ? 'text-primary-700 dark:text-primary-400' : ''}`}>
                  Dashboard
                </Link>
                <Link to="/crop-recommendation" className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium transition-colors ${location.pathname === '/crop-recommendation' ? 'text-primary-700 dark:text-primary-400' : ''}`}>
                  Crop Recommendations
                </Link>
                <Link to="/disease-detection" className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium transition-colors ${location.pathname === '/disease-detection' ? 'text-primary-700 dark:text-primary-400' : ''}`}>
                  Disease Detection
                </Link>
                <Link to="/marketplace" className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium transition-colors ${location.pathname === '/marketplace' ? 'text-primary-700 dark:text-primary-400' : ''}`}>
                  Marketplace
                </Link>
              </>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full"
                  >
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={toggleLanguage}
                    className="rounded-full"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{language === 'en' ? 'मराठी' : 'English'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700">
                      <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 overflow-hidden">
                        {profile?.avatar_url ? (
                          <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          profile?.first_name ? profile.first_name[0].toUpperCase() : user.email?.[0].toUpperCase()
                        )}
                      </div>
                      <span>{profile?.first_name || 'Profile'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start p-2 border-b border-border">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 overflow-hidden">
                          {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            profile?.first_name ? profile.first_name[0].toUpperCase() : user.email?.[0].toUpperCase()
                          )}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">{profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : user.email}</p>
                          <p className="text-xs text-muted-foreground">{profile?.role || 'Farmer'}</p>
                        </div>
                      </div>
                    </div>
                    <Link to="/profile">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/dashboard">
                      <DropdownMenuItem>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/settings">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => signOut()}
                      className="text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-400"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" className="flex items-center gap-2">
                    <LogIn size={18} />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium py-2 ${location.pathname === '/' ? 'text-primary-700 dark:text-primary-400' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link 
                to="/news" 
                className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium py-2 ${location.pathname === '/news' ? 'text-primary-700 dark:text-primary-400' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Newspaper className="inline-block mr-2 h-4 w-4" />
                News
              </Link>

              <Link 
                to="/forum" 
                className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium py-2 ${location.pathname === '/forum' ? 'text-primary-700 dark:text-primary-400' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="inline-block mr-2 h-4 w-4" />
                Community
              </Link>
              
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium py-2 ${location.pathname === '/dashboard' ? 'text-primary-700 dark:text-primary-400' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/crop-recommendation" 
                    className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium py-2 ${location.pathname === '/crop-recommendation' ? 'text-primary-700 dark:text-primary-400' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Crop Recommendations
                  </Link>
                  <Link 
                    to="/disease-detection" 
                    className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium py-2 ${location.pathname === '/disease-detection' ? 'text-primary-700 dark:text-primary-400' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Disease Detection
                  </Link>
                  <Link 
                    to="/marketplace" 
                    className={`text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 font-medium py-2 ${location.pathname === '/marketplace' ? 'text-primary-700 dark:text-primary-400' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Marketplace
                  </Link>
                </>
              )}
              
              <div className="flex items-center justify-between space-x-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300">
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </span>
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full"
                  >
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={toggleLanguage}
                    className="rounded-full"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="w-1/2">
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                        <User size={18} />
                        <span>Profile</span>
                      </Button>
                    </Link>
                    <Button 
                      className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 w-1/2"
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-1/2">
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                        <LogIn size={18} />
                        <span>Login</span>
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-1/2">
                      <Button className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">Register</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
