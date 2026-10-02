import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  getMovieDetails,
  IMAGE_BASE_URL
} from "../api/tmdb";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);

        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movie) {
    return null;
  }

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const backdrop = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : poster;

  return (
    <main className="details-page">

      <section
        className="movie-hero"
        style={{
          backgroundImage: `url(${backdrop})`
        }}
      >
        <div className="hero-overlay">

          <div className="details-container">

            <img
              src={poster}
              alt={movie.title}
              className="details-poster"
            />

            <div className="details-content">

              <Link
                to="/"
                className="back-link"
              >
                ← Back to movies
              </Link>

              <h1>{movie.title}</h1>

              <div className="movie-meta">

                <span className="rating">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>

                <span>
                  {movie.runtime
                    ? `${movie.runtime} min`
                    : "Runtime N/A"}
                </span>

                <span>
                  {movie.release_date || "Release date N/A"}
                </span>

              </div>

              <div className="genres">
                {movie.genres?.map((genre) => (
                  <span key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>

              <h2>Overview</h2>

              <p className="overview">
                {movie.overview ||
                  "No overview available."}
              </p>

            </div>

          </div>

        </div>
      </section>

      <section className="cast-section">

        <div className="details-container">

          <h2>Cast</h2>

          <div className="cast-grid">

            {movie.credits?.cast
              ?.slice(0, 10)
              .map((person) => {

                const profileImage =
                  person.profile_path
                    ? `${IMAGE_BASE_URL}${person.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image";

                return (
                  <div
                    className="cast-card"
                    key={`${person.id}-${person.credit_id}`}
                  >
                    <img
                      src={profileImage}
                      alt={person.name}
                    />

                    <h3>{person.name}</h3>

                    <p>
                      {person.character || "Unknown role"}
                    </p>
                  </div>
                );
              })}

          </div>

        </div>

      </section>

    </main>
  );
};

export default MovieDetails;