import {render} from '@wallet/shared-ui'

import {BrowserRouter} from 'react-router-dom'

import App from './app'

describe('App', () => {
  it('should render successfully', () => {
    const {baseElement} = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(baseElement).toBeTruthy()
  })
})
