import * as React from 'react'
import {Header} from '../components/header'
import styles from './app.module.css'
import Routes from '../routes'
import '../i18n'

function App() {
  return (
    <div className={styles['wrapper']}>
      <Header />
      <React.Suspense fallback='Loading...'>
        <main className={styles['outlet']}>
          <Routes />
        </main>
      </React.Suspense>
    </div>
  )
}

export default App
