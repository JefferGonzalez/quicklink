import Dashboard from '@/pages/Dashboard'
import GettingStarted from '@/pages/GettingStarted'
import Landing from '@/pages/Landing'
import { Route, Routes } from 'react-router-dom'

export default function Root() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/getting-started' element={<GettingStarted />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}
