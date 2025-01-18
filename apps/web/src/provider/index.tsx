'use client'
import { HookProvider, PluginContextProvider } from '@repo/plugin-sdk'
import React, { FC, PropsWithChildren } from 'react'
import AdapterProvider from './AdapterProvider'
import { defaultShouldDehydrateQuery, isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { Suspense } from 'react'
import { Toaster } from '@repo/ui'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: false,
        notifyOnChangeProps: 'all',
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}
const Provider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient()
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <AdapterProvider>
            <HookProvider>
              <PluginContextProvider>{children}</PluginContextProvider>
            </HookProvider>
          </AdapterProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Suspense>
      <Toaster richColors />
    </ThemeProvider>
  )
}

export default Provider
