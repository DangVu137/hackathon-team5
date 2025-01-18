import React, { FC, PropsWithChildren } from 'react'

export const HookableContext = React.createContext({})

export const HookableProvider: FC<PropsWithChildren> = ({ children }) => {
  return <HookableContext.Provider value={{}}>{children}</HookableContext.Provider>
}

export const useHookable = () => {
  return React.useContext(HookableContext)
}
