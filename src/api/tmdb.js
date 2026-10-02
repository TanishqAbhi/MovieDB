const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movie data");
  }

  return response.json();
};

export const getPopularMovies = async (page = 1) => {
  const url =
    `${BASE_URL}/movie/popular` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&page=${page}`;

  return fetchData(url);
};

export const getTopRatedMovies = async (page = 1) => {
  const url =
    `${BASE_URL}/movie/top_rated` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&page=${page}`;

  return fetchData(url);
};

export const getUpcomingMovies = async (page = 1) => {
  const url =
    `${BASE_URL}/movie/upcoming` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&page=${page}`;

  return fetchData(url);
};

export const searchMovies = async (query, page = 1) => {
  const url =
    `${BASE_URL}/search/movie` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&query=${encodeURIComponent(query)}` +
    `&page=${page}`;

  return fetchData(url);
};

export const getMovieDetails = async (movieId) => {
  const url =
    `${BASE_URL}/movie/${movieId}` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&append_to_response=credits`;

  return fetchData(url);
};