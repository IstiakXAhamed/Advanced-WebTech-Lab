import { useState,useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';

const studentDatabase = [
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
  },
  


];

export default function App() {
  
  // state for students (empty )
  const [students, setStudents] = useState([]);

  //state to track if we are loading now
  const [isLoading, setIsLoading] = useState(true);
  
  //use effect to simulate fetching data when teh app first loads
  useEffect(() => {
    //set a timer 1.5 second 
    const timer = setTimeout(() => {
     
      setStudents(studentDatabase);
     
     
      setIsLoading(false);
    }, 1500);

    //CLEAN UP FUNCTION 
    return () => clearTimeout(timer);
  }, []);//empty array = run exactly once when app load  
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState('default');
  const [favoritesCount, setFavoritesCount] = useState(0)

  const handleFavoriteToggle = (isFavorited) => {
    if (isFavorited) {
      
      setFavoritesCount(favoritesCount + 1)
    }
    
    else {
      
      setFavoritesCount(favoritesCount - 1)
    }
  }

  // filter students first
  let filteredStudents = students.filter(student => {

    let query = searchQuery.toLowerCase()

    
    return student.name.toLowerCase().includes(query) || student.major.toLowerCase().includes(query)
  })

  // then sort them
  let sortedAndFilteredStudents = [...filteredStudents].sort((a, b) => {
    
    if(sortType === 'name'){
    
      return a.name.localeCompare(b.name)
    
    }
    else if(sortType === 'gpa'){
    
      return b.gpa - a.gpa
    
    }
    return 0
  })

  // update the tab title
  useEffect(() => {
     if(isLoading) {
    
    
       document.title = "Loading Dashboard..."
    
     }
     else {
    
       document.title = `Dashboard - ${filteredStudents.length} Students`
    
    
      }
  },[filteredStudents.length, isLoading])
  
    return (
     <div className="max-w-7xl mx-auto p-6 md:p-10">
    
        <DashboardHeader 
    
          title="American International University-Bangladesh Administration" 
       
          tagline="Centralized Student Information System" 
       
          favoritesCount={favoritesCount}
      />

      {!isLoading && (
        <>
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <SortControls currentSort={sortType} onSortChange={setSortType} />
        </>
      )}

      {/* Conditional Rendering: If loading is true, show a spinner */}
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
             
                  onToggleFavorite={handleFavoriteToggle}
              // (...student is a shortcut to pass all properties like id={student.id} name={student.name} automatically!)
            />
          ))}
        </div>
      )}
    </div>
   );
 }
  
