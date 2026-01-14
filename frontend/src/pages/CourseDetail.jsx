import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService, enrollmentService } from '../services/api.service';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  const fetchCourse = async () => {
    try {
      const data = await courseService.getCourse(slug);
      setCourse(data.data);
    } catch (err) {
      setError('Failed to load course');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    setError('');
    setMessage('');

    try {
      await enrollmentService.enroll(course._id);
      setMessage('Successfully enrolled! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const formatPrice = (price) => price === 0 ? 'Free' : `$${price.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{course.category}</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{course.difficulty}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-primary-100 mb-6">{course.description}</p>
            <div className="flex items-center gap-6 text-primary-100">
              <span>{course.lessons?.length || 0} Lessons</span>
              <span className="text-2xl font-bold text-white">{formatPrice(course.price)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Image */}
            <div className="card mb-8">
              <img src={course.thumbnailUrl} alt={course.title} className="w-full h-64 object-cover" />
            </div>

            {/* Course Syllabus */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              {course.lessons && course.lessons.length > 0 ? (
                <div className="space-y-3">
                  {course.lessons
                    .sort((a, b) => a.order - b.order)
                    .map((lesson, index) => (
                      <div key={lesson._id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                          {lesson.videoUrl && (
                            <span className="text-sm text-gray-500">Video included</span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-600">No lessons available yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {formatPrice(course.price)}
                </div>
                {course.price === 0 && (
                  <p className="text-sm text-gray-600">100% Free Course</p>
                )}
              </div>

              {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                  {message}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full btn-primary mb-4"
              >
                {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>

              <div className="border-t pt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-semibold">{course.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons</span>
                  <span className="font-semibold">{course.lessons?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold">{course.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
