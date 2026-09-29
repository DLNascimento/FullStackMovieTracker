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
        <article className="movie-card">
            <div className="movie-card-poster">
                {posterUrl ? (
                    <img
                        src={posterUrl}
                        alt={movie.title}
                    />
                ) : (
                    <div className="no-poster">
                        No poster
                    </div>
                )}
            </div>

            <div className="movie-card-content">
                <h3>{movie.title}</h3>

                {movie.release_date && (
                    <p className="movie-year">
                        {movie.release_date.slice(0, 4)}
                    </p>
                )}

                {movie.overview && (
                    <p className="movie-overview">
                        {movie.overview}
                    </p>
                )}

                <button
                    className="add-movie-button"
                    onClick={() => onAdd(movie)}
                >
                    Add to my list
                </button>
            </div>
        </article>
    );
}

export default MovieCard;