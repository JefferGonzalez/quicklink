import Auth from '@/pages/Auth'
import Landing from '@/pages/Landing'
import NotFound from '@/pages/NotFound'
import AuthProvider from '@/providers/AuthProvider'
import Layout from '@/shared/components/Layout'
import ProtectedRoute from '@/shared/components/ProtectedRoute'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const CreateShortLink = lazy(() => import('@/modules/short-link/pages/Create'))
const Dashboard = lazy(() => import('@/modules/short-link/pages/Dashboard'))
const EditShortLink = lazy(() => import('@/modules/short-link/pages/Update'))
const GettingStarted = lazy(() => import('@/pages/GettingStarted'))
const Profile = lazy(() => import('@/modules/user/pages/Profile'))

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
            <Route path='/dashboard/create' element={<CreateShortLink />} />
            <Route path='/dashboard/edit/:id' element={<EditShortLink />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
