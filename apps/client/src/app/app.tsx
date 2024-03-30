import * as React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Header} from '../components/header'
import Landing from '../routes/landing'
import styles from './app.module.css'
import {Path} from '../data/routes'
import '../i18n'

const Registration = React.lazy(() => import('../routes/registration'))

function App() {
  return (
    <div className={styles['wrapper']}>
      <Header />
      <React.Suspense fallback='Loading...'>
        <main className={styles['outlet']}>
          <Routes>
            <Route path={Path.Landing} element={<Landing />} />
            <Route path={Path.Registration} element={<Registration />} />
          </Routes>
        </main>
      </React.Suspense>
    </div>
  )
}

export default App
