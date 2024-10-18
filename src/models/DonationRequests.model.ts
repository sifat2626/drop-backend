import mongoose, { Document, Schema } from 'mongoose';

// Define the IDonationRequest interface extending Document
export interface IDonationRequest extends Document {
    requesterId: mongoose.Types.ObjectId;  // ID of the user requesting blood
    donorId: mongoose.Types.ObjectId | null; // ID of the donor (nullable for pending requests)
    recipientName: string;                  // Name of the blood recipient
    recipientDistrict: string;              // District where the recipient is located
    recipientUpazila: string;               // Upazila where the recipient is located
    hospitalName: string;                   // Name of the hospital for donation
    fullAddress: string;                    // Full address for donation location
    donationDate: Date;                     // Date of the donation
    donationTime: string;                   // Time of the donation
    requestMessage: string;                 // Message detailing why blood is needed
    status: 'pending' | 'inprogress' | 'done' | 'canceled';  // Status of the request
}

// Create the DonationRequests schema
const donationRequestSchema: Schema = new Schema(
    {
        requesterId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        donorId: { type: mongoose.Types.ObjectId, ref: 'User', default: null }, // Nullable for pending requests
        recipientName: { type: String, required: true },
        recipientDistrict: { type: String, required: true },
        recipientUpazila: { type: String, required: true },
        hospitalName: { type: String, required: true },
        fullAddress: { type: String, required: true },
        donationDate: { type: Date, required: true },
        donationTime: { type: String, required: true },
        requestMessage: { type: String },
        status: {
            type: String,
            enum: ['pending', 'inprogress', 'done', 'canceled'],
            default: 'pending',
        },
    },
    { timestamps: true, versionKey: false }
);

// Create the DonationRequest model
const DonationRequestModel = mongoose.model<IDonationRequest>('DonationRequest', donationRequestSchema);

export default DonationRequestModel;