import Auth from '@/pages/Auth'
import Dashboard from '@/pages/Dashboard'
import GettingStarted from '@/pages/GettingStarted'
import Landing from '@/pages/Landing'
import NotFound from '@/pages/NotFound'
import CreateSlug from '@/pages/features/create/Slug'
import { Route, Routes } from 'react-router-dom'

export default function Root() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/getting-started' element={<GettingStarted />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/create' element={<CreateSlug />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
