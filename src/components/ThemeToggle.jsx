import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-28 right-6 z-[100] p-3 rounded-full bg-gradient-to-br from-primary to-buttonsecondary dark:from-blue-600 dark:to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon - visible in dark mode */}
        <HiSun
          className={`absolute inset-0 w-6 h-6 text-yellow-300 transition-all duration-500 ${
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-180 scale-0'
          }`}
        />
        
        {/* Moon Icon - visible in light mode */}
        <HiMoon
          className={`absolute inset-0 w-6 h-6 text-white transition-all duration-500 ${
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-180 scale-0'
          }`}
        />
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 dark:bg-gray-700 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800 dark:border-l-gray-700"></span>
      </span>
    </button>
  );
};

export default ThemeToggle;

