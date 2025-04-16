import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { searchFilmFetcher } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const MoviesPage = () => {
  const [searchedFilm, setSearchedFilm] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchFilms = async () => {
      try {
        setLoading(true);
        const results = await searchFilmFetcher(query);
        setSearchedFilm(results.data.results);
      } catch (error) {
        console.log("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [query]);
  const handleSearchBarSubmit = ({ query }) => {
    if (!query) return;
    setSearchParams({ query });
  };

  return (
    <div>
      {loading && <Loader />}

      <SearchBar onSubmit={handleSearchBarSubmit} />
      {!loading && query && searchedFilm.length === 0 && <NotFoundPage />}
      <MovieList movies={searchedFilm} />
    </div>
  );
};

export default MoviesPage;
