import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext';

export default function DashboardHeader({ title, tagline, favoritesCount = 0 }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="mb-8 pb-4 border-b border-slate-300 dark:border-slate-700 flex justify-between items-end">
      <div>
         <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-500 mb-2">{title}</h1>
         <p className="text-slate-600 dark:text-slate-400 m-0">{tagline}</p>
      </div>
      
      <div className="flex gap-4">
        
        <button onClick={toggleTheme} className="bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-lg font-bold shadow-sm">
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
        
        <div className="bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg font-bold">
          Favorites: {favoritesCount}
        </div>
        
      </div>
    </header>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number
};
