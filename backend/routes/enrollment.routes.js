import express from 'express';
import {
  enrollInCourse,
  getMyEnrollments,
  getEnrollment,
  updateProgress,
  deleteEnrollment
} from '../controllers/enrollment.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All routes are protected

router.post('/', enrollInCourse);
router.get('/me', getMyEnrollments);
router.get('/:id', getEnrollment);
router.put('/:id/progress', updateProgress);
router.delete('/:id', deleteEnrollment);

export default router;
