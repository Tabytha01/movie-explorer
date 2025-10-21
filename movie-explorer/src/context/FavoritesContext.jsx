import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('movieFavorites');
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
        console.log('Loaded favorites from localStorage:', parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      localStorage.removeItem('movieFavorites');
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('movieFavorites', JSON.stringify(favorites));
        console.log('Saved favorites to localStorage:', favorites);
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = (movie) => {
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
  };

  const removeFavorite = (movieId) => {
    console.log('Removing movie from favorites:', movieId);
    setFavorites((prevFavorites) => 
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};