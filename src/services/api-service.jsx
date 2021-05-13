import axios from 'axios';
const API_KEY = '82ebb55e4d1a1877b6dae0db2ea1f68e';
axios.defaults.baseURL = 'https://api.themoviedb.org/';

function getTrendingMovies() {
  const pageUrl = `3/trending/all/day?api_key=${API_KEY}`;
  return fetchData(pageUrl);
}

function getMoviesByName(query) {
  const pageUrl = `3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`;
  return fetchData(pageUrl);
}

function getMovieDetails(movieId) {
  const pageUrl = `3/movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1`;
  return fetchData(pageUrl);
}

function getMovieCredits(movieId) {
  const pageUrl = `3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
  return fetchData(pageUrl);
}

function getMovieReviews(movieId) {
  const pageUrl = `3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;

  return fetchData(pageUrl);
}

function fetchData(pageUrl) {
  return axios.get(pageUrl).then(response => response.data);
}

export default {
  getTrendingMovies,
  getMoviesByName,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
};
