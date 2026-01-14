import { useState, useEffect } from 'react';
import { userService, courseService } from '../services/api.service';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: 0,
    category: 'Programming',
    difficulty: 'Beginner',
    thumbnailUrl: '',
    lessons: []
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'overview') {
        const data = await userService.getStats();
        setStats(data.data);
      } else if (activeTab === 'users') {
        const data = await userService.getUsers();
        setUsers(data.data);
      } else if (activeTab === 'courses') {
        const data = await courseService.getCourses({ limit: 100 });
        setCourses(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await courseService.createCourse(courseForm);
      setShowCourseForm(false);
      setCourseForm({
        title: '',
        description: '',
        price: 0,
        category: 'Programming',
        difficulty: 'Beginner',
        thumbnailUrl: '',
        lessons: []
      });
      fetchData();
    } catch (err) {
      console.error('Failed to create course:', err);
      alert('Failed to create course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await courseService.deleteCourse(id);
      fetchData();
    } catch (err) {
      console.error('Failed to delete course:', err);
      alert('Failed to delete course');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await userService.deleteUser(id);
      fetchData();
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Panel</h1>

        {/* Tabs */}
        <div className="card mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['overview', 'users', 'courses'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-primary-600 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <>
                {/* Overview Tab */}
                {activeTab === 'overview' && stats && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-primary-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
                        <p className="text-4xl font-bold text-primary-600">{stats.totalUsers}</p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Enrollments</h3>
                        <p className="text-4xl font-bold text-green-600">{stats.totalEnrollments}</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">Recent Users</h3>
                      <div className="space-y-2">
                        {stats.recentUsers?.map((user) => (
                          <div key={user._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-semibold">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Recent Enrollments</h3>
                      <div className="space-y-2">
                        {stats.recentEnrollments?.map((enrollment) => (
                          <div key={enrollment._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-semibold">{enrollment.userId?.name}</p>
                              <p className="text-sm text-gray-600">{enrollment.courseId?.title}</p>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(enrollment.enrolledAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold">All Users ({users.length})</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Joined
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr key={user._id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">{user.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.role === 'admin'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {user.role !== 'admin' && (
                                  <button
                                    onClick={() => handleDeleteUser(user._id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Delete
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Courses Tab */}
                {activeTab === 'courses' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">All Courses ({courses.length})</h3>
                      <button
                        onClick={() => setShowCourseForm(!showCourseForm)}
                        className="btn-primary"
                      >
                        {showCourseForm ? 'Cancel' : 'Create Course'}
                      </button>
                    </div>

                    {showCourseForm && (
                      <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <h4 className="text-lg font-semibold mb-4">Create New Course</h4>
                        <form onSubmit={handleCreateCourse} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                required
                                value={courseForm.title}
                                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                                className="input"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                              <input
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                value={courseForm.price}
                                onChange={(e) => setCourseForm({ ...courseForm, price: parseFloat(e.target.value) })}
                                className="input"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                              <select
                                value={courseForm.category}
                                onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                                className="input"
                              >
                                <option value="Programming">Programming</option>
                                <option value="Design">Design</option>
                                <option value="Business">Business</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                              <select
                                value={courseForm.difficulty}
                                onChange={(e) => setCourseForm({ ...courseForm, difficulty: e.target.value })}
                                className="input"
                              >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              required
                              rows="3"
                              value={courseForm.description}
                              onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL (optional)</label>
                            <input
                              type="url"
                              value={courseForm.thumbnailUrl}
                              onChange={(e) => setCourseForm({ ...courseForm, thumbnailUrl: e.target.value })}
                              className="input"
                            />
                          </div>
                          <button type="submit" className="btn-primary">
                            Create Course
                          </button>
                        </form>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courses.map((course) => (
                        <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg">{course.title}</h4>
                            <button
                              onClick={() => handleDeleteCourse(course._id)}
                              className="text-red-600 hover:text-red-900 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.description}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="px-2 py-1 bg-gray-100 rounded">{course.category}</span>
                            <span className="px-2 py-1 bg-gray-100 rounded">{course.difficulty}</span>
                            <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded">
                              ${course.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default Admin;
