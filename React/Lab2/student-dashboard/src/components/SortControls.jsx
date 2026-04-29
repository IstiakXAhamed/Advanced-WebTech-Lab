export default function SortControls({ currentSort, onSortChange }) {

  return (


    
    <div className="flex gap-2 mb-8">
      <span className="text-slate-400 self-center mr-2">Sort by:</span>
      <button 
        onClick={() => onSortChange('default')}


        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentSort === 'default' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
      
      >

        Default
      </button>
      <button 
        onClick={() => onSortChange('name')}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentSort === 'name' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
      >
        Name (A-Z)




      </button>
      <button 
        
        onClick={() => onSortChange('gpa')}
        
        
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentSort === 'gpa' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
      >
        GPA (High to Low)
      </button>
      

      
    </div>
  );
}