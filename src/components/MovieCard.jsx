function MovieCard({ movie, onDetails }) {
    const poster =
        movie.image?.medium ||
        "https://placehold.co/300x420?text=No+Image";

    const year = movie.premiered
        ? movie.premiered.split("-")[0]
        : "Unknown";

    const rating = movie.rating?.average || "N/A";

    return (
        <div className="movie-card">
            <img
                src={poster}
                alt={movie.name}
                className="movie-poster"
            />

            <div className="movie-card-content">
                <h3>{movie.name}</h3>

                <div className="movie-info">
                    <span>⭐ {rating}</span>
                    <span>📅 {year}</span>
                </div>

                <button
                    className="details-button"
                    onClick={() => onDetails(movie)}
                >
                    See Details
                </button>
            </div>
        </div>
    );
}

export default MovieCard;