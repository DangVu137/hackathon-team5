import React from 'react';

const Portfolio = () => {
  return (
    <div className="bg-gray-200 p-4 w-full rounded-lg mx-auto">
      <div className="flex items-center mb-4 gap-x-1">
        <h2 className="text-lg font-bold text-gray-800 ">YOUR PORTFOLIO</h2>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-2xl font-bold text-gray-800">$0 VIC</p>
          <p className="text-sm text-gray-500">BALANCE</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">0.00%</p>
          <p className="text-sm text-gray-500">APY</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-800">0 VIC</p>
        <p className="text-sm text-gray-500">ALPHA STAKED</p>
      </div>
    </div>
  );
};

export default Portfolio;
