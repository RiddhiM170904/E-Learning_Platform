import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  progress: {
    type: Map,
    of: Boolean,
    default: {}
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure a user can only enroll once per course
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Method to calculate progress percentage
enrollmentSchema.methods.getProgressPercentage = function(totalLessons) {
  if (totalLessons === 0) return 0;
  const completedLessons = Array.from(this.progress.values()).filter(Boolean).length;
  return Math.round((completedLessons / totalLessons) * 100);
};

export default mongoose.model('Enrollment', enrollmentSchema);
