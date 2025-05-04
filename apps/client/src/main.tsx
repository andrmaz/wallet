import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Theme} from '@wallet/ui'
import App from './app/app'

// Import common library (which includes the CSS files)
import '@wallet/common'

// Import and initialize i18n from common library
import {initI18n} from '@wallet/common'

const client = new QueryClient()

// Initialize i18n with the path to the client's translation files
initI18n('/locales/{{lng}}/{{ns}}.json')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Theme>
          <App />
        </Theme>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
