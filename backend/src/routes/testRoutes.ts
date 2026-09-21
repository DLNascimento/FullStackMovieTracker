import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const testRoutes = Router();

testRoutes.get(
    "/me",
    authMiddleware,
    (req, res) => {
        res.json({
            message: "Authenticated successfully",
            user: req.user
        });
    }
);

export default testRoutes;