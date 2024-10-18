import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Validation for registration
export const validateRegistration = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('bloodGroup').notEmpty().withMessage('Blood group is required'),
    body('district').notEmpty().withMessage('District is required'),
    body('upazila').notEmpty().withMessage('Upazila is required'),
];

// Validation for login
export const validateLogin = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};