import { type Request, type Response, type NextFunction } from "express";
import { createUserService, getUsersService } from "../services/userService.js"

export async function createUserController(req: Request, res: Response, next: NextFunction){
    
    try {
    const { name, email, password} = req.body;

    const user = await createUserService(name, email, password);

    res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    });
    } catch (error) {
        next(error);
    }
    
}

export async function getUsersController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const users = await getUsersService();

        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
