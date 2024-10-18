import { Request, Response } from 'express';
import UserModel from '../models/User.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Define an interface for the request body
interface RegisterRequestBody {
    name: string;
    email: string;
    password: string;
    bloodGroup: string;
    district: string;
    upazila: string;
    avatar?: string; // Optional field
}

// Registration function
export const registerUser = async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> => {
    const { name, email, password, bloodGroup, district, upazila } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            bloodGroup,
            district,
            upazila,
            role: 'Donor',
            status: 'active',
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login function
export const loginUser = async (req: Request<{}, {}, { email: string; password: string }>, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: 'Unauthorized access' });
            return;
        }

        const user = await UserModel.findById(userId).select('-password'); // Exclude password from response

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User Profile
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: 'Unauthorized access' });
            return;
        }

        // Update user information
        const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true }).select('-password');

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin Block/Unblock User
export const blockUnblockUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Toggle status between active and blocked
        user.status = user.status === 'active' ? 'blocked' : 'active';

        await user.save();

        res.json({ message: `User has been ${user.status === 'active' ? 'unblocked' : 'blocked'} successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
