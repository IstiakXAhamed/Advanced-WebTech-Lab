import PropTypes from 'prop-types';

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="mb-8">
      <input 
        type="text" 
        placeholder="Search by name or major..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full bg-slate-800 text-white px-6 py-4 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
      />
    </div>
  );
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};