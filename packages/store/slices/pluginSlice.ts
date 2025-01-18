import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TPluginData } from '../types'

export interface PluginStore {
  plugins: TPluginData[]
  addPlugin: (plugin: TPluginData) => void
  removePlugin: (name: string) => void
  updatePlugin: (name: string, data: Partial<TPluginData>) => void
  backupPlugins: (plugins: TPluginData[]) => void
  togglePluginStatus: (name: string) => void
}

export const usePluginStore = create<PluginStore>()(
  persist(
    (set) => ({
      plugins: [],

      addPlugin: (plugin: TPluginData) => set((state) => ({ plugins: [...state.plugins, plugin] })),

      removePlugin: (name: string) =>
        set((state) => ({
          plugins: state.plugins.filter((plugin) => plugin.name !== name),
        })),

      updatePlugin: (name: string, data: Partial<TPluginData>) =>
        set((state) => ({
          plugins: state.plugins.map((plugin) => (plugin.name === name ? { ...plugin, ...data } : plugin)),
        })),
      backupPlugins: (plugins) => set({ plugins }),
      togglePluginStatus: (name: string) =>
        set((state) => ({
          plugins: state.plugins.map((plugin) =>
            plugin.name === name
              ? {
                  ...plugin,
                  status: plugin.status === 'active' ? 'inactive' : 'active',
                }
              : plugin,
          ),
        })),
    }),
    {
      name: 'plugin-storage',
    },
  ),
)
