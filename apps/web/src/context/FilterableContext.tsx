import React, { FC, PropsWithChildren } from 'react'

export const FilterableContext = React.createContext({})

export const FilterableProvider: FC<PropsWithChildren> = ({ children }) => {
  return <FilterableContext.Provider value={{}}>{children}</FilterableContext.Provider>
}
