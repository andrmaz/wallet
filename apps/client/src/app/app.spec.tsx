import {render} from '@wallet/ui'
import App from './app'

describe('App', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<App />)
    expect(baseElement).toBeTruthy()
  })
})
