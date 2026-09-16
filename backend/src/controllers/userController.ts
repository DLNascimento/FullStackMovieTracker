import { type Request, type Response } from "express";
import { createUserService } from "../services/userService.js"

export async function createUserController(req: Request, res: Response){
    const { name, email, password} = req.body;

    const user = await createUserService(name, email, password);

    res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    });
}