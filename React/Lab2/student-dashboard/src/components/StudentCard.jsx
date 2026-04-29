import { useState } from 'react';
import PropTypes from 'prop-types';
import CourseTag from './CourseTag';
import StatBadge from './StatBadge';

export default function StudentCard({ name, id, avatar, gpa, major, courses, onToggleFavorite }) {
  
  const [isFavorite, setIsFavorite] = useState(false)

  const handleHeartClick = () => {
     let newState = !isFavorite
     setIsFavorite(newState)
     onToggleFavorite(newState)
  }

  return (
    // The interactive wrapper
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg relative hover:-translate-y-1 hover:shadow-2xl transition-all duration-200">
      
       <button onClick={handleHeartClick} className={`absolute top-4 right-4 text-2xl transition-colors ${isFavorite ? 'text-red-500' : 'text-slate-600 hover:text-red-400'}`}>
         ♥
       </button>

          { //1. Header Section 
          }
      <div className="flex items-center gap-4 mb-6">
        <img src={avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500" />
        <div>
          <h2 className="text-xl font-bold m-0">{name}</h2>
          <span className="block text-sm text-slate-400">ID: {id}</span>
          <span className="block text-sm text-slate-400">{major}</span>
        </div>
      </div>
      
      {// 2. Stats Section 
          }
      <div className="grid grid-cols-2 gap-4 mb-6">
                  <StatBadge label="GPA" value={gpa} />
                  
        <StatBadge label="Credits" value={120} />
      </div>

      {// 3. Courses Section using .map() 
      }
      <div>
        <h3 className="text-sm uppercase text-slate-400 mb-3">Enrolled Courses</h3>
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
  ).isRequired,
};
