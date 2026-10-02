import MovieItem from "./MovieItem";

function MovieList({
  movies,
  totalCount,
  favoriteCount,
  favoriteIds,
  onToggleFavorite,
}) {
  return (
    <section className="movie-section" aria-label="Danh sách phim">
      <div className="movie-summary" aria-live="polite">
        <p>
          Tổng: <strong>{totalCount}</strong>
        </p>
        <p>
          Yêu thích: <strong>{favoriteCount}</strong>
        </p>
        <p>
          Đang hiển thị: <strong>{movies.length}</strong>
        </p>
      </div>
      <div>
        <div className="movie-list-heading" role="row">
          <p>Tên phim</p>
          <span>Thể loại</span>
          <span>Năm</span>
          <span>Rating</span>
          <span>Thao tác</span>
        </div>
        {movies.length ? (
          movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              isFavorite={favoriteIds.includes(movie.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <p>Không tìm thấy phim phù hợp.</p>
        )}
      </div>
    </section>
  );
}

export default MovieList;
