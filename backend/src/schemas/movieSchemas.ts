import {z} from "zod";

export const createMovieSchema = z.object({
    movieId: z.number().int().positive(),
    title: z.string().min(1),
    posterPath: z.string().optional(),
    status: z.enum(["WANT_TO_WATCH", "WATCHED"]),
    rating: z.number().min(0).max(10).optional(),
    comment: z.string().optional()
});

export type createMovieDTO = z.infer<typeof createMovieSchema>

export const updateMovieSchema = z.object({
    status: z.enum(["WANT_TO_WATCH", "WATCHED"]).optional(),
    rating: z.number().min(0).max(10).optional(),
    comment: z.string().optional()
});

export type UpdateMovieDTO = z.infer<typeof updateMovieSchema>;