function MovieModal({ movie, onClose }) {
    // No movie selected হলে modal দেখাবে না
    if (!movie) {
        return null;
    }

    const image =
        movie.image?.original ||
        movie.image?.medium ||
        "https://placehold.co/500x700?text=No+Image";

    const rating = movie.rating?.average || "N/A";

    const releaseDate = movie.premiered || "Unknown";

    const genres =
        movie.genres && movie.genres.length > 0
            ? movie.genres.join(", ")
            : "Unknown";

    const summary = movie.summary
        ? movie.summary.replace(/<[^>]*>/g, "")
        : "No description available.";

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <div className="modal-content">
                    {/* Movie Image */}
                    <img
                        src={image}
                        alt={movie.name}
                        className="modal-image"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://placehold.co/500x700?text=No+Image";
                        }}
                    />

                    {/* Movie Information */}
                    <div className="modal-details">
                        <h2>{movie.name}</h2>

                        <div className="modal-meta">
                            <span>⭐ Rating: {rating}</span>

                            <span>
                                📅 Release: {releaseDate}
                            </span>
                        </div>

                        <p>
                            <strong>Genres:</strong> {genres}
                        </p>

                        <p>
                            <strong>Language:</strong>{" "}
                            {movie.language || "Unknown"}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {movie.status || "Unknown"}
                        </p>

                        <h3>Overview</h3>

                        <p>{summary}</p>

                        <button
                            className="close-button"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;