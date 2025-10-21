import { useState, useEffect } from 'react';
import { fetchAllShows, searchShows } from '../utils/api';

const useFetchMovies = (searchQuery = '') => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data;
        
        if (searchQuery) {
          data = await searchShows(searchQuery);
        } else {
          data = await fetchAllShows();
        }
        
        setMovies(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        console.error('Error in useFetchMovies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  return { movies, loading, error };
};

export default useFetchMovies;