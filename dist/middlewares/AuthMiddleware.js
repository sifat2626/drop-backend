"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies
    if (!token) {
        res.sendStatus(403); // Forbidden if no token is found
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, decodedUser) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = decodedUser; // Attach the decoded user info to the request object
        next(); // Continue to the next middleware or controller
    });
};
exports.default = authenticateJWT;
