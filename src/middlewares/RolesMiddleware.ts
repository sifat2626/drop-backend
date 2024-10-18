import { Request, Response, NextFunction } from 'express';

const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        next(); // User is authorized, continue to the next middleware or controller
    };
};

export default authorizeRoles;