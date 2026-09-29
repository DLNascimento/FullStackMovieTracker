import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyMovieList from "../../components/MyMovieList/MyMovieList";

import {
    deleteMovie,
    getMovies,
    updateMovie
} from "../../services/movieService";

import { logoutUser } from "../../services/authService";

import type {
    MovieEntry,
    MovieStatus
} from "../../types/movie";

function Library() {
    const navigate = useNavigate();

    const [myMovies, setMyMovies] = useState<MovieEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadMyMovies();
    }, []);

    async function loadMyMovies() {
        try {
            setLoading(true);
            setError("");

            const data = await getMovies();

            setMyMovies(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load your movies."
            );
        } finally {
            setLoading(false);
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

            showMessage("Movie updated successfully.");
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

            showMessage("Movie removed from your library.");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete movie."
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

            <header className="library-header">
                <div>
                    <h1>My Library</h1>

                    <p className="movies-subtitle">
                        Manage the movies you have saved.
                    </p>
                </div>

                <div className="movies-actions">
                    <button
                        className="search-page-button"
                        onClick={() => navigate("/movies")}
                    >
                        Search movies
                    </button>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </header>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {loading ? (
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

export default Library;