import { useState, useEffect } from 'react';
import { useStudents } from './contexts/StudentContext';
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import AddStudentForm from './components/AddStudentForm';

export default function App() {
  
  const { students, searchQuery, sortType, favorites } = useStudents();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  let filteredStudents = students.filter(student => {
    let query = searchQuery.toLowerCase();
    return student.name.toLowerCase().includes(query) || student.major.toLowerCase().includes(query);
  });

  let sortedAndFilteredStudents = [...filteredStudents].sort((a, b) => {
    if (sortType === 'name') {
       return a.name.localeCompare(b.name);
    } else if (sortType === 'gpa') {
       return b.gpa - a.gpa;
    }
    return 0;
  });

  useEffect(() => {
     if (isLoading) {
        document.title = "Loading Dashboard...";
     } else {
        document.title = `Dashboard - ${filteredStudents.length} Students`;
     }
  }, [filteredStudents.length, isLoading]);
  
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      
      <DashboardHeader 
        title="American International University-Bangladesh Administration" 
        tagline="Centralized Student Information System" 
        favoritesCount={favorites.length}
      />

      {!isLoading && (
        <>
          <AddStudentForm />
          
          <SearchBar />
          <SortControls />
        </>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedAndFilteredStudents.map((student) => (
            <StudentCard 
              
              key={student.id}
              {...student}
              
            />
          ))}
        </div>
      )}
      
    </div>
  );
}
