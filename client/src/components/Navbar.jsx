import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity">
            <img 
              src={theme === 'dark' ? '/waitnotlogo-dark.png' : '/waitnotflogo.png'}
              alt="WaitNot Logo" 
              className="h-12 sm:h-16 w-auto object-contain transition-opacity"
            />
          </Link>
          
          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-all duration-200"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={22} className="text-primary" />
              ) : (
                <Sun size={22} className="text-primary" />
              )}
            </button>
            
            {/* Language Selector */}
            <div className="flex items-center">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
