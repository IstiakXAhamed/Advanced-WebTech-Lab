import PropTypes from 'prop-types';

export default function DashboardHeader({ title, tagline, favoritesCount=0 }) {
  return (
    <header className="mb-8 pb-4 border-b border-slate-700 flex justify-between items-end">
      <div>
         <h1 className="text-3xl font-extrabold text-indigo-500 mb-2">{title}</h1>
        <p className="text-slate-400 m-0">{tagline}</p>
        
        
      </div>
      
      <div className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-lg font-bold">
        
        Favorites: {favoritesCount}

      </div>
    </header>
  );
}

DashboardHeader.propTypes = {

  title: PropTypes.string.isRequired,

  tagline: PropTypes.string.isRequired,
  
  favoritesCount: PropTypes.number
};
