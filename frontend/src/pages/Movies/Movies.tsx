import { useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../services/movieService";
import type { TmdbMovie } from "../../types/movie";

function Movies() {
    const [movies, setMovies] = useState<TmdbMovie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

    function handleAddMovie(movie: TmdbMovie) {
        console.log("Movie selected:", movie);
    }

    return (
        <main>
            <h1>Movie Tracker</h1>

            <SearchBar
                onSearch={handleSearch}
                loading={loading}
            />

            {error && <p>{error}</p>}

            <MovieList
                movies={movies}
                onAdd={handleAddMovie}
            />
        </main>
    );
}

export default Movies;