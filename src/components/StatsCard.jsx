import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    red: 'from-red-500 to-pink-500 text-red-600',
    blue: 'from-blue-500 to-cyan-500 text-blue-600',
    purple: 'from-purple-500 to-indigo-500 text-purple-600',
    green: 'from-green-500 to-emerald-500 text-green-600'
  };

  return (
    <motion.div
      className="glass-card p-6 text-center"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${colorClasses[color]} mb-4`}>
        <Icon size={32} className="text-white" />
      </div>
      <h3 className="text-3xl font-bold text-gray-800 mb-2">{value}</h3>
      <p className="text-gray-600 font-medium">{title}</p>
    </motion.div>
  );
};

export default StatsCard;