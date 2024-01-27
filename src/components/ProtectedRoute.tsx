import { Fragment, PropsWithChildren } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps extends PropsWithChildren {
  redirectTo?: string
}

export default function ProtectedRoute({
  children,
  redirectTo = '/'
}: ProtectedRouteProps) {
  const session = window.localStorage.getItem('session')

  if (!session) {
    return <Navigate to={redirectTo} />
  }

  return (
    <Fragment>
      {children}
      <Outlet />
    </Fragment>
  )
}
