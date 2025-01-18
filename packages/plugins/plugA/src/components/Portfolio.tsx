import { useWallet } from '@coin98t/wallet-adapter-react';
import React from 'react';
import { truncate } from '../helper';

interface PortfolioProps {
  balance: string;
  staked: string;
}

const Portfolio = (props: PortfolioProps) => {
  const { balance, staked } = props;
  const { address = '' } = useWallet();

  return (
    <div className="bg-gray-200 p-4 w-full rounded-lg mx-auto">
      <div className="flex items-center mb-4 gap-x-1">
        <h2 className="text-lg font-bold text-gray-800 ">
          YOUR PORTFOLIO ({truncate(address || '')})
        </h2>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-2xl font-bold text-gray-800">
            {Number(balance)?.toFixed(2)} VIC
          </p>
          <p className="text-sm text-gray-500">BALANCE</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">
            {address && Number(staked) > 0 ? '30,84%' : '0%'}
          </p>
          <p className="text-sm text-gray-500">APY</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-800">{staked} VIC</p>
        <p className="text-sm text-gray-500">FUSIONFI STAKED</p>
      </div>
    </div>
  );
};

export default Portfolio;
