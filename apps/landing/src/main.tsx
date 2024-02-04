import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Theme} from '@wallet/shared-ui'
import App from './app/app'

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Theme>
          <React.Suspense fallback='Loading...'>
            <App />
          </React.Suspense>
        </Theme>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
