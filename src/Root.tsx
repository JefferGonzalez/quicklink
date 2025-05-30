import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import AuthProvider from '@/context/AuthContext'
import Auth from '@/pages/Auth'
import Dashboard from '@/pages/Dashboard'
import GettingStarted from '@/pages/GettingStarted'
import Landing from '@/pages/Landing'
import NotFound from '@/pages/NotFound'
import Profile from '@/pages/Profile'
import CreateSlug from '@/pages/features/create/Slug'
import EditSlug from '@/pages/features/update/Slug'
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
