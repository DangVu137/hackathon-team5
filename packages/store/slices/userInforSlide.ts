import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TUserInfo } from '../types'
export interface UserStore {
  users: TUserInfo[]
  setUsers: (users: TUserInfo[]) => void
  clearUsers: () => void
}
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [], // init user information

      setUsers: (users) =>
        set(() => ({
          users,
        })),

      clearUsers: () =>
        set(() => ({
          users: [],
        })),
    }),
    {
      name: 'userPortfolio-storage', // key local storage
    },
  ),
)
