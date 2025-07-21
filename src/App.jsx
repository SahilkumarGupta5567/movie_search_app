import React from 'react';
import { useState, useEffect } from 'react';
import { Film, Heart, Search as SearchIcon, TrendingUp, Filter, Grid, List, Star, Sparkles, Play, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import FavoritesSection from './components/FavoritesSection';
import MovieModal from './components/MovieModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import FilterBar from './components/FilterBar';
import TrendingSection from './components/TrendingSection';
import StatsCard from './components/StatsCard';
import useLocalStorage from './hooks/useLocalStorage';
import { searchMovies } from './services/omdbApi';

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useLocalStorage('movieFavorites', []);
  const [watchlist, setWatchlist] = useLocalStorage('movieWatchlist', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Load trending movies on initial load
  useEffect(() => {
    handleSearch('avengers', 1, true);
  }, []);

  const handleSearch = async (query, page = 1, isInitial = false) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    if (!isInitial) {
      setSearchQuery(query);
      setHasSearched(true);
    }
    setCurrentPage(page);
    
    try {
      const result = await searchMovies(query, page);
      if (page === 1) {
        setMovies(result.movies);
      } else {
        setMovies(prev => [...prev, ...result.movies]);
      }
      setTotalResults(result.totalResults);
      setActiveTab('search');
    } catch (err) {
      setError(err.message);
      if (page === 1) {
        setMovies([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (searchQuery && currentPage * 10 < totalResults) {
      handleSearch(searchQuery, currentPage + 1);
    }
  };

  const handleToggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.imdbID === movie.imdbID);
      
      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav.imdbID !== movie.imdbID);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const handleToggleWatchlist = (movie) => {
    setWatchlist(prevWatchlist => {
      const isAlreadyInWatchlist = prevWatchlist.some(item => item.imdbID === movie.imdbID);
      
      if (isAlreadyInWatchlist) {
        return prevWatchlist.filter(item => item.imdbID !== movie.imdbID);
      } else {
        return [...prevWatchlist, movie];
      }
    });
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      setFavorites([]);
    }
  };

  const handleClearWatchlist = () => {
    if (window.confirm('Are you sure you want to clear your watchlist?')) {
      setWatchlist([]);
    }
  };

  const isFavorite = (movie) => {
    return favorites.some(fav => fav.imdbID === movie.imdbID);
  };

  const isInWatchlist = (movie) => {
    return watchlist.some(item => item.imdbID === movie.imdbID);
  };

  const getFilteredMovies = () => {
    let filtered = movies;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(movie => movie.Type === filterType);
    }
    
    // Sort movies
    if (sortBy === 'year') {
      filtered = [...filtered].sort((a, b) => (b.Year || 0) - (a.Year || 0));
    } else if (sortBy === 'title') {
      filtered = [...filtered].sort((a, b) => a.Title.localeCompare(b.Title));
    }
    
    return filtered;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Create floating particles
  const particles = Array.from({ length: 10 }, (_, i) => (
    <div key={i} className="particle"></div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Enhanced Hero Section */}
      <header className="hero-gradient text-white shadow-2xl relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Particles */}
        <div className="hero-particles">
          {particles}
        </div>
        
        {/* Dynamic Overlay */}
        <div className="hero-overlay"></div>
        
        {/* Hero Content */}
        <div className="hero-content container mx-auto px-4 py-12 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Hero Badge */}
            <motion.div 
              className="hero-badge mb-8 mx-auto w-fit"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Sparkles size={16} />
              <span>Discover Amazing Movies</span>
            </motion.div>

            {/* Main Title with Enhanced Animation */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <motion.div
                className="floating-animation"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <div className="relative">
                  <Film size={64} className="text-white drop-shadow-2xl" />
                  <motion.div
                    className="absolute -inset-2 bg-white/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                MovieFinder
              </motion.h1>
            </div>

            {/* Enhanced Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-12"
            >
              <p className="text-2xl md:text-3xl opacity-95 max-w-4xl mx-auto leading-relaxed font-light">
                Your ultimate destination for discovering incredible movies, 
                <span className="font-semibold text-yellow-300"> building collections</span>, and 
                <span className="font-semibold text-pink-300"> never missing great films</span>
              </p>
              
              {/* Feature Highlights */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-white/90">
                  <Star size={20} className="text-yellow-400" />
                  <span className="font-medium">Rate & Review</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Heart size={20} className="text-red-400" />
                  <span className="font-medium">Save Favorites</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <TrendingUp size={20} className="text-green-400" />
                  <span className="font-medium">Track Watchlist</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Award size={20} className="text-purple-400" />
                  <span className="font-medium">Discover Trending</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-16"
          >
            <SearchBar onSearch={handleSearch} loading={loading} />
          </motion.div>
          
          {/* Enhanced Navigation Tabs */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="nav-tabs">
              <motion.button
                onClick={() => setActiveTab('search')}
                className={`nav-tab ${
                  activeTab === 'search' ? 'nav-tab-active' : 'nav-tab-inactive'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SearchIcon size={18} />
                <span>Search Results</span>
                {activeTab === 'search' && (
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('favorites')}
                className={`nav-tab ${
                  activeTab === 'favorites' ? 'nav-tab-active' : 'nav-tab-inactive'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={18} />
                <span>Favorites</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-1">
                  {favorites.length}
                </span>
                {activeTab === 'favorites' && (
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('watchlist')}
                className={`nav-tab ${
                  activeTab === 'watchlist' ? 'nav-tab-active' : 'nav-tab-inactive'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TrendingUp size={18} />
                <span>Watchlist</span>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-1">
                  {watchlist.length}
                </span>
                {activeTab === 'watchlist' && (
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Section */}
      <motion.section 
        className="container mx-auto px-4 py-8 mt-10 relative z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Favorites"
            value={favorites.length}
            icon={Heart}
            color="red"
          />
          <StatsCard
            title="Watchlist Items"
            value={watchlist.length}
            icon={TrendingUp}
            color="blue"
          />
          <StatsCard
            title="Search Results"
            value={movies.length}
            icon={SearchIcon}
            color="purple"
          />
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <AnimatePresence mode="wait">
          {activeTab === 'search' && (
            <motion.div
              key="search"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Filter and View Controls */}
              {hasSearched && !loading && !error && movies.length > 0 && (
                <motion.div variants={itemVariants}>
                  <FilterBar
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    filterType={filterType}
                    setFilterType={setFilterType}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    totalResults={totalResults}
                  />
                </motion.div>
              )}

              {loading && currentPage === 1 && (
                <motion.div variants={itemVariants}>
                  <LoadingSpinner message="Searching for movies..." />
                </motion.div>
              )}
              
              {error && (
                <motion.div variants={itemVariants}>
                  <ErrorMessage 
                    message={error} 
                    onRetry={() => handleSearch(searchQuery)}
                  />
                </motion.div>
              )}
              
              {!loading && !error && hasSearched && (
                <motion.div variants={itemVariants}>
                  {searchQuery && (
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        Search Results for <span className="text-gradient">"{searchQuery}"</span>
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Found {totalResults} {totalResults === 1 ? 'result' : 'results'}
                      </p>
                    </div>
                  )}
                  
                  <MovieGrid
                    movies={getFilteredMovies()}
                    favorites={favorites}
                    watchlist={watchlist}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleWatchlist={handleToggleWatchlist}
                    onMovieClick={handleMovieClick}
                    viewMode={viewMode}
                  />

                  {/* Load More Button */}
                  {currentPage * 10 < totalResults && (
                    <div className="text-center mt-12">
                      <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="btn-primary"
                      >
                        {loading ? 'Loading...' : 'Load More Movies'}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
              
              {!loading && !error && !hasSearched && (
                <motion.div variants={itemVariants}>
                  <TrendingSection onMovieClick={handleMovieClick} />
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'favorites' && (
            <motion.div
              key="favorites"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <FavoritesSection
                favorites={favorites}
                watchlist={watchlist}
                onToggleFavorite={handleToggleFavorite}
                onToggleWatchlist={handleToggleWatchlist}
                onMovieClick={handleMovieClick}
                onClearFavorites={handleClearFavorites}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
            </motion.div>
          )}

          {activeTab === 'watchlist' && (
            <motion.div
              key="watchlist"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <FavoritesSection
                favorites={watchlist}
                watchlist={favorites}
                onToggleFavorite={handleToggleWatchlist}
                onToggleWatchlist={handleToggleFavorite}
                onMovieClick={handleMovieClick}
                onClearFavorites={handleClearWatchlist}
                viewMode={viewMode}
                setViewMode={setViewMode}
                isWatchlist={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Movie Details Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={showModal}
        onClose={handleCloseModal}
        onToggleFavorite={handleToggleFavorite}
        onToggleWatchlist={handleToggleWatchlist}
        isFavorite={selectedMovie ? isFavorite(selectedMovie) : false}
        isInWatchlist={selectedMovie ? isInWatchlist(selectedMovie) : false}
      />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Film size={32} className="text-purple-400" />
              <span className="text-2xl font-bold">MovieFinder</span>
            </div>
            <p className="text-gray-400 text-lg mb-4">
              Your ultimate destination for movie discovery
            </p>
            <p className="text-gray-500">
              Harsh Sharma &copy; 2025-26
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;