import { useGlobalHook, useRegisterPlugin } from '@repo/plugin-sdk';
import React from 'react';
const TOKEN = [
  {
    symbol: 'CAKE',
    address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    img: 'https://coin98.s3.amazonaws.com/sYZGOCiL5TuKvtzM',
    name: 'PancakeSwap Token',
  },
  {
    symbol: 'ALPHA',
    address: '0xc5E6689C9c8B02be7C49912Ef19e79cF24977f03',
    img: 'https://coin98.s3.amazonaws.com/1P9iT0DsxERphqmB',
    name: 'AlphaToken',
  },
];

export const PluginFeature = () => {
  const { add_hook } = useGlobalHook();
  const bootstrap = () => {
    //This fn can be extracted;
    add_hook(
      'token_list',
      (...args: any[]) => {
        const [original] = args;
        return original.flat().concat(TOKEN);
      },
      'filter',
      'Plug Feature'
    );
    add_hook(
      'format_input',
      (inputAmount: any) => {
        const amount = inputAmount.replace(/,/g, '');
        if (isNaN(Number(amount))) return amount;
        return new Intl.NumberFormat('en-US', {
          useGrouping: true,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(parseFloat(amount));
      },
      'filter',
      'Plug Feature'
    );
    add_hook(
      'infor_token_swap',
      () => {
        return (
          <div className="flex items-center justify-between w-full text-sm text-textContentSpecial">
            <p className="">$0</p>
            <div className="flex items-center gap-2">
              <span>Balance:</span>
              <span className="text-xs text-primaryButton">0</span>
            </div>
          </div>
        );
      },
      'action',
      'Plug Feature'
    );
    add_hook(
      'change_content_card',
      (...args: any[]) => {
        let [original] = args;
        original = {
          image:
            'https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295',
          name: 'Plugin B Card',
          description: 'Explore & Follow Trends',
        };
        return original;
      },
      'filter',
      'Plug Feature'
    );
  };

  useRegisterPlugin({
    name: 'Plug Feature',
    author: 'DangVu',
    bootstrap,
  });
  //This plugin will return nothing, only apply function to ours main components;
  return null;
};
