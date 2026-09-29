export type MovieStatus = "WANT_TO_WATCH" | "WATCHED";

export interface TmdbMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
}

export interface MovieEntry {
    id: number;
    userId: number;
    movieId: number;
    title: string;
    posterPath: string | null;
    status: MovieStatus;
    rating: number | null;
    comment: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface TmdbSearchResponse {
    page: number;
    results: TmdbMovie[];
    total_pages: number;
    total_results: number;
}