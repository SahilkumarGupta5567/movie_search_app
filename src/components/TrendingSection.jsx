import React from 'react';
import { TrendingUp, Star, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const TrendingSection = ({ onMovieClick }) => {
  const trendingMovies = [
    {
      imdbID: 'tt0111161',
      Title: 'The Shawshank Redemption',
      Year: '1994',
      Poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      Type: 'movie',
      imdbRating: '9.3'
    },
    {
      imdbID: 'tt0068646',
      Title: 'The Godfather',
      Year: '1972',
      Poster: 'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=400',
      Type: 'movie',
      imdbRating: '9.2'
    },
    {
      imdbID: 'tt0468569',
      Title: 'The Dark Knight',
      Year: '2008',
      Poster: 'https://images.pexels.com/photos/7991581/pexels-photo-7991581.jpeg?auto=compress&cs=tinysrgb&w=400',
      Type: 'movie',
      imdbRating: '9.0'
    }
  ];

  return (
    <div className="text-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-8xl mb-8 floating-animation">🎬</div>
        <h3 className="text-4xl font-bold text-gradient mb-4">
          Welcome to MovieFinder
        </h3>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover amazing movies, create your personal collection, and never miss a great film again. 
          Start by searching for your favorite movies above.
        </p>

        {/* Trending Movies Preview */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-8">
            <TrendingUp className="text-purple-600" size={28} />
            <h4 className="text-2xl font-bold text-gray-800">Trending Now</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {trendingMovies.map((movie, index) => (
              <motion.div
                key={movie.imdbID}
                className="movie-card-featured cursor-pointer group"
                onClick={() => onMovieClick(movie)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play size={48} className="text-white" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="rating-badge flex items-center gap-1">
                      <Star size={14} />
                      {movie.imdbRating}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h5 className="font-bold text-lg mb-1 group-hover:text-purple-600 transition-colors">
                    {movie.Title}
                  </h5>
                  <p className="text-gray-600">{movie.Year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="glass-card p-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h4 className="text-2xl font-bold text-gray-800 mb-4">Ready to start exploring?</h4>
          <p className="text-gray-600 mb-6">
            Use the search bar above to find any movie, TV show, or series. 
            Add them to your favorites and build your personal collection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Star size={20} />
              <span className="font-medium">Rate & Review</span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <TrendingUp size={20} />
              <span className="font-medium">Track Watchlist</span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <Play size={20} />
              <span className="font-medium">Discover New</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TrendingSection;