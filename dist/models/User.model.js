"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Create the User schema
const userSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, unique: true },
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
}, { timestamps: true, versionKey: false } // Automatically manage createdAt and updatedAt fields
);
// Create the User model
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
