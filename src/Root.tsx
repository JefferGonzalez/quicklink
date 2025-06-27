import CreateSlug from '@/modules/slug/pages/Create'
import Dashboard from '@/modules/slug/pages/Dashboard'
import EditSlug from '@/modules/slug/pages/Update'
import Profile from '@/modules/user/pages/Profile'
import Auth from '@/pages/Auth'
import GettingStarted from '@/pages/GettingStarted'
import Landing from '@/pages/Landing'
import NotFound from '@/pages/NotFound'
import AuthProvider from '@/providers/AuthProvider'
import Layout from '@/shared/components/Layout'
import ProtectedRoute from '@/shared/components/ProtectedRoute'
import { Route, Routes } from 'react-router-dom'

export default function Root() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Landing />} />
          <Route path='/getting-started' element={<GettingStarted />} />
          <Route path='/auth' element={<Auth />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/create' element={<CreateSlug />} />
            <Route path='/dashboard/edit/:id' element={<EditSlug />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
