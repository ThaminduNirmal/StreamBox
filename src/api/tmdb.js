import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const TMDB_API_KEY = 'c8ee2ea478da569138d8b55e63c4826b';

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getTrendingMovies = async () => {
  try {
    const response = await tmdbClient.get('/trending/movie/week');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await tmdbClient.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await tmdbClient.get('/movie/top_rated');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await tmdbClient.get('/movie/upcoming');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await tmdbClient.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await tmdbClient.get('/discover/movie', {
      params: { with_genres: genreId },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbClient.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await tmdbClient.get('/search/movie', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getImageUrl = (path) => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}${path}`;
};

export const getBackdropUrl = (path) => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/original${path}`;
};

