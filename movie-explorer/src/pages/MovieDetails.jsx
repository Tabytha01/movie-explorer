import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchShowById } from '../utils/api';
import { useFavoritesContext } from '../context/FavoritesContext';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchShowById(id);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  // Function to safely render HTML content from API
  const createMarkup = (html) => {
    return { __html: html };
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading movie details...</div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">
          {error || 'Movie not found'}
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={movie.image?.original || 'https://via.placeholder.com/500x750?text=No+Image'}
              alt={movie.name}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-2">{movie.name}</h1>
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full ${
                  isFavorite(movie.id) ? 'text-red-500' : 'text-gray-400'
                }`}
                aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill={isFavorite(movie.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map(genre => (
                  <span key={genre} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {genre}
                  </span>
                ))}
              </div>
            )}
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{movie.rating?.average || 'N/A'}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Premiered: {movie.premiered || 'Unknown'}</p>
                <p>Status: {movie.status || 'Unknown'}</p>
                {movie.network && <p>Network: {movie.network.name}</p>}
              </div>
            </div>
            
            {movie.summary && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Summary</h2>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={createMarkup(movie.summary)}
                />
              </div>
            )}
            
            <div className="mt-6">
              <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Back to Movies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;