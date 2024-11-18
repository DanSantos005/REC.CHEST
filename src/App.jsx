import { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import { fetchMovies } from './utils/api';

import './styles.css'; // Import custom CSS styles

function App() {
  const [movies, setMovies] = useState([]); //holds an array of movie data retrieved from te API
  const [selectedMovie, setSelectedMovie] = useState(null); //represents the currently selected movie
  const [error, setError] = useState(null); //stores any error message that occurs during API calls
  const [isLoading, setIsLoading] = useState(false); //indicates if the data is being loaded
  const [searchTerm, setSearchTerm] = useState(''); //stores the search term entered by the user

  const handleSearch = () => {
    setIsLoading(true);
    setMovies([]);
    setError(null);
    fetchMovies(searchTerm)
      .then((data) => {
        if (data && data.length > 0) {
          setMovies(data);
        } else {
          setError('No movies found. Please try a different search term.');
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
        setError('Please type in a title or part of it before clicking search.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleMovieSelect = (movie) => {  //sets the selected movie when a user clicks on a movie from the list
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => { //clears the selected movie when user closes the movie details view
    setSelectedMovie(null);
  };

  useEffect(() => {
    // Reset movie list and error message when searchTerm changes or emptied
    setMovies([]);
    setError(null);
  }, [searchTerm]);

  return (
    <div className="container">
      <div className="header">
        <h1>REC.CHEST</h1>
        <p>Find the movies, series or videogames information you are looking for!</p>
        {!selectedMovie && (
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter movie title..."
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        )}
      </div>
      {isLoading ? ( 
        <p>Loading...</p> //if isLoading is true, a loading message is displayed
      ) : error ? (
        <p>Error: {error}</p>
      ) : selectedMovie && !Array.isArray(selectedMovie) ? (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      ) : searchTerm !== '' ? (
          <MovieList movies={movies} onSelectMovie={handleMovieSelect} error={error} />
      ) : null}
    </div>
  );
}

export default App;
