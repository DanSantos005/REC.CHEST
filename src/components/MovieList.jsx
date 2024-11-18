import PropTypes from 'prop-types';

function MovieList({ movies, onSelectMovie, error }) {
  return (
    <>
      {error && <p className="error-message">{error}</p>}
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="movie-card">
            <img src={movie.posterUrl} alt={movie.Title} className="movie-poster" />
            <div className="movie-details">
              <p className="movie-title">{movie.Title}</p>
              <div className='view-details-container'>
              <button
                className="view-details-btn"
                onClick={() => onSelectMovie(movie)}
              >
                View Details
              </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default MovieList;

