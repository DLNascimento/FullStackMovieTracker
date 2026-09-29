import type { TmdbMovie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";

interface MovieListProps {
    movies: TmdbMovie[];
    onAdd: (movie: TmdbMovie) => void;
}

function MovieList({ movies, onAdd }: MovieListProps) {
    if (movies.length === 0) {
        return <p>No movies found.</p>;
    }

    return (
        <section>
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