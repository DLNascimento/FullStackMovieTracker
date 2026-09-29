import { useEffect, useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import {
    createMovie,
    getMovies,
    searchMovies
} from "../../services/movieService";
import type {
    MovieEntry,
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
            ) : myMovies.length === 0 ? (
                <p>You have no movies yet.</p>
            ) : (
                <div>
                    {myMovies.map((movie) => (
                        <article key={movie.id}>
                            <h3>{movie.title}</h3>

                            <p>Status: {movie.status}</p>

                            {movie.rating !== null && (
                                <p>Rating: {movie.rating}</p>
                            )}

                            {movie.comment && (
                                <p>Comment: {movie.comment}</p>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Movies;