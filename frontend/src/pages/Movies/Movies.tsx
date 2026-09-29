import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";

import {
    createMovie,
    getNowPlayingMovies,
    searchMovies
} from "../../services/movieService";

import { logoutUser } from "../../services/authService";

import type { TmdbMovie } from "../../types/movie";

function Movies() {
    const navigate = useNavigate();

    const [movies, setMovies] = useState<TmdbMovie[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingNowPlaying, setLoadingNowPlaying] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        loadNowPlayingMovies();
    }, []);

    async function loadNowPlayingMovies() {
        try {
            setLoadingNowPlaying(true);
            setError("");

            const data = await getNowPlayingMovies();

            setMovies(data.results);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load movies."
            );
        } finally {
            setLoadingNowPlaying(false);
        }
    }

    async function handleSearch(query: string) {
        try {
            setLoading(true);
            setError("");
            setIsSearching(true);

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

            showMessage("Movie added to your library.");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to add movie."
            );
        }
    }

    function showMessage(text: string) {
        setMessage(text);

        setTimeout(() => {
            setMessage("");
        }, 3000);
    }

    async function handleLogout() {
        try {
            await logoutUser();

            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            {message && (
                <div className="toast success-toast">
                    {message}
                </div>
            )}

            <header className="movies-header">
                <div>
                    <h1>Search Movies</h1>

                    <p className="movies-subtitle">
                        Find movies and add them to your library.
                    </p>
                </div>

                <div className="movies-actions">
                    <button
                        className="my-movies-button"
                        onClick={() => navigate("/library")}
                    >
                        My Library
                    </button>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <section className="search-section">
                <h2>Search movies</h2>

                <SearchBar
                    onSearch={handleSearch}
                    loading={loading}
                />
            </section>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <section className="search-results-section">
                <h2>
                    {isSearching
                        ? "Search results"
                        : "Now playing"}
                </h2>

                {loadingNowPlaying ? (
                    <p>Loading movies...</p>
                ) : (
                    <MovieList
                        movies={movies}
                        onAdd={handleAddMovie}
                    />
                )}
            </section>
        </main>
    );
}

export default Movies;