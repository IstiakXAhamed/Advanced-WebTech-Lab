import { useState } from 'react';
import { useStudents } from '../contexts/StudentContext';

export default function AddStudentForm() {
  const { students, setStudents } = useStudents();
  
  const [formData, setFormData] = useState({
    name: '', id: '', major: '', gpa: '', courses: ''
  });
  
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.id.trim() || isNaN(formData.id)) newErrors.id = "ID must be a unique number";
    
    // check unique id
    let exists = false;
    for(let i=0; i<students.length; i++){
       if(students[i].id === formData.id) exists = true;
    }
    if(exists) newErrors.id = "This ID already exists";
    
    if (!formData.major.trim()) newErrors.major = "Major is required";
    
    const gpaNum = parseFloat(formData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) newErrors.gpa = "GPA must be between 0 and 4.0";

    setErrors(newErrors);
    
    if(Object.keys(newErrors).length === 0){
       return true
    } else {
       return false
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (validate()) {
      let courseArray = formData.courses.split(',').map(c => {
         return { name: c.trim(), color: '#4f46e5' }
      })
      
      let finalCourses = []
      for(let i=0; i<courseArray.length; i++){
         if(courseArray[i].name !== "") {
            finalCourses.push(courseArray[i])
         }
      }

      const newStudent = {
        id: formData.id,
        name: formData.name,
        major: formData.major,
        gpa: parseFloat(formData.gpa),
        avatar: `https://ui-avatars.com/api/?name=${formData.name.replace(' ', '+')}`,
        courses: finalCourses
      };

      setStudents([newStudent, ...students]);
      
      setFormData({ name: '', id: '', major: '', gpa: '', courses: '' });
      setSuccessMsg("Student added successfully!");
      
      setTimeout(() => {
         setSuccessMsg("")
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8 border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Register New Student</h2>
      
      {successMsg && <div className="bg-green-500/20 text-green-600 dark:text-green-400 p-3 rounded mb-4 font-semibold">{successMsg}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input 
            placeholder="Full Name" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 rounded-lg border bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <input 
            placeholder="Student ID (Numbers only)" 
            value={formData.id}
            onChange={e => setFormData({...formData, id: e.target.value})}
            className="w-full p-3 rounded-lg border bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
          {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
        </div>

        <div>
          <input 
            placeholder="Major" 
            value={formData.major}
            onChange={e => setFormData({...formData, major: e.target.value})}
            className="w-full p-3 rounded-lg border bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
          {errors.major && <p className="text-red-500 text-xs mt-1">{errors.major}</p>}
        </div>

        <div>
          <input 
            placeholder="GPA (0.0 to 4.0)" 
            value={formData.gpa}
            onChange={e => setFormData({...formData, gpa: e.target.value})}
            className="w-full p-3 rounded-lg border bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
          {errors.gpa && <p className="text-red-500 text-xs mt-1">{errors.gpa}</p>}
        </div>

        <div className="md:col-span-2">
          <input 
            placeholder="Courses (comma separated, e.g. NLP, Webtec)" 
            value={formData.courses}
            onChange={e => setFormData({...formData, courses: e.target.value})}
            className="w-full p-3 rounded-lg border bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
      
      <button type="submit" className="mt-6 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold transition-colors w-full md:w-auto">
        Add Student
      </button>
      
    </form>
  );
}
