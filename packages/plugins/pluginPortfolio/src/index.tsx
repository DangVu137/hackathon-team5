import { useGlobalHook, useRegisterPlugin } from '@repo/plugin-sdk';
import React from 'react';
import Portfolio from './components/Portfolio';
import { TUserInfo } from '@repo/store/types';

export const PluginPortfolio = () => {
  const { add_hook, do_action } = useGlobalHook();

  const bootstrap = () => {
    //This fn can be extracted;
    add_hook(
      'subtitle',
      () => {
        return <div>Plugin contents 123</div>;
      },
      'action',
      'PluginPortfolio'
    );
    add_hook(
      'dataPortfolio',
      (...args: any[]) => {
        console.log('Args in dataPortfolio:', args);
        const [mockUserInfo, inputAddress] = args;
        const result = mockUserInfo.filter(
          (user: TUserInfo) => user.address === inputAddress
        );
        return result;
      },
      'filter',
      'PluginPortfolio'
    );
  };

  useRegisterPlugin({
    name: 'PluginPortfolio',
    author: 'Dangvu',
    bootstrap,
  });
  return (
    <div className="border rounded-lg p-4 border-dividerColorDefault">
      This is Plugin Portfolio
      <Portfolio />
      {do_action('subtitle')}
    </div>
  );
};
