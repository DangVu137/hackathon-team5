import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SortableState {
  disabled: boolean
  toggleDisabled: () => void
  setDisabled: (value: boolean) => void
}

export const useSortableStore = create(
  persist<SortableState>(
    (set) => ({
      disabled: false, // Default state
      toggleDisabled: () =>
        set((state) => ({
          disabled: !state.disabled,
        })),
      setDisabled: (value: boolean) =>
        set(() => ({
          disabled: value,
        })),
    }),
    {
      name: 'sortable-storage', // Key in localStorage
    },
  ),
)
