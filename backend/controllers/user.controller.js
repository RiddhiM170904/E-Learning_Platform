import User from '../models/User.model.js';
import Enrollment from '../models/Enrollment.model.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's enrollments
    const enrollments = await Enrollment.find({ userId: user._id })
      .populate('courseId', 'title slug');

    res.status(200).json({
      success: true,
      data: {
        user,
        enrollments
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete user's enrollments
    await Enrollment.deleteMany({ userId: user._id });

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User and associated enrollments deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get platform statistics
// @route   GET /api/users/stats
// @access  Private/Admin
export const getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    const recentUsers = await User.find()
      .select('name email createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentEnrollments = await Enrollment.find()
      .populate('userId', 'name email')
      .populate('courseId', 'title')
      .sort({ enrolledAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalEnrollments,
        recentUsers,
        recentEnrollments
      }
    });
  } catch (error) {
    next(error);
  }
};
