import React from 'react';
import { useWalletModal } from '@coin98t/wallet-adapter-react-ui';

const ConnectButton = () => {
  const { openWalletModal } = useWalletModal();

  return (
    <div className="flex py-3">
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 mx-auto"
        onClick={openWalletModal}
      >
        Connect wallet
      </button>
    </div>
  );
};

export default ConnectButton;
