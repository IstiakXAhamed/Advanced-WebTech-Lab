import PropTypes from 'prop-types';
import CourseTag from './CourseTag';
import StatBadge from './StatBadge';
import { useStudents } from '../contexts/StudentContext';

export default function StudentCard({ name, id, avatar, gpa, major, courses }) {
  
  const { favorites, toggleFavorite, removeStudent } = useStudents();
  
  let isFavorite = false;
  if(favorites.includes(id)){
     isFavorite = true;
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg relative hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 border border-slate-200 dark:border-slate-700">
      
      <button 
        onClick={() => removeStudent(id)}
        className="absolute top-4 left-4 text-xs font-bold bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-colors"
      >
        Remove
      </button>

      <button onClick={() => toggleFavorite(id)} className={`absolute top-4 right-4 text-2xl transition-colors ${isFavorite ? 'text-red-500' : 'text-slate-300 dark:text-slate-600 hover:text-red-400'}`}>
        ♥
      </button>

      <div className="flex items-center gap-4 mb-6 mt-4">
        <img src={avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500" />
        <div>
          <h2 className="text-xl font-bold m-0 text-slate-900 dark:text-white">{name}</h2>
          <span className="block text-sm text-slate-500 dark:text-slate-400">ID: {id}</span>
          <span className="block text-sm text-slate-500 dark:text-slate-400">{major}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatBadge label="GPA" value={gpa} />
        <StatBadge label="Credits" value={120} />
      </div>

      <div>
        <h3 className="text-sm uppercase font-bold text-slate-500 dark:text-slate-400 mb-3">Enrolled Courses</h3>
        <div className="flex flex-wrap gap-y-2">
          {courses.map((courseItem, index) => (
            <CourseTag key={index} courseName={courseItem.name} color={courseItem.color} />
          ))}
        </div>
      </div>

    </div>
  );
}

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  gpa: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired
};
