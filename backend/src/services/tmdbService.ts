const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_HEADERS = {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
};

export async function searchMovies(query: string) {
    const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=pt-BR`,
        {
            headers: TMDB_HEADERS
        }
    );

    if (!response.ok) {
        throw new Error("Failed to search movies on TMDB");
    }

    const data = await response.json();

    return data;
}

export async function getNowPlayingMovies() {
    const response = await fetch(
        `${TMDB_BASE_URL}/movie/now_playing?language=pt-BR`,
        {
            headers: TMDB_HEADERS
        }
    );

    if (!response.ok) {
        throw new Error("Failed to get now playing movies from TMDB");
    }

    const data = await response.json();

    return data;
}