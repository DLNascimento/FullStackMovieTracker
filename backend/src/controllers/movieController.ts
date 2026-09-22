import {type Request, type Response, type NextFunction} from "express";
import { createMovie } from "../services/movieService.js";

export async function createMovieController(req: Request, res: Response, next: NextFunction){
    
    try {
        const {movieId, title, posterPath, status, rating, comment} = req.body;
        
        const userId = req.user?.userId;

        if(!userId){
            return res.status(401).json({ message: "Authorization required"});
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