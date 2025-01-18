import {
  HookContextType,
  useGlobalHook,
  useRegisterPlugin,
} from '@repo/plugin-sdk';
import React from 'react';
import Home from './components/Home';

export const PluginA = () => {
  const { do_action, add_hook } = useGlobalHook();

  const bootstrap = (_ctx: HookContextType) => {
    // Dome some thing with this;
    add_hook(
      'subtitle',
      () => {
        return <Home />;
      },
      'action',
      'PluginA'
    );
  };

  useRegisterPlugin({
    name: 'PluginA',
    author: 'Tam map',
    bootstrap,
  });

  return (
    <div
      className="border rounded-lg p-4 border-dividerColorDefault"
      id="#PluginA"
    >
      {do_action('swap')}
      {do_action('subtitle')}
    </div>
  );
};
