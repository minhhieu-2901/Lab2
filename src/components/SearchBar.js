function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <label className="search-control">
      <input
        type="search"
        placeholder="Tìm tên phim ..."
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
