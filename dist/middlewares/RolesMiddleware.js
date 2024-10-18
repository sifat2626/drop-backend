"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        next(); // User is authorized, continue to the next middleware or controller
    };
};
exports.default = authorizeRoles;
