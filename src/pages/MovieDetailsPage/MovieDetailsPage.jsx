import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { oneFilmFetcher } from "../../api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const goBackLink = useRef(location.state?.from || "/movies");

  const addActive = ({ isActive }) => (isActive ? s.active : s.link);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movie = await oneFilmFetcher(movieId);
        setFilm(movie.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (!film) return <p>Movie not found.</p>;
  const releaseYear = new Date(film.release_date).getFullYear();
  const userScore = Math.ceil(film.vote_average);
  return (
    <>
      <Link className={s.linkBack} to={goBackLink.current}>
        Go back
      </Link>
      <div className={s.containerDetails}>
        <img
          className={s.poster}
          src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
          alt={film.title}
        />
        <div className={s.description}>
          <h1 className={s.header}>
            {film.title}({releaseYear})
          </h1>

          <p className={s.descriptiontext}>Rating: {userScore} / 10</p>
          <p className={s.descriptiontext}>
            <strong>Overview:</strong> {film.overview}
          </p>
        </div>
      </div>
      <nav className={s.navigation}>
        <NavLink className={addActive} to="cast">
          Cast
        </NavLink>
        <NavLink className={addActive} to="reviews">
          Reviews
        </NavLink>
      </nav>
      {loading && <Loader />}
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
