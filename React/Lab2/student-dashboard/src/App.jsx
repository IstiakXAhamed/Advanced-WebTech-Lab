import { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';

const FAKE_DATABASE = [
  {
    id: "22-48998-3", name: "MD ISTIAK AHAMED", avatar: "../../resources/Sanim.jpg", gpa: 3.98, major: "Computational Theory",
    courses: [{ name: "Adv Webtec", color: "#ef4444" }, { name: "NLP", color: "#3b82f6" }]
  },
  {
    id: "22-48888-3", name: "Kawshik Karmakar", avatar: "../../resources/Kawshik.jpg", gpa: 4.00, major: "Computational Theory",
    courses: [{ name: "Adv Webtec", color: "#ef4444" }, { name: "NLP", color: "#3b82f6" }, { name: "Algorithms", color: "#10b981" }]
  },
  {
    id: "23-44332-1", name: "Naiyer Nur Fairuz", avatar: "../../resources/Nava.jpg", gpa: 4.00, major: "Information System",
    courses: [{ name: "Adv Webtec", color: "#ef4444" }, { name: "NLP", color: "#3b82f6" }, { name: "DLC", color: "#f59e0b" }]
  },
  {
    id: "23-43368-2", name: "Ashik Rahman", avatar: "../../resources/Ashik.jpg", gpa: 3.88, major: "Computational Theory",
    courses: [{ name: "Adv Webtec", color: "#ef4444" }, { name: "NLP", color: "#3b82f6" }]
  },
  {
    id: "22-44342-3", name: "Lutful Kabir", avatar: "../../resources/LutfulKabir.jpeg", gpa: 3.99, major: "Computational Theory",
    courses: [{ name: "Adv Webtec", color: "#ef4444" }, { name: "NLP", color: "#3b82f6" }]
  }
];

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState('default');
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Fake a loading screen
  useEffect(() => {
    setTimeout(() => {
      setStudents(FAKE_DATABASE);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleFavoriteToggle = (isFavorited) => {
    if (isFavorited === true) {
      setFavoritesCount(favoritesCount + 1);
    } else {
      setFavoritesCount(favoritesCount - 1);
    }
  };

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
        favoritesCount={favoritesCount}
      />

      {isLoading === false && (
        <>
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <SortControls currentSort={sortType} onSortChange={setSortType} />
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
              onToggleFavorite={handleFavoriteToggle}
            />
          ))}
          
        </div>
      )}
      
    </div>
  );
}
