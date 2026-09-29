import { useState } from "react";

import type { MovieEntry, MovieStatus } from "../../types/movie";

interface MyMovieListProps {
    movies: MovieEntry[];
    onUpdate: (
        id: number,
        data: {
            status?: MovieStatus;
            rating?: number;
            comment?: string;
        }
    ) => void;
    onDelete: (id: number) => void;
}

function MyMovieList({
    movies,
    onUpdate,
    onDelete
}: MyMovieListProps) {
    if (movies.length === 0) {
        return <p>You have no movies yet.</p>;
    }

    return (
        <section>
            {movies.map((movie) => (
                <MovieItem
                    key={movie.id}
                    movie={movie}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </section>
    );
}

interface MovieItemProps {
    movie: MovieEntry;
    onUpdate: (
        id: number,
        data: {
            status?: MovieStatus;
            rating?: number;
            comment?: string;
        }
    ) => void;
    onDelete: (id: number) => void;
}

function MovieItem({
    movie,
    onUpdate,
    onDelete
}: MovieItemProps) {
    const [status, setStatus] = useState<MovieStatus>(movie.status);
    const [rating, setRating] = useState(
        movie.rating?.toString() ?? ""
    );
    const [comment, setComment] = useState(movie.comment ?? "");

    function handleSave() {
        onUpdate(movie.id, {
            status,
            rating: rating === "" ? undefined : Number(rating),
            comment: comment === "" ? undefined : comment
        });
    }

    return (
        <article>
            <h3>{movie.title}</h3>

            <label>
                Status:
                <select
                    value={status}
                    onChange={(event) =>
                        setStatus(event.target.value as MovieStatus)
                    }
                >
                    <option value="WANT_TO_WATCH">
                        Want to watch
                    </option>

                    <option value="WATCHED">
                        Watched
                    </option>
                </select>
            </label>

            <label>
                Rating:
                <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={rating}
                    onChange={(event) =>
                        setRating(event.target.value)
                    }
                />
            </label>

            <label>
                Comment:
                <input
                    type="text"
                    value={comment}
                    onChange={(event) =>
                        setComment(event.target.value)
                    }
                />
            </label>

            <button onClick={handleSave}>
                Save
            </button>

            <button onClick={() => onDelete(movie.id)}>
                Delete
            </button>
        </article>
    );
}

export default MyMovieList;