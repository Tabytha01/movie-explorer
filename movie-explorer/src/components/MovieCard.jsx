import { Link } from 'react-router-dom';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  // Handle missing image
  const imageUrl = movie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/movie/${movie.id}`}>
        <img 
          src={imageUrl} 
          alt={movie.name} 
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">{movie.name}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {movie.genres?.slice(0, 2).join(', ') || 'Unknown genre'}
          </span>
          <button
            onClick={() => onToggleFavorite(movie)}
            className={`p-2 rounded-full ${
              isFavorite ? 'text-red-500' : 'text-gray-400'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;