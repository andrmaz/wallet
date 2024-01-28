import {Header} from '../ui/header'
import {Hero} from '../ui/hero'
import styles from './app.module.css'

function App() {
  return (
    <main className={styles.wrapper}>
      <Header />
      <Hero />
    </main>
  )
}

export default App
