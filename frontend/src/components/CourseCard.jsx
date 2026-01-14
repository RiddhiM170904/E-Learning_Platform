import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/courses/${course.slug}`} className="card group hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">{course.category}</span>
          <span className="text-lg font-bold text-primary-600">{formatPrice(course.price)}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{course.lessons?.length || 0} lessons</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
