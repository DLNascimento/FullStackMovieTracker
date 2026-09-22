import { Router } from "express";

import { createMovieController } from "../controllers/movieController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createMovieSchema } from "../schemas/movieSchemas.js";

const movieRoutes = Router();

movieRoutes.post( "/", authMiddleware, validate(createMovieSchema), createMovieController);

export default movieRoutes;