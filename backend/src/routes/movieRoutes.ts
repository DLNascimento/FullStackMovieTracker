import { Router } from "express";

import { createMovieController, getMoviesController, updateMovieController } from "../controllers/movieController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createMovieSchema, updateMovieSchema } from "../schemas/movieSchemas.js";

const movieRoutes = Router();

movieRoutes.post( "/", authMiddleware, validate(createMovieSchema), createMovieController);
movieRoutes.get( "/", authMiddleware, getMoviesController);
movieRoutes.patch( "/:id", authMiddleware, validate(updateMovieSchema), updateMovieController);

export default movieRoutes;