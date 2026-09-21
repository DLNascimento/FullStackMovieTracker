import { Router } from "express";
import { loginController, logoutController } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema } from "../schemas/authSchemas.js";


const authRoutes = Router();

authRoutes.post("/login", validate(loginSchema), loginController)
authRoutes.post("/logout", logoutController);

export default authRoutes;