import { useState, useEffect, useCallback } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  
  // Load favorites from localStorage on initial render
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem('movieFavorites');
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          setFavorites(parsedFavorites);
          console.log('Loaded favorites:', parsedFavorites);
        }
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        localStorage.removeItem('movieFavorites');
      }
    };
    
    loadFavorites();
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('movieFavorites', JSON.stringify(favorites));
      console.log('Saved favorites to localStorage:', favorites);
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const addFavorite = useCallback((movie) => {
    if (!movie || !movie.id) {
      console.error('Attempted to add invalid movie to favorites:', movie);
      return;
    }
    
    setFavorites((prevFavorites) => {
      // Check if movie is already in favorites
      if (prevFavorites.some((fav) => fav.id === movie.id)) {
        console.log('Movie already in favorites:', movie.id);
        return prevFavorites;
      }
      
      // Create a clean movie object with only the necessary properties
      const favoriteMovie = {
        id: movie.id,
        name: movie.name || 'Unknown Title',
        image: movie.image || null,
        genres: movie.genres || [],
        rating: movie.rating || { average: 'N/A' },
        premiered: movie.premiered || 'Unknown',
        status: movie.status || 'Unknown',
        summary: movie.summary || ''
      };
      
      console.log('Adding movie to favorites:', favoriteMovie);
      return [...prevFavorites, favoriteMovie];
    });
  }, []);

  const removeFavorite = useCallback((movieId) => {
    console.log('Removing movie from favorites:', movieId);
    setFavorites((prevFavorites) => 
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  }, []);

  const isFavorite = useCallback((movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavorites;