import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import type {RenderOptions, RenderResult} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {render} from '@testing-library/react'

const client = new QueryClient()

const AllTheProviders = ({children}: React.PropsWithChildren) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </BrowserRouter>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}
