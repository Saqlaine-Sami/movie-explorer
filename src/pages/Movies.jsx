import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import Footer from "../components/Footer";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [error, setError] = useState("");

    const debounceRef = useRef(null);

    // Load all shows when page opens
    useEffect(() => {
        fetchAllMovies();

        // Clear timeout when component unmounts
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    // Fetch all movies/shows
    const fetchAllMovies = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "https://api.tvmaze.com/shows"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }

            const data = await response.json();

            setMovies(data.slice(0, 60));
        } catch (error) {
            console.error("Failed to fetch movies:", error);

            setError(
                "Unable to load movies. Please try again."
            );

            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    // Actually perform the search
    const runSearch = async (value) => {
        if (value.trim() === "") {
            fetchAllMovies();
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(
                    value
                )}`
            );

            if (!response.ok) {
                throw new Error("Search request failed");
            }

            const data = await response.json();

            const searchResults = data.map(
                (item) => item.show
            );

            setMovies(searchResults);
        } catch (error) {
            console.error("Search failed:", error);

            setError(
                "Something went wrong while searching."
            );

            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search
    const handleSearch = (event) => {
        const value = event.target.value;

        setSearch(value);

        // Cancel previous timer
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Wait 400ms after user stops typing
        debounceRef.current = setTimeout(() => {
            runSearch(value);
        }, 400);
    };

    return (
        <>
            <Navbar />

            <main className="movies-page">

                {/* Header */}
                <div className="movies-header">
                    <p className="section-label">
                        EXPLORE
                    </p>

                    <h1>
                        Discover Movies & Shows
                    </h1>

                    <p>
                        Search and explore your favorite movies and TV shows.
                    </p>
                </div>

                {/* Search */}
                <div className="search-container">
                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                {/* Movies */}
                {loading ? (
                    <p className="status-message">
                        Loading movies...
                    </p>
                ) : error ? (
                    <p className="status-message error-message">
                        {error}
                    </p>
                ) : movies.length === 0 ? (
                    <p className="status-message">
                        No movies found.
                    </p>
                ) : (
                    <div className="movie-grid">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onDetails={() =>
                                    setSelectedMovie(movie)
                                }
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Movie Details Modal */}
            <MovieModal
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />

            <Footer />
        </>
    );
}

export default Movies;