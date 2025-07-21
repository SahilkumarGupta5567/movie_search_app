import React from 'react';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import { motion } from 'framer-motion';

const FilterBar = ({ 
  sortBy, 
  setSortBy, 
  filterType, 
  setFilterType, 
  viewMode, 
  setViewMode, 
  totalResults 
}) => {
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'TV Series' },
    { value: 'episode', label: 'Episodes' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'year', label: 'Year' },
    { value: 'title', label: 'Title' }
  ];

  return (
    <motion.div 
      className="glass-card p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filter by Type */}
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-gray-600" />
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterType(option.value)}
                className={`filter-chip ${
                  filterType === option.value 
                    ? 'filter-chip-active' 
                    : 'filter-chip-inactive'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SortAsc size={20} className="text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

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
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-purple-600">{totalResults}</span> results
        </p>
      </div>
    </motion.div>
  );
};

export default FilterBar;