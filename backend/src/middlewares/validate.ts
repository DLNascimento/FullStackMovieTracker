import {type Request, type Response, type NextFunction } from "express";
import { z } from "zod";

export function validate(schema: z.ZodType){
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                message: "Invalid request data",
                errors: result.error.flatten()
            });
        }
        req.body = result.data;

        next();
    };
}
