import { useEffect } from 'react';
import { Plugin, usePluginHelper } from '../context/pluginContext';

export const useRegisterPlugin = (pluginConfig: Plugin) => {
  const { register, plugins } = usePluginHelper();

  useEffect(() => {
    register(pluginConfig);
  }, [plugins]);
};
