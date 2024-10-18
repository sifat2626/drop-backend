import mongoose, { Document, Schema } from "mongoose";

// Define the IUser interface extending Document
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    bloodGroup: string;
    district: string;
    upazila: string;
    role: string;
    status: string;
}

// Create the User schema
const userSchema: Schema = new Schema(
    {
        _id: { type: String, required: true, unique: true },
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
        },
        upazila: {
            type: String,
        },
        role: {
            type: String,
            enum: ['Admin', 'Donor', 'Volunteer'],
            default: 'Donor',
        },
        status: {
            type: String,
            enum: ['active', 'blocked'],
            default: 'active',
        },
    },
    { timestamps: true, versionKey: false }
);

// Create the User model
const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;