import { error } from "node:console";
import {prisma} from "../lib/prisma.js";
import { type createMovieDTO, type UpdateMovieDTO, type updateMovieSchema } from "../schemas/movieSchemas.js";

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

export async function updateMovieService(userId: number, movieEntryId: number, data: UpdateMovieDTO){

    const movie = await prisma.movieEntry.findFirst({
        where: {id: movieEntryId, userId}
    });

    if(!movie){
        throw new Error("Movie not found");
    }

    return prisma.movieEntry.update({
        where: { id: movieEntryId },
        data
    });

}

export async function deleteMovieService(userId: number, movieEntryId: number){

    const movie = await prisma.movieEntry.findFirst({
        where:{
            id: movieEntryId,
            userId
        }
    });

    if(!movie){
        throw new Error("Movie not found!");
    }

    await prisma.movieEntry.delete({
        where: {id: movieEntryId}
    });
}