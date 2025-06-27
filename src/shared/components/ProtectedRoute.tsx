import useAuth from '@/hooks/useAuth'
import LoadingIndicator from '@/shared/components/LoadingIndicator'
import { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  redirectTo?: string
}

export default function ProtectedRoute({ redirectTo = '/' }: Props) {
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
