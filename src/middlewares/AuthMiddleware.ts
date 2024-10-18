import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include the user property
interface AuthenticatedRequest extends Request {
    user?: any; // You can replace 'any' with a more specific user type if available
}

const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies.token; // Get the token from cookies

    if (!token) {
        res.sendStatus(403); // Forbidden if no token is found
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET || '', (err: any, decodedUser: any) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }

        req.user = decodedUser; // Attach the decoded user info to the request object
        next(); // Continue to the next middleware or controller
    });
};

export default authenticateJWT;