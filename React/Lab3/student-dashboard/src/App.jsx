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

  // Fake a loading screen
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // 1. FILTERING LOGIC (Easy to understand!)
  let finalStudents = [];
  
  for(let i=0; i<students.length; i++){
     let currentStudent = students[i];
     
     // Make everything lowercase so 'A' and 'a' match
     let nameLowerCase = currentStudent.name.toLowerCase();
     let majorLowerCase = currentStudent.major.toLowerCase();
     let searchLowerCase = searchQuery.toLowerCase();
     
     if (nameLowerCase.includes(searchLowerCase) || majorLowerCase.includes(searchLowerCase)) {
         finalStudents.push(currentStudent);
     }
  }

  // 2. SORTING LOGIC (Easy to understand!)
  if (sortType === 'name') {
      finalStudents.sort(function(a, b) {
          if(a.name < b.name) {
              return -1;
          }
          if(a.name > b.name) {
              return 1;
          }
          return 0;
      });
  }

  if (sortType === 'gpa') {
      finalStudents.sort(function(a, b) {
          if(a.gpa > b.gpa) {
              return -1; // Highest GPA goes first
          }
          if(a.gpa < b.gpa) {
              return 1;
          }
          return 0;
      });
  }

  // 3. TAB TITLE UPDATE
  useEffect(() => {
     if (isLoading === true) {
        document.title = "Loading Dashboard...";
     } else {
        document.title = "Dashboard - " + finalStudents.length + " Students";
     }
  }, [finalStudents.length, isLoading]);
  
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      
      <DashboardHeader 
        title="American International University-Bangladesh Administration" 
        tagline="Centralized Student Information System" 
        favoritesCount={favorites.length}
      />

      {isLoading === false && (
        <>
          <AddStudentForm />
          
          <SearchBar />
          <SortControls />
        </>
      )}

      {isLoading === true ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {finalStudents.map((student) => (
            <StudentCard 
              key={student.id}
              id={student.id}
              name={student.name}
              avatar={student.avatar}
              gpa={student.gpa}
              major={student.major}
              courses={student.courses}
            />
          ))}
          
        </div>
      )}
      
    </div>
  );
}
