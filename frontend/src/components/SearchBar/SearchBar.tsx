import { useState, type FormEvent } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    loading?: boolean;
}

function SearchBar({ onSearch, loading = false }: SearchBarProps) {
    const [query, setQuery] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            return;
        }

        onSearch(trimmedQuery);
    }

    return (
        <form
            className="search-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Searching..." : "Search"}
            </button>
        </form>
    );
}

export default SearchBar;