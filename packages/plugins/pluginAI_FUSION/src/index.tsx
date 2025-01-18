import { useGlobalHook, useRegisterPlugin } from '@repo/plugin-sdk';
import React from 'react';
import Pool from './components/Pool';

export const PluginAI_FUNTION = () => {
  const { do_action, add_hook } = useGlobalHook();

  const bootstrap = () => {
    add_hook(
      'investment',
      () => {
        return <Pool />;
      },
      'action',
      'PluginAI_FUNTION'
    );
  };

  useRegisterPlugin({
    name: 'PluginAI_FUNTION',
    author: 'Team5',
    bootstrap,
  });
  return (
    //Evering will render here.
    <div className="border rounded-lg p-4 border-dividerColorDefault">
      <p>This is pluginAI FUNTION</p>
      {do_action('investment')}
    </div>
  );
};
