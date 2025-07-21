import React, { useState } from 'react';
import { Heart, Star, Calendar, Clock, Plus, Check, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const MovieCard = ({ 
  movie, 
  isFavorite, 
  isInWatchlist, 
  onToggleFavorite, 
  onToggleWatchlist, 
  onMovieClick, 
  viewMode = 'grid' 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const formatYear = (year) => {
    return year && year !== 'N/A' ? year : 'Unknown';
  };

  const formatRating = (rating) => {
    return rating && rating !== 'N/A' ? rating : 'N/A';
  };

  if (viewMode === 'list') {
    return (
      <motion.div 
        className="glass-card p-4 mb-4 hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            {imageError ? (
              <div className="w-20 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-gray-400 text-2xl">🎬</div>
              </div>
            ) : (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-20 h-28 object-cover rounded-lg cursor-pointer"
                onLoad={handleImageLoad}
                onError={handleImageError}
                onClick={() => onMovieClick(movie)}
              />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 
              className="font-bold text-lg mb-2 cursor-pointer hover:text-purple-600 transition-colors truncate"
              onClick={() => onMovieClick(movie)}
            >
              {movie.Title}
            </h3>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formatYear(movie.Year)}</span>
              </div>
              
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" />
                  <span>{formatRating(movie.imdbRating)}</span>
                </div>
              )}
              
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                {movie.Type?.charAt(0).toUpperCase() + movie.Type?.slice(1) || 'Movie'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(movie)}
                className={`favorite-btn ${
                  isFavorite 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              
              <button
                onClick={() => onToggleWatchlist(movie)}
                className={`favorite-btn ${
                  isInWatchlist 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-500'
                }`}
              >
                {isInWatchlist ? <Check size={16} /> : <Plus size={16} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="movie-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="w-full h-96 shimmer flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
        
        {imageError ? (
          <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-2">🎬</div>
              <div>No Image Available</div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className={`w-full h-96 object-cover cursor-pointer transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } group-hover:scale-110`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              onClick={() => onMovieClick(movie)}
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className="bg-white/20 backdrop-blur-sm rounded-full p-4"
              >
                <Play size={32} className="text-white" />
              </motion.div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => onToggleFavorite(movie)}
            className={`favorite-btn backdrop-blur-sm ${
              isFavorite 
                ? 'bg-red-500/90 text-white hover:bg-red-600/90' 
                : 'bg-white/80 text-gray-600 hover:bg-white/90 hover:text-red-500'
            }`}
          >
            <Heart 
              size={18} 
              fill={isFavorite ? 'currentColor' : 'none'}
              className="transition-all duration-200"
            />
          </button>
          
          <button
            onClick={() => onToggleWatchlist(movie)}
            className={`favorite-btn backdrop-blur-sm ${
              isInWatchlist 
                ? 'bg-green-500/90 text-white hover:bg-green-600/90' 
                : 'bg-white/80 text-gray-600 hover:bg-white/90 hover:text-green-500'
            }`}
          >
            {isInWatchlist ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>

        {/* Rating Badge */}
        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
          <div className="absolute top-3 left-3">
            <div className="rating-badge flex items-center gap-1">
              <Star size={14} />
              {formatRating(movie.imdbRating)}
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 
          className="font-bold text-lg mb-3 line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors duration-200 leading-tight"
          onClick={() => onMovieClick(movie)}
        >
          {movie.Title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{formatYear(movie.Year)}</span>
          </div>
          
          {movie.Runtime && movie.Runtime !== 'N/A' && (
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{movie.Runtime}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="genre-tag">
            {movie.Type?.charAt(0).toUpperCase() + movie.Type?.slice(1) || 'Movie'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;