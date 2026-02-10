import express from 'express';
import profileResolver from './profile.resolver';
import { authMiddleware } from '../../commen/middlewares/auth.middleware';

const router = express.Router();


router.post('/create', authMiddleware, profileResolver.createProfile);
router.get('/get-profile', authMiddleware, profileResolver.getProfileByUserId);
router.put('/update', authMiddleware, profileResolver.updateProfile);
router.delete('/delete', authMiddleware, profileResolver.deleteProfileByUserId);

export default router;