import { useStudents } from '../contexts/StudentContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useStudents();

  return (
    <div className="mb-8">
      <input 
        type="text" 
        placeholder="Search by name or major..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-4 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
      />
    </div>
  );
}