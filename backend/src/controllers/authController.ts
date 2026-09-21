import { type Request, type Response, type NextFunction } from "express";
import { loginUser } from "../services/authService.js";
import { generateToken } from "../utils/jwt.js";

export async function loginController(req: Request, res: Response, next: NextFunction){

    try {
        const { email, password} = req.body;

        const user = await loginUser(email, password);

        const token = generateToken(user.id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }

}

export function logoutController(req: Request, res: Response) {
    
    res.clearCookie("token");

    res.status(200).json({
        message: "Logout successful"
    });
}