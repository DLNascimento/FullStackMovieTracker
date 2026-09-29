import type { TmdbMovie } from "../../types/movie";

interface MovieCardProps {
    movie: TmdbMovie;
    onAdd: (movie: TmdbMovie) => void;
}

function MovieCard({ movie, onAdd }: MovieCardProps) {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;

    return (
        <article>
            {posterUrl ? (
                <img
                    src={posterUrl}
                    alt={movie.title}
                />
            ) : (
                <div>No poster</div>
            )}

            <h3>{movie.title}</h3>

            {movie.release_date && (
                <p>{movie.release_date.slice(0, 4)}</p>
            )}

            <button onClick={() => onAdd(movie)}>
                Add to my list
            </button>
        </article>
    );
}

export default MovieCard;