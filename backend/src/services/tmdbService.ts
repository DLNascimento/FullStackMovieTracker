const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query: string) {
    const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=pt-BR`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to search movies on TMDB");
    }

    const data = await response.json();

    return data;
}