import express from 'express'
import { getOtherUsers, getProfile, login, logout, register, userAvatarChange, userPasschange, userProfilechange } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/user@pasword-change', userPasschange);
router.post('/user-Profile-change', userProfilechange);
router.get('/get-profile', isAuthenticated, getProfile);
router.post('/logout', isAuthenticated, logout);
router.get('/get-other-user', isAuthenticated, getOtherUsers);
router.post('/user-avatar-change', isAuthenticated, upload.single('avatar'), userAvatarChange);

export default router;
