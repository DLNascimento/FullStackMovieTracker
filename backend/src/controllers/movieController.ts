import { type Request, type Response, type NextFunction } from "express";
import { createMovie, getMoviesByUser, updateMovieService, deleteMovieService } from "../services/movieService.js";
import { searchMovies } from "../services/tmdbService.js";

export async function createMovieController(req: Request, res: Response, next: NextFunction) {

    try {
        const { movieId, title, posterPath, status, rating, comment } = req.body;

        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: "Authorization required" });
        }

        const movie = await createMovie(userId, {
            movieId,
            title,
            posterPath,
            status,
            rating,
            comment
        });

        return res.status(201).json(movie);


    } catch (error) {
        next(error);
    }
}

export async function getMoviesController(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const movies = await getMoviesByUser(userId);

        return res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}

export async function updateMovieController(req: Request, res: Response, next: NextFunction) {

    try {

        const movieEntryId = Number(req.params.id);
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ message: "Authentication required" })
        }

        if (Number.isNaN(movieEntryId)) {
            return res.status(400).json({ message: "Invalid movie id" });
        }

        const movie = await updateMovieService(userId!, movieEntryId, req.body);

        return res.status(200).json(movie);

    } catch (error) {
        next(error);
    }

}

export async function deleteMovieController(req: Request, res: Response, next: NextFunction) {

    try {
        const movieEntryId = Number(req.params.id);
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ message: "Authentication required" });
        }

        if (Number.isNaN(movieEntryId)) {
            res.status(400).json({ message: "Invalid movie id" });
        }

        await deleteMovieService(userId!, movieEntryId);

        return res.status(204).send();

    } catch (error) {
        next(error);
    }

}


export async function searchMoviesController(req: Request, res: Response, next: NextFunction) {

    try {
        const query = req.query.query;

        if (typeof query !== "string" || !query.trim()) {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        const movies = await searchMovies(query);

        return res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}