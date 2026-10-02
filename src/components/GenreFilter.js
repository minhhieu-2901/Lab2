function GenreFilter({
  genre,
  onGenreChange,
  ratingSort,
  onRatingSortChange,
  movies,
}) {
  const genres = [...new Set(movies.map((movie) => movie.genre))].sort();

  return (
    <div className="filter-controls">
      <label className="select-control">
        <select
          value={genre}
          onChange={(event) => onGenreChange(event.target.value)}
        >
          <option value="all">Tất cả thể loại</option>
          {genres.map((movieGenre) => (
            <option key={movieGenre} value={movieGenre}>
              {movieGenre}
            </option>
          ))}
        </select>
      </label>
      <label className="select-control">
        <select
          value={ratingSort}
          onChange={(event) => onRatingSortChange(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="ascending">Rating: Low to High</option>
          <option value="descending">Rating: High to Low</option>
        </select>
      </label>
    </div>
  );
}

export default GenreFilter;
