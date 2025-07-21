const API_KEY = 'f28f489';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No movies found');
    }
    
    return {
      movies: data.Search || [],
      totalResults: parseInt(data.totalResults) || 0,
      currentPage: page
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `${BASE_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};