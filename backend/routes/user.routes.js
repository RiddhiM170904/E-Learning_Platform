import express from 'express';
import { getUsers, getUser, deleteUser, getStats } from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/stats', getStats);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export default router;
