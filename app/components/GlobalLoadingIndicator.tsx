import React from 'react';

const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
    <span className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
  </div>
)

export default Loader 