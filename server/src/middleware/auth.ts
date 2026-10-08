import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../config';

// Rejects requests without a valid "Authorization: Bearer <token>" header.
export const protect = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Not authorized, no token' });
        return;
    }

    try {
        const payload = jwt.verify(header.slice(7), getJwtSecret()) as { id: string };
        res.locals.userId = payload.id;
        next();
    } catch {
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};
