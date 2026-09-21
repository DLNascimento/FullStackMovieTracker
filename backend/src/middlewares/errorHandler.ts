import {type Request, type Response, type NextFunction} from "express";
import { Prisma } from "../generated/prisma/client.js";

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
){

    if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"){
        return res.status(409).json({
            message: "Email already registered"
        });
    }

    console.log(error);

    return res.status(500).json({
        message: "Internal server error"
    });

}