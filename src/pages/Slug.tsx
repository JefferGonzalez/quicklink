import AuthProvider from '@/providers/AuthProvider'
import LoadingIndicator from '@/shared/components/LoadingIndicator'

export default function Slug() {
  return (
    <AuthProvider>
      <LoadingIndicator />
    </AuthProvider>
  )
}
