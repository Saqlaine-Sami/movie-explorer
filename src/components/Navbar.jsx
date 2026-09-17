import { Link } from "react-router";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                🎬 MovieExplorer
            </Link>

            <div className="nav-links">
                <Link to="/">Home</Link>

                <Link to="/movies" className="movies-link">
                    Movies
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;