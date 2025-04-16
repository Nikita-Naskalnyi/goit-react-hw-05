import axios from "axios";

const apiKey = "f75be672198aaec46810353f13f267e9";
const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

const options = {
  headers: {
    accept: "application/json",
  },
};

export const filmsFetcher = async () => {
  return await axios.get(url, options);
};

export const oneFilmFetcher = async (filmId) => {
  return await axios.get(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=${apiKey}`,
    options
  );
};

export const searchFilmFetcher = async (query) => {
  return await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`,
    options
  );
};

export const castFetcher = async (filmId) => {
  return await axios.get(
    `https://api.themoviedb.org/3/movie/${filmId}/credits?language=en-US&api_key=${apiKey}`,
    options
  );
};

export const reviewsFetcher = async (filmId) => {
  return await axios.get(
    `https://api.themoviedb.org/3/movie/${filmId}/reviews?language=en-US&page=1&api_key=${apiKey}`,
    options
  );
};
