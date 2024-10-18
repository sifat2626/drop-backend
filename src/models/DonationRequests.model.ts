import mongoose, { Document, Schema } from 'mongoose';

// Define the IDonationRequest interface extending Document
export interface IDonationRequest extends Document {
    requesterId: mongoose.Types.ObjectId;  // Change to ObjectId type
    recipientName: string;
    recipientDistrict: string;
    recipientUpazila: string;
    hospitalName: string;
    fullAddress: string;
    donationDate: Date;
    donationTime: string;
    requestMessage: string;
    status: string;  // Status of the request (pending, inprogress, done, canceled)
}

// Create the DonationRequests schema
const donationRequestSchema: Schema = new Schema(
    {
        requesterId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },  // Updated to ObjectId
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