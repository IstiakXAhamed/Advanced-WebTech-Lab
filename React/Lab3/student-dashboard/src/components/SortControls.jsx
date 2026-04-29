import { useStudents } from '../contexts/StudentContext';

export default function SortControls() {
  const { sortType, setSortType } = useStudents();

  return (
    <div className="flex gap-2 mb-8">
      <span className="text-slate-600 dark:text-slate-400 self-center mr-2">Sort by:</span>
      
      <button 
        onClick={() => setSortType('default')}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${sortType === 'default' ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
      >
        Default
      </button>
      
      <button 
        onClick={() => setSortType('name')}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${sortType === 'name' ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
      >
        Name (A-Z)
      </button>
      
      <button 
        onClick={() => setSortType('gpa')}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${sortType === 'gpa' ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
      >
        GPA (High to Low)
      </button>
      
    </div>
  );
}