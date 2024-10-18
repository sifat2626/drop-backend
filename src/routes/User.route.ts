import express from 'express';
import { handleValidationErrors, validateLogin, validateRegistration } from "../middlewares/ValidationMiddleware";
import {
    blockUnblockUser,
    getUserProfile,
    loginUser,
    registerUser,
    updateUserProfile
} from "../controllers/User.controller";
import authenticateJWT from "../middlewares/AuthMiddleware";
import authorizeRoles from "../middlewares/RolesMiddleware";

const router = express.Router();

// Public Routes
router.post('/register', validateRegistration, handleValidationErrors, registerUser);
router.post('/login', validateLogin, handleValidationErrors, loginUser);

// Protected Routes
router.get('/profile', authenticateJWT, getUserProfile);
router.put('/profile', authenticateJWT, updateUserProfile);
router.patch('/:userId/block', authenticateJWT, authorizeRoles('Admin'), blockUnblockUser); // Admin route to block/unblock users

export default router;