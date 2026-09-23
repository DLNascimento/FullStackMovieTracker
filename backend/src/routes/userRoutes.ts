import { Router } from "express";
import {createUserController, deleteUserController, getUsersController} from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../schemas/userSchemas.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRoutes = Router();

userRoutes.post("/", validate(createUserSchema), createUserController);
userRoutes.get("/", getUsersController);
userRoutes.delete("/me", authMiddleware, deleteUserController);

export default userRoutes;