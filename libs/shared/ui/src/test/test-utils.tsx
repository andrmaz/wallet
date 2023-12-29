import * as React from 'react'
import type {RenderOptions, RenderResult} from '@testing-library/react'
import {render} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const client = new QueryClient()

const AllTheProviders = ({children}: React.PropsWithChildren) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}
