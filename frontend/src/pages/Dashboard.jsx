import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enrollmentService, courseService } from '../services/api.service';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('enrolled');
  const [enrollments, setEnrollments] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'enrolled') {
        const data = await enrollmentService.getMyEnrollments();
        setEnrollments(data.data);
      } else {
        const data = await courseService.getCourses({ limit: 50 });
        setAvailableCourses(data.data);
        // Also get enrollments to filter out enrolled courses
        const enrolledData = await enrollmentService.getMyEnrollments();
        setEnrollments(enrolledData.data);
      }
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    try {
      await enrollmentService.enroll(courseId);
      setError('');
      // Refresh data
      fetchData();
      alert('Successfully enrolled in the course!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll in course');
    } finally {
      setEnrolling(null);
    }
  };

  const isEnrolled = (courseId) => {
    return enrollments.some(e => e.course._id === courseId);
  };

  const ProgressBar = ({ percentage }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  if (loading && activeTab === 'enrolled') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Track your learning progress and discover new courses</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Enrolled Courses</p>
                <p className="text-3xl font-bold text-gray-900">{enrollments.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed Courses</p>
                <p className="text-3xl font-bold text-gray-900">
                  {enrollments.filter(e => e.progressPercentage === 100).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-gray-900">
                  {enrollments.filter(e => e.progressPercentage > 0 && e.progressPercentage < 100).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('enrolled')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'enrolled'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                My Enrolled Courses
              </button>
              <button
                onClick={() => setActiveTab('available')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'available'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Available Courses
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <>
                {/* Enrolled Courses Tab */}
                {activeTab === 'enrolled' && (
                  <div>
                    {enrollments.length === 0 ? (
                      <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Enrolled Courses Yet</h3>
                        <p className="text-gray-600 mb-4">Start learning by enrolling in a course</p>
                        <button onClick={() => setActiveTab('available')} className="btn-primary">
                          Browse Available Courses
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {enrollments.map((enrollment) => (
                          <div key={enrollment._id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition">
                            <div className="flex flex-col md:flex-row gap-4">
                              {enrollment.course.thumbnailUrl && (
                                <img
                                  src={enrollment.course.thumbnailUrl}
                                  alt={enrollment.course.title}
                                  className="w-full md:w-48 h-32 object-cover rounded-lg"
                                />
                              )}
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                      {enrollment.course.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <span>{enrollment.course.category}</span>
                                      <span>•</span>
                                      <span>{enrollment.course.difficulty}</span>
                                    </div>
                                  </div>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    enrollment.progressPercentage === 100
                                      ? 'bg-green-100 text-green-800'
                                      : enrollment.progressPercentage > 0
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {enrollment.progressPercentage === 100
                                      ? 'Completed'
                                      : enrollment.progressPercentage > 0
                                      ? 'In Progress'
                                      : 'Not Started'}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                  {enrollment.course.description}
                                </p>
                                <div className="mb-3">
                                  <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-600">Progress</span>
                                    <span className="font-semibold text-primary-600">
                                      {enrollment.progressPercentage}%
                                    </span>
                                  </div>
                                  <ProgressBar percentage={enrollment.progressPercentage} />
                                </div>
                                <Link
                                  to={`/courses/${enrollment.course.slug || enrollment.course._id}`}
                                  className="btn-primary text-sm inline-block"
                                >
                                  {enrollment.progressPercentage === 0 ? 'Start Learning' : 'Continue Learning'}
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Available Courses Tab */}
                {activeTab === 'available' && (
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold">Browse All Courses</h3>
                      <p className="text-sm text-gray-600">Discover and enroll in courses to start learning</p>
                    </div>
                    {availableCourses.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-600">No courses available at the moment</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableCourses.map((course) => (
                          <div key={course._id} className="card overflow-hidden hover:shadow-lg transition">
                            {course.thumbnailUrl && (
                              <img
                                src={course.thumbnailUrl}
                                alt={course.title}
                                className="w-full h-48 object-cover"
                              />
                            )}
                            <div className="p-4">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{course.description}</p>
                              <div className="flex items-center gap-2 text-xs mb-3">
                                <span className="px-2 py-1 bg-gray-100 rounded">{course.category}</span>
                                <span className="px-2 py-1 bg-gray-100 rounded">{course.difficulty}</span>
                                {course.price > 0 && (
                                  <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded font-semibold">
                                    ${course.price}
                                  </span>
                                )}
                              </div>
                              {isEnrolled(course._id) ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Enrolled
                                  </span>
                                  <Link
                                    to={`/courses/${course.slug || course._id}`}
                                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                                  >
                                    View Course
                                  </Link>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleEnroll(course._id)}
                                  disabled={enrolling === course._id}
                                  className="w-full btn-primary text-sm"
                                >
                                  {enrolling === course._id ? 'Enrolling...' : 'Enroll Now'}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
