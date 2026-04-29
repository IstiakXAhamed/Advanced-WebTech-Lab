
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';

export default function App() {
  const studentDatabase = [
    {
      id: "22-48998-3", name: "MD ISTIAK AHAMED", avatar: "../../resources/Sanim.jpg", gpa: 3.98, major: "Computational Theory",
      courses: [{ name: "Adv Webtec", color: "#ef4444" },{name:"NLP",color:"#3b82f6"}]
    },
    {
      id: "22-48888-3", name: "Kawshik Karmakar", avatar: "../../resources/Kawshik.jpg", gpa: 4.00 , major: "Computational Theory",
      courses: [{ name: "Adv Webtec", color: "#ef4444" },{name:"NLP",color:"#3b82f6"},{name: "Algorithms",color:"#10b981"}]
    },
    {
      id: "23-44332-1", name: "Naiyer Nur Fairuz", avatar: "../../resources/Nava.jpg", gpa: 4.00 , major: "Information System",
      courses: [{ name: "Adv Webtec", color: "#ef4444" },{name:"NLP",color:"#3b82f6"},{ name: "DLC", color: "#f59e0b" }]
    },
    {
      id: "23-43368-2", name: "Ashik Rahman", avatar: "../../resources/Ashik.jpg", gpa: 3.88, major: "Computational Theory",
      courses: [{ name: "Adv Webtec", color: "#ef4444" },{name:"NLP",color:"#3b82f6"}]
    },
    {
      id: "22-44342-3", name: "Lutful Kabir", avatar: "../../resources/LutfulKabir.jpeg", gpa: 3.99, major: "Computational Theory",
      courses: [{ name: "Adv Webtec", color: "#ef4444" },{name:"NLP",color:"#3b82f6"}]
    },
  


  ]
  
   return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <DashboardHeader 
        title="American International University-Bangladesh Administration" 
        tagline="Centralized Student Information System " 
      />
      {/* Responsive Grid Layout via Tailwind */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {studentDatabase.map((student) => (
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
    </div>
   );
 }
  
