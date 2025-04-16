import s from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { filmsFetcher } from "../../api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await filmsFetcher();
        setMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    getMovies();
  }, []);

  return (
    <>
      <h1 className={s.header}>Trending today</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
