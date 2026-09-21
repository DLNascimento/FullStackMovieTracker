import { type Request, type Response, type NextFunction } from "express";
import { loginUser } from "../services/authService.js";

export async function loginController(req: Request, res: Response, next: NextFunction){

    try {
        const { email, password} = req.body;

        const user = await loginUser(email, password);

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