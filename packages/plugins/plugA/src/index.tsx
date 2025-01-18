import {
  HookContextType,
  useGlobalHook,
  useRegisterPlugin,
} from '@repo/plugin-sdk';
import React from 'react';

export const PluginA = () => {
  const { do_action, add_hook } = useGlobalHook();

  const bootstrap = (_ctx: HookContextType) => {
    // Dome some thing with this;
    add_hook(
      'subtitle',
      () => {
        return <div>Plugin contents</div>;
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
    //Evering will render here.
    <div
      className="border rounded-lg p-4 border-dividerColorDefault"
      id="#PluginA"
    >
      <p>This is plugin A</p>
      {do_action('swap')}
      {do_action('subtitle')}
      <div>
        <ul>
          <li>
            <span>Content 1</span>
          </li>
          <li>Content 1</li>
          <li>Content 2</li>
          <li>Content 3</li>
        </ul>
        <div>Parent!!!</div>
      </div>
    </div>
  );
};
