import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/top-rated"
          element={<TopRated />}
        />

        <Route
          path="/upcoming"
          element={<Upcoming />}
        />

        <Route
          path="/search"
          element={<SearchResults />}
        />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;