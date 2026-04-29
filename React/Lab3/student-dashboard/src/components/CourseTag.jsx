import PropTypes from "prop-types";

export default function CourseTag({ courseName, color }) { 
    return (
        <span
            className="px-3 py-1 rounded-full text-xs font-semibold text-white mr-2 inline-block shadow-sm"
            style={{ backgroundColor: color }}
        >
            {courseName}
        </ span>

    
    );

}

CourseTag.PropTypes = {
    courseName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};