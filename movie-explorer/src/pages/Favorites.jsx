import { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import CategoryFilter from '../components/CategoryFilter';
import { useFavoritesContext } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavoritesContext();
  const [selectedCategory, setSelectedCategory] = useState('');

  // Extract unique categories from favorite movies
  const categories = [...new Set(favorites.flatMap(movie => movie.genres || []))];

  // Filter favorites by category if selected
  const filteredFavorites = selectedCategory
    ? favorites.filter(movie => movie.genres?.includes(selectedCategory))
    : favorites;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
      <button className='bg-gray-900 text-white '><a href='Home.jsx'>Back Home</a></button>

      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">You have no favorite movies yet</p>
          <p className="mt-2">Go to the <Link to="/" className="text-blue-600 hover:underline">home page</Link> and add some movies to your favorites</p>
        </div>
      ) : (
        <>
          {categories.length > 0 && (
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          )}

          {filteredFavorites.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">No favorites in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFavorites.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;