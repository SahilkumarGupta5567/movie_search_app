import React, { useEffect, useState } from 'react';
import { X, Star, Calendar, Clock, Globe, Award, Users, Heart, Plus, Check, Play, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MovieModal = ({ 
  movie, 
  isOpen, 
  onClose, 
  onToggleFavorite, 
  onToggleWatchlist, 
  isFavorite, 
  isInWatchlist 
}) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && movie) {
      fetchMovieDetails();
    }
  }, [isOpen, movie]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=f28f489&plot=full`
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setMovieDetails(data);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatValue = (value) => {
    return value && value !== 'N/A' ? value : 'Not available';
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div 
          className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between rounded-t-3xl z-10">
            <h2 className="text-2xl font-bold text-gray-800">Movie Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="loading-spinner"></div>
              <span className="ml-3 text-gray-600 text-lg">Loading details...</span>
            </div>
          ) : movieDetails ? (
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  {movieDetails.Poster && movieDetails.Poster !== 'N/A' ? (
                    <motion.img
                      src={movieDetails.Poster}
                      alt={movieDetails.Title}
                      className="w-full rounded-2xl shadow-2xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-8xl mb-4">🎬</div>
                        <div className="text-lg">No Image Available</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-2">
                        {movieDetails.Title}
                      </h1>
                      {movieDetails.Tagline && (
                        <p className="text-lg text-gray-600 italic">"{movieDetails.Tagline}"</p>
                      )}
                    </div>
                    
                    <div className="flex gap-3 ml-4">
                      <motion.button
                        onClick={() => onToggleFavorite(movieDetails)}
                        className={`favorite-btn ${
                          isFavorite 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => onToggleWatchlist(movieDetails)}
                        className={`favorite-btn ${
                          isInWatchlist 
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-500'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isInWatchlist ? <Check size={20} /> : <Plus size={20} />}
                      </motion.button>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="glass-card p-4 text-center">
                      <Calendar className="mx-auto mb-2 text-purple-600" size={24} />
                      <div className="font-bold text-lg">{formatValue(movieDetails.Year)}</div>
                      <div className="text-sm text-gray-600">Year</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <Clock className="mx-auto mb-2 text-blue-600" size={24} />
                      <div className="font-bold text-lg">{formatValue(movieDetails.Runtime)}</div>
                      <div className="text-sm text-gray-600">Runtime</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <Star className="mx-auto mb-2 text-yellow-500" size={24} />
                      <div className="font-bold text-lg">{formatValue(movieDetails.imdbRating)}</div>
                      <div className="text-sm text-gray-600">IMDb Rating</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <Globe className="mx-auto mb-2 text-green-600" size={24} />
                      <div className="font-bold text-lg">{movieDetails.Language?.split(',')[0] || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Language</div>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {movieDetails.Genre && movieDetails.Genre !== 'N/A' ? (
                        movieDetails.Genre.split(', ').map((genre, index) => (
                          <span key={index} className="genre-tag">
                            {genre}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">Not available</span>
                      )}
                    </div>
                  </div>

                  {/* Plot */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Plot</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {formatValue(movieDetails.Plot)}
                    </p>
                  </div>

                  {/* Cast & Crew and Additional Info */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Users size={20} />
                        Cast & Crew
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-semibold text-purple-600">Director:</span>
                          <p className="text-gray-700">{formatValue(movieDetails.Director)}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-purple-600">Writer:</span>
                          <p className="text-gray-700">{formatValue(movieDetails.Writer)}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-purple-600">Actors:</span>
                          <p className="text-gray-700">{formatValue(movieDetails.Actors)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Award size={20} />
                        Awards & Info
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-semibold text-purple-600">Awards:</span>
                          <p className="text-gray-700">{formatValue(movieDetails.Awards)}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-purple-600">Box Office:</span>
                          <p className="text-gray-700">{formatValue(movieDetails.BoxOffice)}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-purple-600">Country:</span>
                          <p className="text-gray-700">{formatValue(movieDetails.Country)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* External Links */}
                  {movieDetails.imdbID && (
                    <div className="mt-8 text-center">
                      <a
                        href={`https://www.imdb.com/title/${movieDetails.imdbID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2"
                      >
                        <ExternalLink size={18} />
                        View on IMDb
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">😞</div>
              <p className="text-gray-600 text-lg">Failed to load movie details</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieModal;