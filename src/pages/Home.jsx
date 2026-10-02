import { useEffect, useState } from "react";
import {
  getPopularMovies
} from "../api/tmdb";

import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPopularMovies(page);

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page]);

  return (
    <main className="page-container">

      <section className="page-header">
        <p className="eyebrow">MOVIEDB</p>
        <h1>Popular Movies</h1>
        <p>
          Discover the most popular movies right now.
        </p>
      </section>

      {loading && <Loading />}

      {!loading && error && (
        <ErrorMessage message={error} />
      )}

      {!loading && !error && (
        <>
          <MovieGrid movies={movies} />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

    </main>
  );
};

export default Home;