import type { TmdbMovie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";

interface MovieListProps {
    movies: TmdbMovie[];
    onAdd: (movie: TmdbMovie) => void;
}

function MovieList({ movies, onAdd }: MovieListProps) {
    if (movies.length === 0) {
        return <p className="empty-message">No movies found.</p>;
    }

    return (
        <section className="movie-search-results">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onAdd={onAdd}
                />
            ))}
        </section>
    );
}

export default MovieList;