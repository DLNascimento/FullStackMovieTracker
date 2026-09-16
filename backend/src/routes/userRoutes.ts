import { Router } from "express";
import {createUserController} from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../schemas/userSchemas.js";

const userRoutes = Router();

userRoutes.post("/", validate(createUserSchema), createUserController);

export default userRoutes;