import { apiFetch } from "./api";

import type {
    MovieEntry,
    MovieStatus,
    TmdbSearchResponse
} from "../types/movie";

interface CreateMovieData {
    movieId: number;
    title: string;
    posterPath: string | null;
    status: MovieStatus;
    rating?: number;
    comment?: string;
}

interface UpdateMovieData {
    status?: MovieStatus;
    rating?: number;
    comment?: string;
}

export async function searchMovies(
    query: string
): Promise<TmdbSearchResponse> {
    return apiFetch(
        `/movies/search?query=${encodeURIComponent(query)}`
    );
}

export async function getNowPlayingMovies(): Promise<TmdbSearchResponse> {
    return apiFetch("/movies/now-playing");
}

export async function getMovies(): Promise<MovieEntry[]> {
    return apiFetch("/movies");
}

export async function createMovie(
    data: CreateMovieData
): Promise<MovieEntry> {
    return apiFetch("/movies", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function updateMovie(
    id: number,
    data: UpdateMovieData
): Promise<MovieEntry> {
    return apiFetch(`/movies/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    });
}

export async function deleteMovie(
    id: number
): Promise<void> {
    await apiFetch(`/movies/${id}`, {
        method: "DELETE"
    });
}