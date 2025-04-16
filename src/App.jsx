import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Container from "./components/Container/Container";
import Navigation from "./components/Navigation/Navigation";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviePage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieReviews = lazy(() =>
  import("./components/MovieRewies/MovieRewies")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage")
);

function App() {
  return (
    <>
      <Container>
        <Navigation />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
