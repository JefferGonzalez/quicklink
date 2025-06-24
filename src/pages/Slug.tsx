import LoadingIndicator from '@/components/LoadingIndicator'
import AuthProvider from '@/context/AuthContext'

export default function Slug() {
  return (
    <AuthProvider>
      <LoadingIndicator />
    </AuthProvider>
  )
}
