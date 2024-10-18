"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ValidationMiddleware_1 = require("../middlewares/ValidationMiddleware");
const User_controller_1 = require("../controllers/User.controller");
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const RolesMiddleware_1 = __importDefault(require("../middlewares/RolesMiddleware"));
const router = express_1.default.Router();
// Public Routes
router.post('/register', ValidationMiddleware_1.validateRegistration, ValidationMiddleware_1.handleValidationErrors, User_controller_1.registerUser);
router.post('/login', ValidationMiddleware_1.validateLogin, ValidationMiddleware_1.handleValidationErrors, User_controller_1.loginUser);
// Protected Routes
router.get('/profile', AuthMiddleware_1.default, User_controller_1.getUserProfile);
router.put('/profile', AuthMiddleware_1.default, User_controller_1.updateUserProfile);
router.patch('/:userId/block', AuthMiddleware_1.default, (0, RolesMiddleware_1.default)('Admin'), User_controller_1.blockUnblockUser); // Admin route to block/unblock users
exports.default = router;
