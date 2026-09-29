import { useEffect, useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import MyMovieList from "../../components/MyMovieList/MyMovieList";

import {
    createMovie,
    deleteMovie,
    getMovies,
    searchMovies,
    updateMovie
} from "../../services/movieService";

import type {
    MovieEntry,
    MovieStatus,
    TmdbMovie
} from "../../types/movie";

function Movies() {
    const [movies, setMovies] = useState<TmdbMovie[]>([]);
    const [myMovies, setMyMovies] = useState<MovieEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingList, setLoadingList] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadMyMovies();
    }, []);

    async function loadMyMovies() {
        try {
            setLoadingList(true);

            const data = await getMovies();

            setMyMovies(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingList(false);
        }
    }

    async function handleSearch(query: string) {
        try {
            setLoading(true);
            setError("");

            const data = await searchMovies(query);

            setMovies(data.results);
        } catch {
            setError("Failed to search movies.");
        } finally {
            setLoading(false);
        }
    }

    async function handleAddMovie(movie: TmdbMovie) {
        try {
            setError("");

            await createMovie({
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                status: "WANT_TO_WATCH"
            });

            await loadMyMovies();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to add movie."
            );
        }
    }

    async function handleUpdateMovie(
        id: number,
        data: {
            status?: MovieStatus;
            rating?: number;
            comment?: string;
        }
    ) {
        try {
            setError("");

            await updateMovie(id, data);

            await loadMyMovies();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to update movie."
            );
        }
    }

    async function handleDeleteMovie(id: number) {
        try {
            setError("");

            await deleteMovie(id);

            await loadMyMovies();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete movie."
            );
        }
    }

    return (
        <main>
            <h1>Movie Tracker</h1>

            <SearchBar
                onSearch={handleSearch}
                loading={loading}
            />

            {error && <p>{error}</p>}

            <h2>Search results</h2>

            <MovieList
                movies={movies}
                onAdd={handleAddMovie}
            />

            <h2>My movies</h2>

            {loadingList ? (
                <p>Loading your movies...</p>
            ) : (
                <MyMovieList
                    movies={myMovies}
                    onUpdate={handleUpdateMovie}
                    onDelete={handleDeleteMovie}
                />
            )}
        </main>
    );
}

export default Movies;