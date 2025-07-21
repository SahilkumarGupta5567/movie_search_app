import React, { useState } from 'react';
import { Search, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const popularSearches = [
    { term: 'Avengers', icon: '🦸' },
    { term: 'Batman', icon: '🦇' },
    { term: 'Star Wars', icon: '⭐' },
    { term: 'Marvel', icon: '💥' },
    { term: 'Disney', icon: '🏰' }
  ];

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="search-container">
          <div className="search-glow"></div>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies, TV shows, or series..."
              className="search-input pr-20 text-lg"
              disabled={loading}
            />
            <motion.button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 btn-primary py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <div className="loading-spinner w-5 h-5"></div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search size={20} />
                  <span className="hidden sm:inline">Search</span>
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </form>

      {/* Enhanced Popular Searches */}
      <div className="text-center">
        <motion.div 
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={20} className="text-yellow-300" />
          </motion.div>
          <span className="text-white/90 text-lg font-semibold">Popular Searches</span>
          <Zap size={16} className="text-blue-300" />
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {popularSearches.map((search, index) => (
            <motion.button
              key={search.term}
              onClick={() => {
                setQuery(search.term);
                onSearch(search.term);
              }}
              className="btn-ghost text-sm flex items-center gap-2 group"
              disabled={loading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                {search.icon}
              </span>
              <span>{search.term}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Search Tips */}
        <motion.div
          className="mt-8 text-white/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>💡 Try searching by movie title, actor name, or genre</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SearchBar;