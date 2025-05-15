import LoadingIndicator from '@/components/LoadingIndicator'
import useAuth from '@/hooks/useAuth'
import { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  redirectTo?: string
}

export default function ProtectedRoute({
  redirectTo = '/'
}: ProtectedRouteProps) {
  const { isSessionLoading, isAuthenticated } = useAuth()

  if (isSessionLoading) {
    return <LoadingIndicator message='Loading session...' />
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />
  }

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}
