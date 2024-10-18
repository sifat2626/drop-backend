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
// Create the DonationRequests schema
const donationRequestSchema = new mongoose_1.Schema({
    requesterId: { type: mongoose_1.default.Types.ObjectId, required: true, ref: 'User' },
    donorId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', default: null }, // Nullable for pending requests
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
}, { timestamps: true, versionKey: false });
// Create the DonationRequest model
const DonationRequestModel = mongoose_1.default.model('DonationRequest', donationRequestSchema);
exports.default = DonationRequestModel;
