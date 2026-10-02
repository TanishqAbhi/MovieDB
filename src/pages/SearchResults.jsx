import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { searchMovies } from "../api/tmdb";

import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    const loadSearchResults = async () => {
      if (!query) {
        setMovies([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await searchMovies(query, page);

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadSearchResults();
  }, [query, page]);

  return (
    <main className="page-container">

      <section className="page-header">
        <p className="eyebrow">SEARCH</p>

        <h1>
          Results for "{query}"
        </h1>

        <p>
          Movies matching your search.
        </p>
      </section>

      {loading && <Loading />}

      {!loading && error && (
        <ErrorMessage message={error} />
      )}

      {!loading &&
        !error &&
        movies.length === 0 && (
          <div className="empty-state">
            <h2>No movies found</h2>
            <p>
              Try searching with a different movie name.
            </p>
          </div>
        )}

      {!loading && !error && movies.length > 0 && (
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

export default SearchResults;