import { Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import Navbar from './components/Navbar'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'
import MovieDetails from './pages/MovieDetails.jsx'

const App = () => {
  return (
    <FavoritesProvider>
      <div>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>
    </FavoritesProvider>
  )
}

export default App