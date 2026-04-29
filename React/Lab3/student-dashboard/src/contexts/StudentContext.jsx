import { createContext, useState, useEffect, useContext } from 'react';

const StudentContext = createContext();

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

export function StudentProvider({ children }) {
  
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('dashboard_students');
    if(saved) return JSON.parse(saved)
    return FAKE_DATABASE
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState('default');
  
  const [favorites, setFavorites] = useState(() => {
    let saved = localStorage.getItem('dashboard_favs')
    if(saved) return JSON.parse(saved)
    return []
  });

  // save to local storage
  useEffect(() => {
    localStorage.setItem('dashboard_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('dashboard_favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    let newFavs;
    if(favorites.includes(id)){
       newFavs = favorites.filter(favId => favId !== id)
    } else {
       newFavs = [...favorites, id]
    }
    setFavorites(newFavs)
  }

  const removeStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
    setFavorites(favorites.filter(favId => favId !== id));
  }

  return (
    <StudentContext.Provider value={{
      students, setStudents,
      searchQuery, setSearchQuery,
      sortType, setSortType,
      favorites, toggleFavorite,
      removeStudent
    }}>
      {children}
    </StudentContext.Provider>
  );
}

export const useStudents = () => useContext(StudentContext);
