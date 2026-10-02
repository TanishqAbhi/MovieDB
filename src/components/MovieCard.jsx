import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../api/tmdb";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-image-container">
        <img
          src={imageUrl}
          alt={movie.title}
          className="movie-poster"
        />

        <div className="movie-rating">
          ⭐ {movie.vote_average?.toFixed(1)}
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>
          {movie.release_date
            ? movie.release_date.substring(0, 4)
            : "N/A"}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;