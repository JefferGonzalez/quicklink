import LoadingIndicator from '@/components/LoadingIndicator'
import AuthProvider from '@/context/AuthContext'

export default function Slug(): JSX.Element {
  return (
    <AuthProvider>
      <LoadingIndicator />
    </AuthProvider>
  )
}
