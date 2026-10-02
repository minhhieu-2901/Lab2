import { memo } from "react";

function MovieItem({ movie, isFavorite, onToggleFavorite }) {
  const showDetails = () => {
    window.alert(
      [
        `Title: ${movie.title}`,
        `Genre: ${movie.genre}`,
        `Year: ${movie.year}`,
        `Rating: ${movie.rating}`,
        `Director: ${movie.director}`,
        `Duration: ${movie.duration} minutes`,
        `Description: ${movie.description}`,
      ].join("\n"),
    );
  };

  return (
    <article className="movie-row">
      <h3>{movie.title}</h3>
      <span>{movie.genre}</span>
      <span>{movie.year}</span>
      <span>{movie.rating.toFixed(1)}</span>
      <div>
        <button
          type="button"
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(movie.id)}
        >
          {isFavorite ? "Bỏ thích" : "Yêu thích"}
        </button>
        <button type="button" onClick={showDetails}>
          Chi tiết
        </button>
      </div>
    </article>
  );
}

export default memo(MovieItem);
