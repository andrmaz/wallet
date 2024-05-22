import * as React from 'react'
import {Route, Routes} from 'react-router-dom'
import Landing from '../routes/landing'
import {Path} from '../data/routes'

const Registration = React.lazy(() => import('../routes/registration'))

export default () => (
  <Routes>
    <Route path={Path.Landing} element={<Landing />} />
    <Route path={Path.Registration} element={<Registration />} />
    <Route path={Path.Dashboard} element={<>Dashboard</>} />
  </Routes>
)
