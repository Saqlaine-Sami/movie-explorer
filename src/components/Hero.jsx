import { Link } from "react-router";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-overlay">
                <div className="hero-content">
                    <p className="hero-subtitle">
                        WELCOME TO MOVIE EXPLORER
                    </p>

                    <h1>
                        Discover Movies & TV Shows
                    </h1>

                    <p className="hero-description">
                        Explore amazing movies and TV shows, discover new
                        stories, and find information about your favorite
                        titles.
                    </p>

                    <Link to="/movies" className="primary-button">
                        Explore Now
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;