import { useContext, useMemo, useState } from "react";
import "./App.css";
import GenreFilter from "./components/GenreFilter";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import ThemeContext, { ThemeProvider } from "./context/ThemeContext";
import { movies } from "./data/movies";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  return (
    <ThemeProvider>
      <MovieApp />
    </ThemeProvider>
  );
}

function MovieApp() {
  const { darkMode } = useContext(ThemeContext);
  const [favoriteMovies, setFavoriteMovies] = useLocalStorage(
    "favoriteMovies",
    [],
  );
  const favoriteIds = favoriteMovies.map((movie) =>
    typeof movie === "number" ? movie : movie.id,
  );
  const [genreFilter, setGenreFilter] = useState("all");
  const [ratingSort, setRatingSort] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleMovies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filteredMovies = movies.filter(
      (movie) =>
        (genreFilter === "all" || movie.genre === genreFilter) &&
        movie.title.toLowerCase().includes(query),
    );

    if (ratingSort === "ascending") {
      return [...filteredMovies].sort(
        (first, second) => first.rating - second.rating,
      );
    }
    if (ratingSort === "descending") {
      return [...filteredMovies].sort(
        (first, second) => second.rating - first.rating,
      );
    }
    return filteredMovies;
  }, [genreFilter, ratingSort, searchQuery]);

  const toggleFavorite = (movieId) => {
    const selectedMovie = movies.find((movie) => movie.id === movieId);

    setFavoriteMovies((currentMovies) => {
      const normalizedMovies = currentMovies
        .map((movie) =>
          typeof movie === "number"
            ? movies.find((item) => item.id === movie)
            : movie,
        )
        .filter(Boolean);

      return normalizedMovies.some((movie) => movie.id === movieId)
        ? normalizedMovies.filter((movie) => movie.id !== movieId)
        : [...normalizedMovies, selectedMovie];
    });
  };

  return (
    <div className={`app-shell ${darkMode ? "theme-dark" : "theme-light"}`}>
      <Header />
      <main className="content-wrap">
        <section className="toolbar">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <GenreFilter
            genre={genreFilter}
            onGenreChange={setGenreFilter}
            ratingSort={ratingSort}
            onRatingSortChange={setRatingSort}
            movies={movies}
          />
        </section>
        <MovieList
          movies={visibleMovies}
          totalCount={movies.length}
          favoriteCount={favoriteMovies.length}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      </main>
    </div>
  );
}

export default App;
