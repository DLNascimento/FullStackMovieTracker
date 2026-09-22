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

export async function getMoviesByUser(userId: number) {
    const movies = await prisma.movieEntry.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return movies;
}