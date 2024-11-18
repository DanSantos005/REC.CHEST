export const fetchMovies = async (searchTerm, plot) => {
    const apiKey = 'dda5199f'; // Replace 'dda5199f' with your OMDB API key
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&plot=${plot}`;
  
    try {
      console.log('Fetching movies...');
      const response = await fetch(url);
      const data = await response.json();
      console.log('API Response:', data); // Log API response
      if (data.Response === 'True') {
        // Fetch additional details including poster URLs
        const moviesWithPosters = await Promise.all(data.Search.map(async (movie) => {
          const detailsUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=${plot}`;
          const detailsResponse = await fetch(detailsUrl);
          const detailsData = await detailsResponse.json();
          return {
            ...movie,
            posterUrl: detailsData.Poster,
            Plot: detailsData.Plot
          };
        }));
        return moviesWithPosters;
      } else {
        throw new Error(data.Error);
      }
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch movies from the API.');
    }
  };
