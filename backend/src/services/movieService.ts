import {prisma} from "../lib/prisma.js";
import { type createMovieDTO } from "../schemas/movieSchemas.js";

export async function createMovie(userId: number, data: createMovieDTO){

    const movie = await prisma.movieEntry.create({
       
        data: {
            userId,
            movieId: data.movieId,
            title: data.title,
            posterPath: data.posterPath,
            status: data.status,
            rating: data.rating,
            comment: data.comment
        }
    });
    return movie;
}