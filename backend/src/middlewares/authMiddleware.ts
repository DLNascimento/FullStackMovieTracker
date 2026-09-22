import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined")
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET as string);

        if (typeof decoded === "string" || typeof decoded.userId !== "number") {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        req.user = {
            userId: decoded.userId
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}