import Enrollment from '../models/Enrollment.model.js';
import Course from '../models/Course.model.js';

// @desc    Enroll user in a course
// @route   POST /api/enrollments
// @access  Private
export const enrollInCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      userId: req.user.id,
      courseId
    });

    res.status(201).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's enrollments
// @route   GET /api/enrollments/me
// @access  Private
export const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id })
      .populate({
        path: 'courseId',
        select: 'title slug description thumbnailUrl difficulty category lessons'
      })
      .sort({ enrolledAt: -1 });

    // Calculate progress for each enrollment
    const enrollmentsWithProgress = enrollments.map(enrollment => {
      const course = enrollment.courseId;
      const totalLessons = course.lessons ? course.lessons.length : 0;
      const progressPercentage = enrollment.getProgressPercentage(totalLessons);

      return {
        _id: enrollment._id,
        course: course,
        progress: enrollment.progress,
        progressPercentage,
        enrolledAt: enrollment.enrolledAt,
        lastAccessedAt: enrollment.lastAccessedAt
      };
    });

    res.status(200).json({
      success: true,
      count: enrollmentsWithProgress.length,
      data: enrollmentsWithProgress
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single enrollment
// @route   GET /api/enrollments/:id
// @access  Private
export const getEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('courseId');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Check if user owns this enrollment or is admin
    if (enrollment.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this enrollment'
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enrollment progress
// @route   PUT /api/enrollments/:id/progress
// @access  Private
export const updateProgress = async (req, res, next) => {
  try {
    const { lessonId, completed } = req.body;

    let enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Check if user owns this enrollment
    if (enrollment.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this enrollment'
      });
    }

    // Update progress
    enrollment.progress.set(lessonId, completed);
    enrollment.lastAccessedAt = Date.now();
    await enrollment.save();

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete enrollment
// @route   DELETE /api/enrollments/:id
// @access  Private
export const deleteEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Check if user owns this enrollment or is admin
    if (enrollment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this enrollment'
      });
    }

    await enrollment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Enrollment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
