import React, { FC, PropsWithChildren } from 'react'

export const WidgetContext = React.createContext({})

export const WidgetProvider: FC<PropsWithChildren> = ({ children }) => {
  return <WidgetContext.Provider value={{}}>{children}</WidgetContext.Provider>
}
