import PropTypes from 'prop-types';

function MovieDetails({ movie, onClose }) {
  return (
    <div className="movie-details">
      <div className="movie-poster-container">
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
        <div className="movie-info">
          <h1 className="movie-title">{movie.Title}</h1>
          <p>{movie.Year}</p>
          <p>{movie.Plot}</p>
          <p>Type: {movie.Type}</p>
          <button onClick={onClose} className="close-btn">Close</button>
        </div>
      </div>  
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Plot: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieDetails;