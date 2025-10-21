import { useState, useEffect } from 'react';
import useFetchMovies from '../hooks/useFetchMovies';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const { movies, loading, error } = useFetchMovies(searchQuery);

  // Extract unique categories from movies
  useEffect(() => {
    if (movies.length > 0) {
      const allGenres = movies.flatMap(movie => movie.genres || []);
      const uniqueGenres = [...new Set(allGenres)];
      setCategories(uniqueGenres);
    }
  }, [movies]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory('');
  };

  // Filter movies by category if selected
  const filteredMovies = selectedCategory
    ? movies.filter(movie => movie.genres?.includes(selectedCategory))
    : movies;

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar onSearch={handleSearch} />
      
      {categories.length > 0 && (
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading movies...</div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No movies found</p>
          {searchQuery && (
            <p className="mt-2">Try a different search term or clear filters</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;