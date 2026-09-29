import {
    type NextFunction,
    type Request,
    type Response
} from "express";

import {
    createMovie,
    getMoviesByUser,
    updateMovieService,
    deleteMovieService
} from "../services/movieService.js";

import {
    searchMovies,
    getNowPlayingMovies
} from "../services/tmdbService.js";

export async function createMovieController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.user!.userId;

        const movie = await createMovie(
            userId,
            req.body
        );

        return res.status(201).json(movie);
    } catch (error) {
        next(error);
    }
}

export async function getMoviesController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.user!.userId;

        const movies = await getMoviesByUser(userId);

        return res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}

export async function updateMovieController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.user!.userId;
        const movieId = Number(req.params.id);

        const movie = await updateMovieService(
            userId,
            movieId,
            req.body
        );

        return res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
}

export async function deleteMovieController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.user!.userId;
        const movieId = Number(req.params.id);

        await deleteMovieService(
            userId,
            movieId
        );

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}

export async function searchMoviesController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const query = req.query.query;

        if (
            typeof query !== "string" ||
            !query.trim()
        ) {
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

export async function getNowPlayingMoviesController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const movies = await getNowPlayingMovies();

        return res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}