import React from "react";
import { Heart, Trash2, TrendingUp, Grid, List } from 'lucide-react';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';

const FavoritesSection = ({ 
  favorites, 
  watchlist, 
  onToggleFavorite, 
  onToggleWatchlist, 
  onMovieClick, 
  onClearFavorites, 
  viewMode, 
  setViewMode, 
  isWatchlist = false 
}) => {
  const title = isWatchlist ? 'My Watchlist' : 'My Favorites';
  const icon = isWatchlist ? TrendingUp : Heart;
  const emptyMessage = isWatchlist 
    ? 'Your watchlist is empty' 
    : 'No favorites yet';
  const emptyDescription = isWatchlist
    ? 'Add movies to your watchlist to keep track of what you want to watch'
    : 'Start adding movies to your favorites by clicking the heart icon';

  if (favorites.length === 0) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-8xl mb-6">
          {isWatchlist ? '📋' : '💝'}
        </div>
        <h3 className="text-2xl font-bold text-gray-600 mb-3">{emptyMessage}</h3>
        <p className="text-gray-500 text-lg max-w-md mx-auto">{emptyDescription}</p>
      </motion.div>
    );
  }

  const Icon = icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Icon className={isWatchlist ? "text-blue-500" : "text-red-500"} size={32} />
          {title} ({favorites.length})
        </h2>
        
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <List size={18} />
            </button>
          </div>
          
          <button
            onClick={onClearFavorites}
            className="btn-secondary flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>
      </div>
      
      <div className={viewMode === 'list' ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'}>
        {favorites.map((movie, index) => (
          <motion.div
            key={movie.imdbID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <MovieCard
              movie={movie}
              isFavorite={!isWatchlist}
              isInWatchlist={isWatchlist}
              onToggleFavorite={onToggleFavorite}
              onToggleWatchlist={onToggleWatchlist}
              onMovieClick={onMovieClick}
              viewMode={viewMode}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FavoritesSection;