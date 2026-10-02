import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    setQuery("");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <NavLink to="/" className="logo">
          Movie<span>DB</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end>
            Popular
          </NavLink>

          <NavLink to="/top-rated">
            Top Rated
          </NavLink>

          <NavLink to="/upcoming">
            Upcoming
          </NavLink>
        </nav>

        <form
          className="search-form"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Movie name..."
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />

          <button type="submit">
            Search
          </button>
        </form>

      </div>
    </header>
  );
};

export default Navbar;