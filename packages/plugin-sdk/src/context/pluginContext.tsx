import React, { createContext, useState } from 'react';
import { HookContextType, useGlobalHook } from './base';
export type Plugin = {
  name: string;
  author: string;
  bootstrap: (_ctx: HookContextType) => void;
};
export type PluginContextValue = {
  // define the properties of PluginContextValue here
  register: (params: Plugin) => void;
  plugins: Plugin[];
  unRegister: (name: string) => Plugin | undefined;
};

export const PluginContext = createContext<PluginContextValue>(
  {} as PluginContextValue
);

export const PluginContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);

  const _ctx = useGlobalHook();

  const register = (params: Plugin) => {
    // Check for duplicate plugins
    if (plugins.some((plugin) => plugin.name === params.name)) {
      console.warn(`Plugin "${params.name}" is already registered.`);
      return;
    }
    setPlugins((prevPlugins) => {
      const updatedPlugins = [...prevPlugins, params];
      return updatedPlugins;
    });

    // if (params.name) {
    //   const targetElement = document.getElementById(`#${params.name}`);

    //   if (!targetElement) {
    //     console.warn(`No found element with id: ${params.name}`);
    //     return;
    //   }
    //   const buildElement = nestedStructure.buildNestedStructure(targetElement);
    //   nestedStructure.assignIds(buildElement, params.name);
    // }
    if (params.bootstrap) {
      params.bootstrap(_ctx); // Boot plugin with context
    }
  };
  const unRegister = (name: string): Plugin | undefined => {
    // Find the plugin to remove
    const pluginToRemove = plugins.find((plugin) => plugin.name === name);

    if (!pluginToRemove) {
      console.warn(`Plugin "${name}" is not registered.`);
      return;
    }
    setPlugins((prevPlugins) =>
      prevPlugins.filter((plugin) => plugin.name !== name)
    );
    _ctx.remove_all_hook(name);
    return pluginToRemove;
  };
  return (
    <PluginContext.Provider
      value={{
        register,
        unRegister,
        plugins,
      }}
    >
      {children}
    </PluginContext.Provider>
  );
};

export const usePluginHelper = () => React.useContext(PluginContext);
