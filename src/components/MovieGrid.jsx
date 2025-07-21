import React from "react";
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';

const MovieGrid = ({ 
  movies, 
  favorites, 
  watchlist, 
  onToggleFavorite, 
  onToggleWatchlist, 
  onMovieClick, 
  viewMode = 'grid' 
}) => {
  if (!movies || movies.length === 0) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-8xl mb-6">🎬</div>
        <h3 className="text-2xl font-bold text-gray-600 mb-3">No movies found</h3>
        <p className="text-gray-500 text-lg">Try searching for a different movie or TV show</p>
      </motion.div>
    );
  }

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

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {movies.map((movie) => (
          <motion.div key={movie.imdbID} variants={itemVariants}>
            <MovieCard
              movie={movie}
              isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
              isInWatchlist={watchlist.some(item => item.imdbID === movie.imdbID)}
              onToggleFavorite={onToggleFavorite}
              onToggleWatchlist={onToggleWatchlist}
              onMovieClick={onMovieClick}
              viewMode={viewMode}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
    >
      {movies.map((movie) => (
        <motion.div key={movie.imdbID} variants={itemVariants}>
          <MovieCard
            movie={movie}
            isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
            isInWatchlist={watchlist.some(item => item.imdbID === movie.imdbID)}
            onToggleFavorite={onToggleFavorite}
            onToggleWatchlist={onToggleWatchlist}
            onMovieClick={onMovieClick}
            viewMode={viewMode}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MovieGrid;