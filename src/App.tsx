import { API_URL } from '@/Config'
import NotFound from '@/pages/NotFound'
import Slug from '@/pages/Slug'
import AuthProvider from '@/providers/AuthProvider'
import Root from '@/Root'
import Layout from '@/shared/components/Layout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SlugEntity } from './modules/slug/entities/Slug'

const router = createBrowserRouter([
  {
    path: '*',
    Component: Root
  },
  {
    path: 's/:slug',
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        path: '',
        element: <Slug />,
        loader: async ({ params: { slug } }) => {
          const response = await fetch(`${API_URL}/slug/${slug}`)

          if (!response.ok) throw new Error('No data found.')

          const { data }: { data?: SlugEntity } = await response.json()

          if (!data) throw new Error('No data found.')

          window.location.href = data.url
          return null
        },
        errorElement: <NotFound />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
