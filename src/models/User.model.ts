import mongoose, { Document, Schema } from "mongoose";

// Define the IUser interface extending Document
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId; // Unique identifier for each user
    name: string;                  // User's full name
    email: string;                 // User's email address
    password: string;              // User's password (required for authentication)
    avatar?: string;               // Optional URL to user's avatar image
    bloodGroup: string;            // User's blood group (required)
    district: string;              // User's district (required)
    upazila: string;               // User's upazila (sub-district)
    role: 'Admin' | 'Donor' | 'Volunteer'; // Role of the user
    status: 'active' | 'blocked';  // Status of the user account
}

// Create the User schema
const userSchema: Schema = new Schema(
    {
        _id: { type: mongoose.Types.ObjectId, required: true, unique: true },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true, // Password is required for authentication
        },
        avatar: {
            type: String,
        },
        bloodGroup: {
            type: String,
            enum: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'],
            required: true,
        },
        district: {
            type: String,
            enum: ['Dhaka', 'Chattogram', 'Sylhet', 'Khulna', 'Rangpur', 'Rajshahi', 'Barisal', 'Mymensingh'],
            required: true, // Required field for user registration
        },
        upazila: {
            type: String,
        },
        role: {
            type: String,
            enum: ['Admin', 'Donor', 'Volunteer'],
            default: 'Donor', // Default role assigned to new users
        },
        status: {
            type: String,
            enum: ['active', 'blocked'],
            default: 'active', // Default status assigned to new users
        },
    },
    { timestamps: true, versionKey: false } // Automatically manage createdAt and updatedAt fields
);

// Create the User model
const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;